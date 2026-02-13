import React from 'react';
import dayjs from 'dayjs';

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="text-sm font-semibold mb-2">This Week</div>
      <div className="flex gap-2">
        {days.map((day) => {
          const isSelected = day.format('YYYY-MM-DD') === selectedDate;
          const isToday = day.format('YYYY-MM-DD') === today;
          return (
            <button
              key={day.format('YYYY-MM-DD')}
              onClick={() => setSelectedDate(day.format('YYYY-MM-DD'))}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${isSelected ? 'bg-pink-300 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:shadow-md'}
                ${isToday ? 'border-2 border-pink-400 bg-pink-50' : ''}`}
            >
              <div>{day.format('dd')}</div>
              <div className="text-xs">{day.format('D')}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 