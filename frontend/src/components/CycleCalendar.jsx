import React, { useState } from 'react';

// --- Data & Configuration ---
const PHASES = {
  MENSTRUATION: { 
    name: 'Menstruation', 
    color: '#fca5a5', 
    textColor: 'text-pink-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-300'
  },
  FOLLICULAR: { 
    name: 'Follicular', 
    color: '#6ee7b7', 
    textColor: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300'
  },
  OVULATION: { 
    name: 'Ovulation', 
    color: '#fcd34d', 
    textColor: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300'
  },
  LUTEAL: { 
    name: 'Luteal Phase', 
    color: '#a5b4fc', 
    textColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-300'
  },
};

const SYMPTOMS = {
  Pain: ['Headache', 'Cramps', 'Backache', 'Tenderness'],
  Emotional: ['Mood Swings', 'Anxiety', 'Fatigue', 'Cravings'],
  Other: ['Acne', 'Bloating', 'Diarrhea', 'Nausea'],
};

// --- Helper Functions ---
const getPhase = (day, { periodLength, ovulationDay, fertileStart, fertileEnd }) => {
  if (day <= periodLength) return PHASES.MENSTRUATION;
  if (day === ovulationDay) return PHASES.OVULATION;
  if (day >= fertileStart && day <= fertileEnd) return PHASES.FOLLICULAR;
  return PHASES.LUTEAL;
};

// --- Main Component ---
export default function CycleCalendar({ cycle, userName = "Simran" }) {
  const {
    cycleLength = 28,
    periodLength = 5,
    fertileStart = 11,
    fertileEnd = 17,
    ovulationDay = 14,
    today = 9,
  } = cycle || {};

  const [currentDay, setCurrentDay] = useState(today);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Cramps', 'Fatigue']);

  const currentPhase = getPhase(currentDay, { periodLength, ovulationDay, fertileStart, fertileEnd });

  const handleDayClick = (day) => setCurrentDay(day);
  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  // Calculate progress percentage
  const progressPercentage = (currentDay / cycleLength) * 100;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-indigo-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between py-2">
            <img src="/images/my_rhythm_logo.png" alt="MyRhythm Logo" className="h-9 w-auto" />
            <span className="text-sm font-medium text-gray-600">Hi, {userName} 👋</span>
        </header>

        <main className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            <div className="w-full animate-[fade-in-up_0.6s_ease-out]">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Your Cycle Journey
              </h1>
              <p className="text-sm text-gray-500 mt-1">Track your current phase, stay informed, and feel in control.</p>
            </div>
            
            <ThisWeekView today={today} periodLength={periodLength} onDayClick={handleDayClick} />
            
            <CircularDayTracker 
              cycleConfig={{ cycleLength, periodLength, fertileStart, fertileEnd, ovulationDay }} 
              currentDay={currentDay} 
              onDayClick={handleDayClick}
              onDayHover={setHoveredDay}
              hoveredDay={hoveredDay}
              progressPercentage={progressPercentage}
            />

            {/* Phase Legend */}
            <div className="mt-6 w-full max-w-md bg-white rounded-xl shadow-sm p-4 animate-[fade-in-up_0.6s_0.3s_ease-out_forwards]" style={{opacity: 0}}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Cycle Phases</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PHASES).map(([key, phase]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: phase.color }}
                    ></div>
                    <span className="text-xs font-medium text-gray-600">{phase.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-6 animate-[fade-in-up_0.6s_0.2s_ease-out_forwards]" style={{opacity: 0}}>
            <SymptomCard selectedSymptoms={selectedSymptoms} onSymptomToggle={handleSymptomToggle} />
            <CycleStatsCard currentDay={currentDay} cycleLength={cycleLength} />
            <RemindersCard />
            <NotesCard />
          </aside>
        </main>
      </div>
    </div>
  );
}

// --- Sub-components ---

