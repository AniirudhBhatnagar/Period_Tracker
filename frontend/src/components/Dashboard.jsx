import React, { useState, useEffect } from 'react';
import CircularCalendar from './CircularCalendar';
import DashboardHeader from './DashboardHeader';
import FullCalendarModal from './FullCalendarModal';
import MoodTracker from './MoodTracker';
import { FiActivity, FiCalendar, FiBell, FiFileText, FiSearch, FiHeart, FiSmile, FiDroplet, FiZap, FiCoffee, FiPlus } from 'react-icons/fi';
import pattern from '../assets/period-pattern.png';
// import mockData from '../data/mockData'; // We will use local state for now

// Custom CSS animations
const customStyles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes slide-in-left {
    from { 
      opacity: 0; 
      transform: translateX(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out;
  }
  
  .hover-lift {
    transition: transform 0.2s ease-out;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
  }
  
  /* Custom scrollbar styling */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(236, 72, 153, 0.3);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(236, 72, 153, 0.5);
  }
`;

// Phase definitions (needed for getPhase function)
const PHASES = {
  MENSTRUATION: { name: 'Menstruation', color: '#F87171', className: 'text-red-500', range: [1, 5] },
  FOLLICULAR:   { name: 'Follicular',   color: '#a78bfa', className: 'text-indigo-500', range: [6, 13] },
  OVULATION:    { name: 'Ovulation',    color: '#FBBF24', className: 'text-amber-500', range: [14, 14] },
  LUTEAL:       { name: 'Luteal',       color: '#4ade80', className: 'text-green-500', range: [15, 28] },
  NONE:         { name: 'Cycle',        color: 'gray',     className: 'text-gray-400', range: [] },
};

// Helper function to get phase (needed for phase info)
const getPhase = (day, { periodLength = 5, ovulationDay = 14, cycleLength = 28 }) => {
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  if (day <= periodLength) return PHASES.MENSTRUATION;
  if (day > periodLength && day < fertileStart) return PHASES.FOLLICULAR;
  if (day >= fertileStart && day <= fertileEnd) return PHASES.OVULATION;
  if (day > fertileEnd) return PHASES.LUTEAL;
  return PHASES.NONE;
};

// --- Re-integrated Card Components ---

// Base card structure with enhanced styling
const InfoCard = ({ title, actionButton, children, icon: Icon }) => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/20 hover-lift"
         style={{
             boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
         }}>
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="text-pink-500 text-xl" />}
                <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
            </div>
            {actionButton}
        </div>
        <div>{children}</div>
    </div>
);

// Expanded Symptoms List
const SYMPTOMS = {
  Pain: ['Headache', 'Cramps', 'Backache', 'Breast tenderness', 'Joint Pain', 'Pelvic Pressure'],
  Emotional: ['Mood swings', 'Anxiety', 'Fatigue', 'Irritability', 'Brain Fog', 'Sensitivity', 'Low Motivation'],
  Digestive: ['Bloating', 'Diarrhea', 'Constipation', 'Gas', 'Stomach Ache'],
  Physical: ['Acne', 'Nausea', 'Dizziness', 'Hot Flashes', 'Water Retention', 'Sleepiness', 'Insomnia'],
  Behavioral: ['Cravings', 'Loss of Appetite', 'Increased Libido', 'Low Libido', 'Restlessness'],
};

// Category color mapping for visual grouping
const CATEGORY_COLORS = {
  Pain: '#ffe5e5',
  Emotional: '#e5f0ff', 
  Digestive: '#eaffea',
  Physical: '#fff2e5',
  Behavioral: '#f0e5ff'
};

// Category icons mapping
const CATEGORY_ICONS = {
  Pain: FiHeart,
  Emotional: FiSmile,
  Digestive: FiDroplet,
  Physical: FiZap,
  Behavioral: FiCoffee
};

// Extracted SymptomCardContent content for the scrollable section
const SymptomCardContent = ({ selectedSymptoms, onSymptomToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSymptoms = Object.entries(SYMPTOMS).map(([category, symptoms]) => ({
    category,
    symptoms: symptoms.filter(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(({ symptoms }) => symptoms.length > 0);

  // Enhanced category colors with pastel tones
  const CATEGORY_COLORS_FEMININE = {
    Pain: 'from-red-50 to-pink-50',
    Emotional: 'from-blue-50 to-indigo-50',
    Digestive: 'from-green-50 to-emerald-50',
    Physical: 'from-orange-50 to-amber-50',
    Behavioral: 'from-purple-50 to-violet-50'
  };

  return (
    <>
      {/* Enhanced Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white/80 focus:bg-white backdrop-blur-sm shadow-sm"
          />
        </div>
      </div>
      
      <div className="space-y-6">
          {filteredSymptoms.map(({ category, symptoms }) => {
            const CategoryIcon = CATEGORY_ICONS[category];
            return (
              <div key={category} className="space-y-4">
                  {/* Enhanced Category Header with Pastel Background */}
                  <div className={`bg-gradient-to-r ${CATEGORY_COLORS_FEMININE[category]} rounded-2xl p-4 border border-pink-100/50`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                        {CategoryIcon && <CategoryIcon className="text-white text-sm" />}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        {category}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Enhanced Symptom Tags */}
                  <div className="grid grid-cols-2 gap-3">
                      {symptoms.map(symptom => {
                          const isSelected = selectedSymptoms.includes(symptom);
                          return (
                              <button
                                  key={symptom}
                                  onClick={() => onSymptomToggle(symptom)}
                                  className={`text-xs font-medium rounded-2xl px-4 py-3 cursor-pointer transition-all duration-300 border backdrop-blur-sm hover:scale-105
                                      ${isSelected 
                                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500 text-white shadow-lg ring-2 ring-pink-200 transform scale-105' 
                                          : 'bg-white/70 border-pink-200 text-gray-700 hover:bg-white hover:border-pink-300 hover:shadow-md hover:ring-1 hover:ring-pink-200'
                                      }`
                                  }
                                  style={{
                                      boxShadow: isSelected ? '0 8px 25px rgba(236, 72, 153, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)'
                                  }}
                              >
                                  {symptom}
                              </button>
                          );
                      })}
                  </div>
              </div>
          );
      })}
      </div>
    </>
  );
};

const SymptomCard = ({ selectedSymptoms, onSymptomToggle }) => (
    <InfoCard title="Log Symptoms" actionButton={<button className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">Filter</button>} icon={FiActivity}>
        <SymptomCardContent selectedSymptoms={selectedSymptoms} onSymptomToggle={onSymptomToggle} />
    </InfoCard>
);

const CycleStatsCard = ({ currentDay, cycleLength }) => (
    <InfoCard title="Cycle Stats" icon={FiCalendar}>
        <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Cycle Length</span>
                <span className="font-semibold text-gray-800">{cycleLength} days</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Period Length</span>
                <span className="font-semibold text-gray-800">5 days</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Period In:</span>
                <span className="font-semibold text-gray-800">{cycleLength - currentDay} days</span>
            </div>
        </div>
    </InfoCard>
);

const RemindersCard = () => (
    <InfoCard title="Reminders" actionButton={<button className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">+ Add Reminder</button>} icon={FiBell}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBell className="text-pink-500 text-2xl" />
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">No reminders for today</p>
          <p className="text-xs text-gray-400 mb-4">Add one to stay on track with your cycle!</p>
          <button className="text-xs text-pink-500 hover:text-pink-600 font-medium transition-colors">
            Create your first reminder →
          </button>
        </div>
    </InfoCard>
);

const NotesCard = () => (
    <InfoCard title="Notes" icon={FiFileText}>
        <textarea 
            className="w-full h-24 p-4 text-sm bg-gray-50/50 border border-dashed border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 resize-none backdrop-blur-sm" 
            placeholder="You haven't added any notes yet. How are you feeling today?"
        ></textarea>
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-400">Track your mood, symptoms, or thoughts</p>
          <button className="text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors">Save Note</button>
        </div>
    </InfoCard>
);


// --- Main Dashboard Component ---

const cycleData = {
  cycleLength: 28,
  periodLength: 5,
  ovulationDay: 14,
  today: 2
};

// Helper function to get phase info
const getPhaseInfo = (currentDay, cycleConfig) => {
  const phase = getPhase(currentDay, cycleConfig);
  const nextPhase = currentDay < cycleConfig.cycleLength ? getPhase(currentDay + 1, cycleConfig) : null;
  const daysUntilNext = nextPhase && nextPhase.name !== phase.name ? 1 : 0;
  
  return {
    current: phase,
    next: nextPhase,
    daysUntilNext,
    progress: Math.round((currentDay / cycleConfig.cycleLength) * 100)
  };
};

// Get gradient colors based on phase
const getPhaseGradient = (phaseName) => {
  switch(phaseName) {
    case 'Menstruation': return 'from-red-400 to-red-600';
    case 'Follicular': return 'from-purple-400 to-purple-600';
    case 'Ovulation': return 'from-yellow-400 to-yellow-600';
    case 'Luteal': return 'from-green-400 to-green-600';
    default: return 'from-pink-400 to-pink-600';
  }
};

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(cycleData.today);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isFullCalendarModalOpen, setIsFullCalendarModalOpen] = useState(false);
  const [affirmation, setAffirmation] = useState('Loading...');
  const [affirmationLoading, setAffirmationLoading] = useState(false);

  // Add custom styles to document
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Calculate current cycle day based on last period start date
  const getCurrentCycleDay = () => {
    // For demo purposes, we'll use a fixed last period start date
    // In a real app, this would come from user's period tracking data
    const lastPeriodStart = new Date('2024-01-01'); // Example: January 1st, 2024
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastPeriodStart) / (1000 * 60 * 60 * 24));
    
    // Calculate current cycle day (assuming 28-day cycle)
    const currentCycleDay = (daysSinceLastPeriod % cycleData.cycleLength) + 1;
    
    return currentCycleDay;
  };

  // Fetch affirmation based on current cycle day
  const fetchAffirmation = async (day) => {
    setAffirmationLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/affirmation?day=${day}&cycleLength=${cycleData.cycleLength}`);
      const data = await response.json();
      setAffirmation(data.affirmation);
    } catch (error) {
      console.error('Error fetching affirmation:', error);
      setAffirmation('You are strong and capable!');
    } finally {
      setAffirmationLoading(false);
    }
  };

  // Fetch affirmation when component mounts - use current cycle day
  useEffect(() => {
    const currentDay = getCurrentCycleDay();
    setSelectedDay(currentDay); // Update selected day to current day
    fetchAffirmation(currentDay);
  }, []);

  // Fetch new affirmation when selected day changes (for manual selection)
  useEffect(() => {
    if (selectedDay !== getCurrentCycleDay()) {
      fetchAffirmation(selectedDay);
    }
  }, [selectedDay]);

  // Set up daily refresh of affirmation
  useEffect(() => {
    const checkAndUpdateAffirmation = () => {
      const currentDay = getCurrentCycleDay();
      if (currentDay !== selectedDay) {
        setSelectedDay(currentDay);
        fetchAffirmation(currentDay);
      }
    };

    // Check every hour for day changes
    const interval = setInterval(checkAndUpdateAffirmation, 60 * 60 * 1000);
    
    // Also check when the page becomes visible (user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAndUpdateAffirmation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [selectedDay]);

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    // Example: clear auth tokens, redirect to login, etc.
  };

  const handleOpenFullCalendar = () => {
    setIsFullCalendarModalOpen(true);
  };

  const handleLogDay = (date) => {
    console.log('Log day clicked for:', date);
    // Add your logging logic here
    setIsFullCalendarModalOpen(false);
  };

  const phaseInfo = getPhaseInfo(selectedDay, cycleData);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 via-peach-50 to-lavender-50 font-sans relative overflow-hidden">
      {/* Pattern background for dashboard only */}
      <div
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px',
          opacity: 0.18,
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Subtle radial glows for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-peach-200/15 rounded-full blur-2xl"></div>
      </div>
      
      {/* Sticky Header */}
      <DashboardHeader userName="Simran" onLogout={handleLogout} />
      
      {/* Main Content with proper top padding for sticky header */}
      <div className="pt-16 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-8 pb-8">
        {/* Enhanced Header Section with better spacing */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 relative">
            <span className="bg-gradient-to-r from-gray-800 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Your Cycle, Your{' '}
            </span>
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-magenta-600 bg-clip-text text-transparent font-extrabold animate-pulse">
              Power
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 text-lg animate-bounce">🌸</div>
            <div className="absolute -bottom-2 -left-2 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>🌙</div>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>How are you feeling today?</p>
          
          {/* Enhanced Phase Indicator Banner with Icon */}
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="w-3 h-3 rounded-full animate-pulse" 
                 style={{backgroundColor: phaseInfo.current.color}}></div>
            <span className="text-lg mr-2">
              {phaseInfo.current.name === 'Menstruation' && '🩸'}
              {phaseInfo.current.name === 'Follicular' && '🌸'}
              {phaseInfo.current.name === 'Ovulation' && '🥚'}
              {phaseInfo.current.name === 'Luteal' && '🌙'}
            </span>
            <span className="text-sm font-semibold text-gray-700 transition-all duration-500">
              Day {selectedDay} of {cycleData.cycleLength} • {phaseInfo.current.name} Phase
            </span>
            {phaseInfo.daysUntilNext > 0 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-auto font-medium">
                Next: {phaseInfo.next.name} in {phaseInfo.daysUntilNext} day{phaseInfo.daysUntilNext !== 1 ? 's' : ''}
              </span>
            )}
            
            {/* Mini Phase Indicators */}
            <div className="flex gap-1 ml-4">
              <div className={`w-2 h-2 rounded-full ${selectedDay <= 5 ? 'bg-pink-400' : 'bg-pink-200'}`}></div>
              <div className={`w-2 h-2 rounded-full ${selectedDay > 5 && selectedDay <= 13 ? 'bg-blue-400' : 'bg-blue-200'}`}></div>
              <div className={`w-2 h-2 rounded-full ${selectedDay === 14 ? 'bg-yellow-400' : 'bg-yellow-200'}`}></div>
              <div className={`w-2 h-2 rounded-full ${selectedDay > 14 ? 'bg-green-400' : 'bg-green-200'}`}></div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar with Gradient and Shimmer */}
          <div className="max-w-md mx-auto mb-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>Cycle Progress</span>
              <span>{phaseInfo.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner relative">
              <div className={`bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out relative shadow-lg`}
                   style={{width: `${phaseInfo.progress}%`}}>
                <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Daily Tip and Affirmation Cards - Side by Side */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            {/* Daily Tip Card */}
            <div className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-md rounded-2xl p-6 border border-pink-200/50 shadow-lg relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/10 to-purple-200/10 rounded-2xl"></div>
              
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg relative">
                  <span className="text-xl">🌼</span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Tip for Day {selectedDay}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {selectedDay <= 5 ? 'Stay hydrated and rest well 💧 Your body is doing important work.' :
                     selectedDay <= 13 ? 'Great time for energy and creativity ✨ Trust your intuition.' :
                     selectedDay === 14 ? 'Peak fertility - listen to your body 🥚 Honor your natural rhythm.' :
                     selectedDay <= 28 ? 'Practice self-care and gentle exercise 🌙 Be kind to yourself.' : 'Take it easy and be kind to yourself 💕 You are enough.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Affirmation Card (now dynamic) */}
            <div className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 backdrop-blur-md rounded-2xl p-6 border border-yellow-200/50 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg relative">
                  <span className="text-xl">✨</span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-800">Daily Affirmation</p>
                    {affirmationLoading && (
                      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                      Day {selectedDay}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    {affirmationLoading ? 'Loading your daily affirmation...' : affirmation}
                  </p>
                  <p className="text-xs text-yellow-600 mt-2 font-medium">
                    ✨ Refreshes daily based on your cycle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* New 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column (Calendar + Widgets) - 3/5 width */}
          <div className="lg:col-span-3 space-y-8">
            {/* Calendar Card */}
            <div className="bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20 animate-fade-in-up cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group" 
                 style={{
                     boxShadow: '0 25px 50px rgba(236, 72, 153, 0.1)',
                 }}
                 onClick={handleOpenFullCalendar}>
              <CircularCalendar
                currentDay={cycleData.today}
                totalDays={cycleData.cycleLength}
                cycleConfig={cycleData}
                onDaySelect={setSelectedDay}
              />
              {/* Enhanced Click hint */}
              <div className="text-center mt-6 group-hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full border border-pink-200/50">
                  <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <p className="text-sm font-medium text-pink-700">Click to view full calendar</p>
                </div>
              </div>
            </div>

            {/* Phase Summary Card */}
            <div className="bg-gradient-to-br from-white/90 to-pink-50/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 animate-fade-in-up" 
                 style={{
                     boxShadow: '0 20px 40px rgba(236, 72, 153, 0.08)',
                     borderLeft: `4px solid ${phaseInfo.current.color}`
                 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: phaseInfo.current.color}}></div>
                <h3 className="font-bold text-gray-800 text-lg">{phaseInfo.current.name} Phase</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-white/60 rounded-xl border border-pink-100/50">
                  <span className="text-gray-600">Hormone Levels:</span>
                  <span className="font-medium text-gray-800">
                    {phaseInfo.current.name === 'Menstruation' ? 'Estrogen low' :
                     phaseInfo.current.name === 'Follicular' ? 'Estrogen rising' :
                     phaseInfo.current.name === 'Ovulation' ? 'Estrogen peak' : 'Progesterone high'}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white/60 rounded-xl border border-pink-100/50">
                  <span className="text-gray-600">Common Symptoms:</span>
                  <span className="font-medium text-gray-800">
                    {phaseInfo.current.name === 'Menstruation' ? 'Cramps, Fatigue' :
                     phaseInfo.current.name === 'Follicular' ? 'Energy, Cravings' :
                     phaseInfo.current.name === 'Ovulation' ? 'Libido, Acne' : 'Mood swings, Bloating'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Symptom Log */}
            <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 animate-fade-in-up" 
                 style={{
                     boxShadow: '0 20px 40px rgba(147, 51, 234, 0.08)',
                 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <FiCalendar className="text-white text-lg" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Recent Symptoms</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-purple-100/50">
                  <span className="text-gray-500">🗓️ Day 7</span>
                  <span className="text-gray-700">Cramps, Mood Swings</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-purple-100/50">
                  <span className="text-gray-500">🗓️ Day 6</span>
                  <span className="text-gray-700">Headache</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-purple-100/50">
                  <span className="text-gray-500">🗓️ Day 5</span>
                  <span className="text-gray-500 italic">No symptoms logged</span>
                </div>
              </div>
            </div>

            {/* Mood Tracker */}
            <MoodTracker />
          </div>

          {/* Right Column (Symptoms + Other Cards) - 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Log Symptoms Card - Limited Height */}
            <div className="animate-slide-in-left relative" style={{animationDelay: '0.1s'}}>
              <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 hover-lift transition-all duration-300 h-[calc(100vh-200px)] overflow-hidden"
                   style={{
                       boxShadow: '0 20px 40px rgba(147, 51, 234, 0.1)',
                   }}>
                <div className="p-6 border-b border-pink-100/50 bg-gradient-to-r from-pink-50/50 to-purple-50/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                        <FiActivity className="text-white text-lg" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Log Symptoms</h3>
                    </div>
                    <button className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors bg-pink-100 hover:bg-pink-200 px-3 py-1 rounded-full">
                      Filter
                    </button>
                  </div>
                </div>
                <div className="p-6 h-full overflow-y-auto custom-scrollbar relative">
                  <SymptomCardContent selectedSymptoms={selectedSymptoms} onSymptomToggle={handleSymptomToggle} />
                  
                  {/* Floating Add Button */}
                  <button className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10">
                    <FiPlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats, Notes, Reminders - Compact Layout */}
            <div className="space-y-4">
              <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                <CycleStatsCard currentDay={selectedDay} cycleLength={cycleData.cycleLength} />
              </div>
              <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                <NotesCard />
              </div>
              <div className="animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                <RemindersCard />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Calendar Modal */}
      {isFullCalendarModalOpen && (
        <FullCalendarModal
          isOpen={isFullCalendarModalOpen}
          onClose={() => setIsFullCalendarModalOpen(false)}
          cycleData={cycleData}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          onLogDay={handleLogDay}
        />
      )}
    </div>
  );
} 