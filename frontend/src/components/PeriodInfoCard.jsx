import React from 'react';
import dayjs from 'dayjs';

const CYCLE_LENGTH = 28;
const PERIOD_LENGTH = 5;
const FERTILE_START = 12;
const FERTILE_END = 16;
const OVULATION_DAY = 14;

function getCycleDay(selectedDate) {
  const baseDate = dayjs().startOf('month');
  return dayjs(selectedDate).diff(baseDate, 'day') + 1;
}

function getPhase(day) {
  if (day <= PERIOD_LENGTH) return 'Menstrual';
  if (day <= 13) return 'Follicular';
  if (day === 14) return 'Ovulation';
  return 'Luteal';
}

function getPregnancyChance(day) {
  if (day >= FERTILE_START && day <= FERTILE_END) return 'High';
  if (day <= PERIOD_LENGTH) return 'Low';
  if (day === OVULATION_DAY) return 'Very High';
  return 'Moderate';
}

export default function PeriodInfoCard({ selectedDate }) {
  const cycleDay = getCycleDay(selectedDate);
  const phase = getPhase(cycleDay);
  const chance = getPregnancyChance(cycleDay);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-pink-200 text-transparent bg-clip-text mb-2">Day {cycleDay}</div>
      <div className="flex gap-2 mb-2">
        <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-bold">{phase}</span>
        <span className="inline-block bg-coral-100 text-coral-700 rounded-full px-3 py-1 text-xs font-bold">{chance}</span>
      </div>
      <div className="text-base text-gray-500 font-medium">Period Info</div>
    </div>
  );
} 