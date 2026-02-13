import React from 'react';

export default function StatCard({ stats }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="text-lg font-extrabold mb-2">Cycle Stats</div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="clock">🕒</span>
          <span className="text-xs text-gray-500 mb-1">Avg. Cycle Length</span>
          <span className="bg-indigo-100 text-indigo-700 rounded-full px-2 py-1 font-bold ml-auto">{stats.avgCycleLength} days</span>
        </div>
        <div className="flex items-center gap-2">
          <span role="img" aria-label="drop">💧</span>
          <span className="text-xs text-gray-500 mb-1">Avg. Period Length</span>
          <span className="bg-pink-100 text-pink-700 rounded-full px-2 py-1 font-bold ml-auto">{stats.avgPeriodLength} days</span>
        </div>
      </div>
    </div>
  );
} 