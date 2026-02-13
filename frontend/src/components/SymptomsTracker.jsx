import React, { useState } from 'react';

const SYMPTOM_GROUPS = {
  Pain: [
    { label: 'Headache', icon: '🤕' },
    { label: 'Cramps', icon: '💢' },
    { label: 'Backache', icon: '🦴' },
    { label: 'Breast tenderness', icon: '🤲' },
  ],
  Emotional: [
    { label: 'Mood swings', icon: '😵' },
    { label: 'Anxiety', icon: '😰' },
    { label: 'Fatigue', icon: '😫' },
    { label: 'Cravings', icon: '🍫' },
  ],
  Other: [
    { label: 'Acne', icon: '🧴' },
    { label: 'Bloating', icon: '💨' },
    { label: 'Diarrhea', icon: '🚽' },
    { label: 'Nausea', icon: '🤢' },
  ],
};

const groupColors = {
  Pain: 'bg-pink-200 hover:bg-pink-300',
  Emotional: 'bg-blue-200 hover:bg-blue-300',
  Other: 'bg-green-200 hover:bg-green-300',
};

export default function SymptomsTracker({ selectedDate }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-extrabold mb-2">Symptoms</h2>
      {Object.entries(SYMPTOM_GROUPS).map(([group, symptoms]) => (
        <div key={group} className="mb-2">
          <div className="text-xs font-bold text-gray-400 mb-1">{group}</div>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => toggleSymptom(label)}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow transition-all duration-150 scale-100 hover:scale-105 focus:scale-95 font-medium
                  ${groupColors[group]}
                  ${selectedSymptoms.includes(label) ? 'ring-2 ring-pink-400' : ''}`}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 