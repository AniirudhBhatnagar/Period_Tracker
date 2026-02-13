import React, { useState } from 'react';

export default function NotesCard({ selectedDate }) {
  const [note, setNote] = useState('');
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-yellow-100 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-lg font-extrabold">Notes</div>
        <button
          className="text-xs text-gray-500 hover:text-gray-700 transition-all"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      {expanded && (
        <textarea
          className="w-full rounded border border-gray-200 p-2 text-sm min-h-[60px] bg-yellow-50 shadow-inner"
          placeholder="Add a note for today..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      )}
    </div>
  );
} 