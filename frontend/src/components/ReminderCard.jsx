import React from 'react';

export default function ReminderCard({ reminders }) {
  return (
    <div className="bg-purple-100 rounded-2xl shadow-lg p-6">
      <div className="text-lg font-extrabold mb-2 text-purple-700">Reminders</div>
      <div className="flex flex-col gap-2">
        {reminders.length === 0 && <div className="text-xs text-gray-400">No reminders for today.</div>}
        {reminders.map((reminder, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-purple-200 rounded-full px-3 py-2 text-sm text-purple-800 hover:scale-105 hover:shadow-lg transition-all">
            <span className="material-icons text-base">schedule</span>
            {reminder}
          </div>
        ))}
      </div>
    </div>
  );
} 