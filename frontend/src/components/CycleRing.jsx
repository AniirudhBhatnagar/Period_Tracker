import React, { useState } from 'react';
import dayjs from 'dayjs';

const PHASES = [
  { name: 'Period', color: 'from-red-500 to-red-400', dot: 'bg-red-500' },
  { name: 'Fertile', color: 'from-blue-500 to-blue-400', dot: 'bg-blue-500' },
  { name: 'Ovulation', color: 'from-orange-400 to-yellow-400', dot: 'bg-orange-400' },
  { name: 'Other', color: 'from-gray-200 to-gray-100', dot: 'bg-gray-300' },
];

function getPhase(day, { periodLength, fertileStart, ovulationDay }) {
  if (day <= periodLength) return 'Period';
  if (day === ovulationDay) return 'Ovulation';
  if (day >= fertileStart && day < ovulationDay) return 'Fertile';
  return 'Other';
}

export default function CycleRing({ cycleData }) {
  const {
    cycleLength = 28,
    periodLength = 5,
    fertileStart = 11,
    ovulationDay = 14,
    today = 2,
    currentPhase = 'Period',
  } = cycleData;

  const [hoverDay, setHoverDay] = useState(null);

  const radius = 90;
  const stroke = 18;
  const center = 120;
  const circumference = 2 * Math.PI * radius;

  // For animation: fill up to today
  const arcLength = (today / cycleLength) * circumference;

  // For day markers
  const markers = Array.from({ length: cycleLength }, (_, i) => {
    const dayNum = i + 1;
    const phase = getPhase(dayNum, { periodLength, fertileStart, ovulationDay });
    let color = PHASES.find(p => p.name === phase)?.dot || PHASES[3].dot;
    let isCurrent = dayNum === today;
    let isOvulation = dayNum === ovulationDay;
    return { dayNum, phase, color, isCurrent, isOvulation };
  });

  // For ring segments (period, fertile, ovulation, other)
  const getArc = (start, end, color) => {
    const startAngle = (start / cycleLength) * 360 - 90;
    const endAngle = (end / cycleLength) * 360 - 90;
    const largeArc = end - start > cycleLength / 2 ? 1 : 0;
    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    return (
      <path
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
        stroke={`url(#${color})`}
        strokeWidth={stroke}
        fill="none"
        key={color + start}
        style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(.4,2,.6,1)' }}
      />
    );
  };

  // Segments for each phase
  const segments = [
    { start: 0, end: periodLength, color: 'period-gradient' },
    { start: periodLength, end: fertileStart, color: 'other-gradient' },
    { start: fertileStart, end: ovulationDay - 1, color: 'fertile-gradient' },
    { start: ovulationDay - 1, end: ovulationDay, color: 'ovulation-gradient' },
    { start: ovulationDay, end: cycleLength, color: 'other-gradient' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg width={240} height={240} className="block mx-auto">
        {/* Gradients */}
        <defs>
          <linearGradient id="period-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F44336" />
            <stop offset="1" stopColor="#FF8A65" />
          </linearGradient>
          <linearGradient id="fertile-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2196F3" />
            <stop offset="1" stopColor="#00BCD4" />
          </linearGradient>
          <linearGradient id="ovulation-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFA726" />
            <stop offset="1" stopColor="#FFD54F" />
          </linearGradient>
          <linearGradient id="other-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#E0E0E0" />
            <stop offset="1" stopColor="#F3E8EE" />
          </linearGradient>
        </defs>
        {/* Base ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#F3E8EE"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Progress segments */}
        {segments.map(({ start, end, color }) =>
          today > start ? getArc(start, Math.min(end, today), color) : null
        )}
        {/* Day markers */}
        {markers.map((m, i) => {
          const angle = (i / cycleLength) * 360 - 90;
          const rad = (Math.PI / 180) * angle;
          const x = center + (radius + 22) * Math.cos(rad);
          const y = center + (radius + 22) * Math.sin(rad);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={m.isCurrent ? 7 : m.isOvulation ? 6 : 4}
                className={
                  `transition-all duration-300 ` +
                  (m.isCurrent ? 'fill-pink-500 animate-pulse shadow-lg' : m.isOvulation ? 'fill-orange-400' : m.color)
                }
                onMouseEnter={() => setHoverDay(m.dayNum)}
                onMouseLeave={() => setHoverDay(null)}
                style={{ cursor: 'pointer', filter: m.isCurrent ? 'drop-shadow(0 0 8px #FBA8C2)' : 'none' }}
              />
              {/* Tooltip */}
              {hoverDay === m.dayNum && (
                <foreignObject x={x - 30} y={y - 40} width={60} height={30}>
                  <div className="absolute z-50 bg-white/90 text-xs rounded shadow p-1 text-center border border-gray-200">
                    <div>Day {m.dayNum}</div>
                    <div>{m.phase}</div>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
        {/* Center white circle */}
        <circle cx={center} cy={center} r={radius - stroke} fill="#fff" />
        {/* Center day number */}
        <text
          x={center}
          y={center - 10}
          textAnchor="middle"
          fontSize="2.5rem"
          fontWeight="bold"
          fill={
            currentPhase === 'Period'
              ? '#F44336'
              : currentPhase === 'Fertile'
              ? '#2196F3'
              : currentPhase === 'Ovulation'
              ? '#FFA726'
              : '#888'
          }
          className="drop-shadow-lg"
        >
          {today}
        </text>
        {/* Center phase label */}
        <text
          x={center}
          y={center + 20}
          textAnchor="middle"
          fontSize="1.1rem"
          fill="#888"
          className="font-semibold"
        >
          {currentPhase}
        </text>
        {/* Center CTA button */}
        <foreignObject x={center - 40} y={center + 30} width={80} height={50}>
          <button
            className="w-full flex items-center justify-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold rounded-full py-2 px-4 mt-2 shadow transition-all duration-200"
            style={{ fontSize: '1rem' }}
          >
            <span role="img" aria-label="heart" className="text-lg">❤️</span>
            Log Symptoms
          </button>
        </foreignObject>
      </svg>
      {/* Legend */}
      <div className="flex gap-4 mt-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full inline-block bg-red-500"></span>Period
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full inline-block bg-blue-500"></span>Fertile
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full inline-block bg-orange-400"></span>Ovulation
        </span>
      </div>
    </div>
  );
} 