const ThisWeekView = ({ today, periodLength, onDayClick }) => {
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = today - (new Date().getDay() - i -1) % 7;
        return { day, name: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(2023, 0, day).getDay()] };
    });

    return (
        <div className="mt-8 w-full max-w-md bg-white rounded-xl shadow-sm p-4 animate-[fade-in-up_0.6s_0.1s_ease-out_forwards]" style={{opacity: 0}}>
            <div className="flex justify-between items-center space-x-2">
                {weekDays.map(({ day, name }, i) => (
                    <div key={i} className="text-center space-y-2">
                        <span className="text-xs text-gray-400 font-medium">{name}</span>
                        <button
                            onClick={() => onDayClick(day)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200
                                ${day === today ? 'bg-pink-500 text-white font-bold shadow-md animate-pulse' : 'hover:bg-gray-100 hover:scale-110'}`
                            }
                        >
                            {day}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CircularDayTracker = ({ cycleConfig, currentDay, onDayClick, onDayHover, hoveredDay, progressPercentage }) => {
  const { cycleLength, periodLength, fertileStart, fertileEnd, ovulationDay } = cycleConfig;
  const currentPhase = getPhase(currentDay, cycleConfig);
  
  return (
    <div className="relative mt-8 w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] animate-[fade-in-up_0.6s_0.2s_ease-out_forwards]" style={{opacity: 0}}>
      {/* Progress Ring */}
      <div className="absolute inset-0 rounded-full">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#f3f4f6"
            strokeWidth="2"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Phase Background Ring */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-50 to-indigo-50 shadow-lg"></div>

      {/* Day Markers */}
      {Array.from({ length: cycleLength }, (_, i) => {
        const dayNum = i + 1;
        const phase = getPhase(dayNum, cycleConfig);
        const angle = (dayNum / cycleLength) * 360;
        const isCurrent = dayNum === currentDay;
        const isToday = dayNum === 9; // Hardcoded for demo
        const radius = window.innerWidth >= 640 ? (window.innerWidth >= 1024 ? 180 : 160) : 130;
        const markerStyle = { transform: `rotate(${angle}deg) translate(${radius}px)` };

        return (
          <div
            key={dayNum}
            className="absolute top-1/2 left-1/2 -ml-4 -mt-4 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer group touch-manipulation"
            style={markerStyle}
            onMouseEnter={() => onDayHover({ day: dayNum, phase: phase.name })}
            onMouseLeave={() => onDayHover(null)}
            onClick={() => onDayClick(dayNum)}
            aria-label={`Day ${dayNum}, Phase: ${phase.name}`}
          >
            {/* Phase indicator ring */}
            <div 
              className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                isCurrent ? 'border-current scale-125' : 'border-transparent group-hover:border-current group-hover:scale-110'
              }`}
              style={{ borderColor: phase.color }}
            ></div>
            
            {/* Day circle */}
            <div className={`relative w-full h-full rounded-full flex justify-center items-center transition-all duration-300 shadow-sm
              ${isCurrent 
                ? `bg-white border-2 border-current text-current font-bold shadow-lg scale-110` 
                : isToday 
                ? `bg-pink-500 text-white font-bold shadow-md animate-pulse` 
                : 'bg-white hover:bg-gray-50 hover:shadow-md active:scale-95'
              }`}
              style={isCurrent ? { borderColor: phase.color, color: phase.color } : {}}
            >
              <span className="text-xs sm:text-sm -rotate-90 font-medium">{dayNum}</span>
            </div>

            {/* Today label */}
            {isToday && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <span className="text-xs font-bold text-pink-600 bg-white px-2 py-1 rounded-full shadow-sm">
                  Today
                </span>
              </div>
            )}
          </div>
        );
      })}

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <p className="text-base text-gray-500 font-medium">{currentPhase.name}</p>
          <h2 className={`text-5xl sm:text-6xl font-bold ${currentPhase.textColor} drop-shadow-sm`}>
            Day {currentDay}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {cycleLength - currentDay} days remaining
          </p>
          <button className="mt-4 px-6 py-3 text-sm bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Log Symptoms
          </button>
        </div>
      </div>

      {/* Enhanced Tooltip */}
      {hoveredDay && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[180%] z-50 pointer-events-none animate-[fade-in_0.2s_ease-out]">
          <div className="bg-gray-900 text-white rounded-xl px-4 py-3 text-center shadow-2xl border border-gray-700">
            <p className="font-bold text-sm">Day {hoveredDay.day}</p>
            <p className="text-xs text-gray-300 mb-1">{hoveredDay.phase}</p>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-gray-300">Click to view details</span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, actionButton, children }) => (
    <div className="bg-white rounded-2xl shadow-md p-5 animate-[fade-in-up_0.5s_ease-out_forwards] hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800">{title}</h3>
            </div>
            {actionButton}
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const SymptomCard = ({ selectedSymptoms, onSymptomToggle }) => (
    <InfoCard title="Symptoms" actionButton={<span className="cursor-pointer text-gray-400 hover:text-gray-700 text-lg">+</span>}>
        {Object.entries(SYMPTOMS).map(([category, symptoms]) => (
            <div key={category}>
                <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                    {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                    {symptoms.map(symptom => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <button
                                key={symptom}
                                onClick={() => onSymptomToggle(symptom)}
                                className={`text-xs font-medium rounded-full px-3 py-1.5 cursor-pointer transition-all duration-200 border
                                    ${isSelected 
                                        ? 'bg-pink-100 border-pink-300 text-pink-700 shadow-sm scale-105' 
                                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:scale-105'
                                    }`
                                }
                            >
                                {symptom}
                            </button>
                        );
                    })}
                </div>
            </div>
        ))}
    </InfoCard>
);

const CycleStatsCard = ({ currentDay, cycleLength }) => (
    <InfoCard title="Cycle Stats">
        <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                    Current Day
                </span>
                <span className="font-semibold text-gray-800">{currentDay} of {cycleLength}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                    Avg Period
                </span>
                <span className="font-semibold text-gray-800">5 days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                    Avg Cycle
                </span>
                <span className="font-semibold text-gray-800">28 days</span>
            </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-indigo-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
                Last updated: Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
        </div>
    </InfoCard>
);

const RemindersCard = () => (
    <InfoCard title="Reminders" actionButton={<span className="cursor-pointer text-gray-400 hover:text-gray-700 text-lg">+</span>}>
        <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-indigo-800 flex-1">09:00 – Time to take pill</p>
                <span className="text-green-500 opacity-50">✓</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-indigo-800 flex-1">19:00 – Doctor's appointment</p>
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></div>
            </div>
        </div>
    </InfoCard>
);

const NotesCard = () => (
    <InfoCard title="Notes">
        <textarea 
            className="w-full h-24 p-3 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 resize-none" 
            placeholder="Write anything you noticed today..."
        ></textarea>
        <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">Auto-saved</span>
            <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">Save Note</button>
        </div>
    </InfoCard>
);