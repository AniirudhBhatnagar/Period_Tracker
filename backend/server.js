const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();

const corsOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is required');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is required');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const SYSTEM_PROMPT = "You are a friendly, supportive assistant for period tracking and emotional wellbeing. Always answer with empathy and encouragement.";

// Helper function to get phase based on cycle day
const getPhase = (day, { periodLength = 5, ovulationDay = 14, cycleLength = 28 }) => {
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  if (day <= periodLength) return 'Menstruation';
  if (day > periodLength && day < fertileStart) return 'Follicular';
  if (day >= fertileStart && day <= fertileEnd) return 'Ovulation';
  if (day > fertileEnd) return 'Luteal';
  return 'Cycle';
};

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${SYSTEM_PROMPT}\nUser: ${message}`,
    });
    res.json({ text: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "Error contacting Gemini API." });
  }
});

// New affirmation endpoint that generates day-specific affirmations
app.get('/api/affirmation', async (req, res) => {
  const { day = 1, cycleLength = 28 } = req.query;
  const cycleDay = parseInt(day);
  
  try {
    const phase = getPhase(cycleDay, { cycleLength });
    
    const affirmationPrompt = `You are a supportive wellness coach specializing in menstrual cycle awareness. 
    
    Generate a short, empowering affirmation (maximum 2 sentences) for someone on day ${cycleDay} of their ${cycleLength}-day cycle, currently in the ${phase} phase.
    
    The affirmation should be:
    - Specific to this phase and day
    - Empowering and encouraging
    - Gentle and supportive
    - Maximum 2 sentences
    - Focus on self-compassion and body wisdom
    
    Phase context:
    - Menstruation (days 1-5): Time for rest, reflection, and honoring the body's natural cleansing
    - Follicular (days 6-13): Rising energy, creativity, and new beginnings
    - Ovulation (day 14): Peak energy, confidence, and connection
    - Luteal (days 15-28): Preparation, intuition, and self-care
    
    Return only the affirmation text, nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: affirmationPrompt,
    });
    
    res.json({ affirmation: response.text.trim() });
  } catch (err) {
    console.error('Error generating affirmation:', err);
    // Fallback affirmations based on phase
    const phase = getPhase(cycleDay, { cycleLength });
    const fallbackAffirmations = {
      'Menstruation': 'Your body is wise and knows exactly what it needs. Honor this sacred time of rest and renewal.',
      'Follicular': 'Your energy is rising like the spring sun. Trust in your growing strength and creativity.',
      'Ovulation': 'You are at your peak power. Your confidence and intuition are your greatest allies.',
      'Luteal': 'Your body is preparing for transformation. Be gentle with yourself and trust your inner wisdom.',
      'Cycle': 'You are perfectly attuned to your body\'s natural rhythm. Trust the process.'
    };
    
    res.json({ affirmation: fallbackAffirmations[phase] || 'You are strong, capable, and worthy of love and care.' });
  }
});

require('./passport'); // Passport config

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  console.error('ERROR: SESSION_SECRET environment variable is required');
  process.exit(1);
}

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));

// Start server function
const startServer = () => {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.log(`Gemini proxy running on port ${PORT}`));
};

// Connect to MongoDB if MONGO_URI is provided
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected');
      startServer();
    })
    .catch(err => {
      console.error('ERROR: MongoDB connection failed:', err);
      console.error('Server will not start without MongoDB connection');
      process.exit(1);
    });
} else {
  // MongoDB is optional - start server without it
  console.log('MONGO_URI not set - starting server without MongoDB');
  startServer();
}
