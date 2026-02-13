import React from 'react';

const CYCLE_LENGTH = 28;
const PERIOD_LENGTH = 5;
const FERTILE_START = 12;
const FERTILE_END = 16;
const OVULATION_DAY = 14;

function getPhase(day) {
  if (day <= PERIOD_LENGTH) return 'period';
  if (day >= FERTILE_START && day <= FERTILE_END) return day === OVULATION_DAY ? 'ovulation' : 'fertile';
  return 'normal';
}

export default function CycleTracker({ cycleDay = 4 }) {
  const segments = Array.from({ length: CYCLE_LENGTH }, (_, i) => {
    const phase = getPhase(i + 1);
    let color = '#E0E0E0';
    if (phase === 'period') color = '#F44336'; // red
    if (phase === 'fertile') color = '#58C2B3'; // green
    if (phase === 'ovulation') color = '#FFD600'; // yellow
    return { color, phase };
  });

  const radius = 80;
  const stroke = 18;
  const center = 100;

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-xs mx-auto">
      <svg width={200} height={200} className="mb-2">
        {segments.map((seg, i) => {
          const startAngle = (i / CYCLE_LENGTH) * 360;
          const endAngle = ((i + 1) / CYCLE_LENGTH) * 360;
          const largeArc = endAngle - startAngle > 180 ? 1 : 0;
          const start = {
            x: center + radius * Math.cos((Math.PI / 180) * (startAngle - 90)),
            y: center + radius * Math.sin((Math.PI / 180) * (startAngle - 90)),
          };
          const end = {
            x: center + radius * Math.cos((Math.PI / 180) * (endAngle - 90)),
            y: center + radius * Math.sin((Math.PI / 180) * (endAngle - 90)),
          };
          return (
            <path
              key={i}
              d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`}
              stroke={seg.color}
              strokeWidth={stroke}
              fill="none"
              opacity={i + 1 <= cycleDay ? 1 : 0.3}
            />
          );
        })}
        <circle cx={center} cy={center} r={radius - stroke} fill="#fff" />
        <text x={center} y={center - 10} textAnchor="middle" fontSize="2rem" fontWeight="bold" fill="#F44336">
          {cycleDay}
        </text>
        <text x={center} y={center + 20} textAnchor="middle" fontSize="1rem" fill="#888">
          Day
        </text>
      </svg>
      <div className="flex gap-3 mt-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#F44336'}}></span>Period</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#58C2B3'}}></span>Fertile</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#FFD600'}}></span>Ovulation</span>
      </div>
    </div>
  );
} 