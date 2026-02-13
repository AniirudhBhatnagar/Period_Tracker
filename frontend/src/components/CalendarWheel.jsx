import React from 'react';
import dayjs from 'dayjs';

const PHASES = [
  { name: 'Period', color: '#F44336' },      // Red
  { name: 'Follicular', color: '#B39DDB' },  // Light Purple
  { name: 'Fertile', color: '#58C2B3' },     // Green
  { name: 'Ovulation', color: '#2196F3' },   // Blue
  { name: 'Luteal', color: '#9575CD' },      // Darker Purple
];

function getPhase(day, periodLength, fertileStart, fertileEnd, ovulationDay) {
  if (day <= periodLength) return 'Period';
  if (day >= fertileStart && day <= fertileEnd) {
    if (day === ovulationDay) return 'Ovulation';
    return 'Fertile';
  }
  if (day < fertileStart) return 'Follicular';
  return 'Luteal';
}

export default function CalendarWheel({
  cycleLength = 28,
  cycleStartDate = '2025-06-01',
  periodLength = 5,
  fertileStart = 12,
  fertileEnd = 16,
  ovulationDay = 14,
  today = dayjs(),
  selectedDate,
  setSelectedDate
}) {
  const cycleDay = dayjs(today).diff(dayjs(cycleStartDate), 'day') % cycleLength + 1;
  const radius = 80, stroke = 18, center = 100;
  const segments = Array.from({ length: cycleLength }, (_, i) => {
    const dayNum = i + 1;
    const phase = getPhase(dayNum, periodLength, fertileStart, fertileEnd, ovulationDay);
    const color = PHASES.find(p => p.name === phase).color;
    return { color, phase, dayNum };
  });

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl shadow-2xl border border-pink-100 p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <svg width={200} height={200} className="mb-2">
        {/* Base ring */}
        <circle cx={center} cy={center} r={radius} stroke="#F3E8EE" strokeWidth={stroke} fill="none" />
        {/* Progress arcs */}
        {segments.map((seg, i) => {
          const startAngle = (i / cycleLength) * 360;
          const endAngle = ((i + 1) / cycleLength) * 360;
          const largeArc = endAngle - startAngle > 180 ? 1 : 0;
          const start = {
            x: center + radius * Math.cos((Math.PI / 180) * (startAngle - 90)),
            y: center + radius * Math.sin((Math.PI / 180) * (startAngle - 90)),
          };
          const end = {
            x: center + radius * Math.cos((Math.PI / 180) * (endAngle - 90)),
            y: center + radius * Math.sin((Math.PI / 180) * (endAngle - 90)),
          };
          // Only fill up to current day
          if (seg.dayNum > cycleDay) return null;
          return (
            <path
              key={i}
              d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`}
              stroke={seg.color}
              strokeWidth={stroke}
              fill="none"
              style={{ transition: 'stroke 0.5s, stroke-width 0.5s' }}
            />
          );
        })}
        {/* Ovulation day blue dot */}
        {segments.map((seg, i) =>
          seg.phase === 'Ovulation' ? (
            <circle
              key={'ovulation-dot'}
              cx={center + (radius + 10) * Math.cos((Math.PI / 180) * ((i / cycleLength) * 360 - 90))}
              cy={center + (radius + 10) * Math.sin((Math.PI / 180) * ((i / cycleLength) * 360 - 90))}
              r={7}
              fill="#2196F3"
              className="animate-pulse"
            />
          ) : null
        )}
        {/* Center text */}
        <circle cx={center} cy={center} r={radius - stroke} fill="#fff" />
        <text x={center} y={center} textAnchor="middle" fontSize="2.5rem" fontWeight="bold"
          fill={segments[cycleDay - 1].color} className="drop-shadow-lg">{cycleDay}</text>
        <text x={center} y={center + 28} textAnchor="middle" fontSize="1.1rem" fill="#888">Day</text>
      </svg>
      {/* Legend */}
      <div className="flex gap-4 mt-2 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: PHASES[0].color }}></span>Period</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: PHASES[2].color }}></span>Fertile</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: PHASES[3].color }}></span>Ovulation</span>
      </div>
    </div>
  );
} 