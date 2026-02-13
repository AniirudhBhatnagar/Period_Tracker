import React, { useState } from "react";

// --- Data & Configuration ---
const PHASES = {
  MENSTRUATION: { name: 'Menstruation', color: '#F87171', className: 'text-red-500', range: [1, 5] },
  FOLLICULAR:   { name: 'Follicular',   color: '#a78bfa', className: 'text-indigo-500', range: [6, 13] },
  OVULATION:    { name: 'Ovulation',    color: '#FBBF24', className: 'text-amber-500', range: [14, 14] },
  LUTEAL:       { name: 'Luteal',       color: '#4ade80', className: 'text-green-500', range: [15, 28] },
  NONE:         { name: 'Cycle',        color: 'gray',     className: 'text-gray-400', range: [] },
};

// --- Helper Functions ---
const getPhase = (day, { periodLength = 5, ovulationDay = 14, cycleLength = 28 }) => {
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  if (day <= periodLength) return PHASES.MENSTRUATION;
  if (day > periodLength && day < fertileStart) return PHASES.FOLLICULAR;
  if (day >= fertileStart && day <= fertileEnd) return PHASES.OVULATION;
  if (day > fertileEnd) return PHASES.LUTEAL;
  return PHASES.NONE;
};

const CircularCalendar = ({ totalDays = 28, currentDay = 2, onDaySelect, cycleConfig = {} }) => {
  const radius = 120;
  const center = 150;
  const angleStep = 360 / totalDays;
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [hoveredInfo, setHoveredInfo] = useState(null);

  const selectedPhase = getPhase(selectedDay, cycleConfig);
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (selectedDay / totalDays) * circumference;

  const getCoordinates = (angle, customRadius = radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + customRadius * Math.cos(rad),
      y: center + customRadius * Math.sin(rad),
    };
  };

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] mx-auto my-8 drop-shadow-lg">
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-rose-50 border-8 border-white shadow-inner"></div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute top-0 left-0 overflow-visible">
        {/* Phase Labels */}
        {Object.values(PHASES).filter(p => p.range.length > 0).map(phase => {
            const startAngle = (phase.range[0] / totalDays) * 360 - 90;
            const endAngle = (phase.range[1] / totalDays) * 360 - 90;
            const midAngle = (startAngle + endAngle) / 2;
            const { x, y } = getCoordinates(midAngle, radius + 40);

            return (
                <text
                    key={phase.name}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] font-semibold"
                    style={{ fill: phase.color, transform: `rotate(${midAngle + 90}deg)`, transformOrigin: `${x}px ${y}px` }}
                >
                    {phase.name}
                </text>
            );
        })}

        {/* Progress Arc - a subtle background track */}
        <circle
          cx={center}
          cy={center}
          r={radius + 20}
          fill="none"
          stroke="#fde2e4" // Soft accent color for the track
          strokeWidth="4"
        />

        {[...Array(totalDays)].map((_, i) => {
          const angle = angleStep * i - 90;
          const { x, y } = getCoordinates(angle);
          const day = i + 1;
          const phase = getPhase(day, cycleConfig);
          const isToday = day === currentDay;
          const isSelected = day === selectedDay;

          // Arc for each phase segment
          const startAngle = angleStep * (i - 1) - 90;
          const endAngle = angleStep * i - 90;
          const start = getCoordinates(startAngle, radius + 20);
          const end = getCoordinates(endAngle, radius + 20);

          return (
            <g
              key={i}
              className="cursor-pointer group"
              onClick={() => {
                setSelectedDay(day);
                if (onDaySelect) onDaySelect(day);
              }}
              onMouseEnter={() => setHoveredInfo({ day, phase: phase.name, x, y })}
              onMouseLeave={() => setHoveredInfo(null)}
            >
              {/* Thin arc for phase color */}
              <path
                d={`M ${start.x} ${start.y} A ${radius + 20} ${radius + 20} 0 0 1 ${end.x} ${end.y}`}
                stroke={phase.color}
                strokeWidth="6"
                fill="none"
                opacity={0.9}
              />
              
              {/* Circle for the day number */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 16 : 12}
                className={`transition-all duration-300 ${
                  isSelected ? 'fill-white stroke-2' : 'fill-white group-hover:fill-gray-100'
                }`}
                style={{ stroke: isSelected ? phase.color : 'transparent' }}
              />
              {/* Pulsing ring for today */}
              {isToday && (
                <circle
                  cx={x}
                  cy={y}
                  r="16"
                  className="fill-transparent stroke-pink-500 animate-pulse"
                  strokeWidth="3"
                  style={{'--tw-shadow': '0 0 12px rgba(236, 72, 153, 0.7)', 'boxShadow': 'var(--tw-shadow)'}}
                />
              )}

              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs font-bold transition ${
                  isSelected
                    ? phase.className
                    : isToday 
                    ? "text-pink-600 font-extrabold"
                    : "text-gray-500 group-hover:text-gray-800"
                }`}
              >
                {day}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center Day Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className={`text-sm font-semibold ${getPhase(selectedDay, cycleConfig).className}`}>{selectedPhase.name}</p>
        <p className="text-4xl font-extrabold text-gray-900">Day {selectedDay}</p>
        <button className="mt-2 px-4 py-1.5 text-white bg-pink-500 rounded-full shadow hover:bg-pink-600 text-sm pointer-events-auto">
          Log Symptoms
        </button>
      </div>

      {/* Hover Tooltip */}
      {hoveredInfo && (
        <div
          className="absolute bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg pointer-events-none transition-all duration-200"
          style={{
            left: hoveredInfo.x,
            top: hoveredInfo.y - 40, // Position above the day
            transform: 'translateX(-50%)',
          }}
        >
          Day {hoveredInfo.day} - {hoveredInfo.phase}
        </div>
      )}
    </div>
  );
};

export default CircularCalendar;