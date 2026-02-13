import React, { useState } from 'react';
import { FiHeart, FiTrendingUp } from 'react-icons/fi';

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'from-green-400 to-emerald-500' },
    { emoji: '😌', label: 'Calm', color: 'from-blue-400 to-cyan-500' },
    { emoji: '😔', label: 'Sad', color: 'from-gray-400 to-slate-500' },
    { emoji: '😤', label: 'Anxious', color: 'from-orange-400 to-amber-500' },
    { emoji: '😴', label: 'Tired', color: 'from-purple-400 to-indigo-500' },
    { emoji: '😡', label: 'Irritable', color: 'from-red-400 to-pink-500' }
  ];

  const weeklyMoods = [
    { day: 'Mon', mood: '😊', intensity: 8 },
    { day: 'Tue', mood: '😌', intensity: 6 },
    { day: 'Wed', mood: '😔', intensity: 4 },
    { day: 'Thu', mood: '😤', intensity: 3 },
    { day: 'Fri', mood: '😊', intensity: 7 },
    { day: 'Sat', mood: '😌', intensity: 9 },
    { day: 'Sun', mood: '😴', intensity: 5 }
  ];

  return (
    <div className="bg-gradient-to-br from-white/90 to-green-50/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
          <FiHeart className="text-white text-lg" />
        </div>
        <h3 className="font-bold text-gray-800 text-lg">How are you feeling?</h3>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">Select your mood today:</p>
        <div className="grid grid-cols-3 gap-3">
          {moods.map((mood, index) => (
            <button
              key={index}
              onClick={() => setSelectedMood(mood)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedMood?.label === mood.label
                  ? `border-green-300 bg-gradient-to-br ${mood.color} text-white shadow-lg`
                  : 'border-gray-200 bg-white/60 hover:border-green-200 hover:bg-green-50/50'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Mood Chart */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <FiTrendingUp className="text-green-500" />
          <p className="text-sm font-medium text-gray-700">This week's mood</p>
        </div>
        <div className="flex items-end justify-between h-20 gap-1">
          {weeklyMoods.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">{day.day}</div>
              <div 
                className="w-6 rounded-t-lg bg-gradient-to-t from-green-400 to-emerald-300 transition-all duration-300 hover:scale-110"
                style={{ height: `${day.intensity * 1.5}px` }}
              ></div>
              <div className="text-lg mt-1">{day.mood}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Affirmation */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200/50">
        <p className="text-xs text-gray-600 italic text-center">
          "Your feelings are valid. Honor your emotional journey." 💚
        </p>
      </div>
    </div>
  );
} 