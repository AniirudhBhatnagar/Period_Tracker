import React, { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiPlus, FiEdit3, FiHeart, FiSmile, FiDroplet, FiZap } from 'react-icons/fi';

export default function FullCalendarModal({ isOpen, onClose, cycleData, selectedDay, onDaySelect, onLogDay }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayDetails, setShowDayDetails] = useState(false);

  if (!isOpen) return null;

  // Get current month's calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false, dayNumber: prevDate.getDate() });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true, dayNumber: i });
    }
    
    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false, dayNumber: nextDate.getDate() });
    }
    
    return days;
  };

  // Calculate cycle day for a given date
  const getCycleDay = (date) => {
    // This is a simplified calculation - in a real app, you'd use actual cycle data
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays % cycleData.cycleLength) + 1;
  };

  // Get day type (period, ovulation, etc.)
  const getDayType = (date) => {
    const cycleDay = getCycleDay(date);
    
    // Menstrual Phase (Period Days) - Day 1-5
    if (cycleDay <= cycleData.periodLength) return 'period';
    
    // Ovulation Phase - Around Day 14 (fertile window Day 12-16)
    if (cycleDay === cycleData.ovulationDay) return 'ovulation';
    if (cycleDay >= cycleData.ovulationDay - 2 && cycleDay <= cycleData.ovulationDay + 2) return 'fertile';
    
    // Luteal Phase - Day 15-28 (after ovulation, includes PMS)
    if (cycleDay > cycleData.ovulationDay + 2 && cycleDay <= cycleData.cycleLength) {
      // PMS typically occurs in the last 7 days of the cycle
      if (cycleDay >= cycleData.cycleLength - 7) return 'pms';
      return 'luteal';
    }
    
    // Follicular Phase - Day 6-13 (after period, before ovulation)
    if (cycleDay > cycleData.periodLength && cycleDay < cycleData.ovulationDay - 2) return 'follicular';
    
    return 'normal';
  };

  // Get day styling based on type
  const getDayStyling = (dayType, isCurrentMonth) => {
    const baseClasses = `w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-110 ${
      isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
    }`;
    
    switch (dayType) {
      case 'period':
        return `${baseClasses} bg-pink-100 text-pink-700 border-2 border-pink-300`;
      case 'ovulation':
        return `${baseClasses} bg-yellow-100 text-yellow-700 border-2 border-yellow-300`;
      case 'fertile':
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      case 'follicular':
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-300`;
      case 'luteal':
        return `${baseClasses} bg-orange-100 text-orange-700 border border-orange-300`;
      case 'pms':
        return `${baseClasses} bg-purple-100 text-purple-700 border border-purple-300`;
      default:
        return `${baseClasses} hover:bg-gray-100`;
    }
  };

  // Handle day click
  const handleDayClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date);
      setShowDayDetails(true);
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Calendar View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="px-6 pb-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayType = getDayType(day.date);
              const isSelected = selectedDate && selectedDate.toDateString() === day.date.toDateString();
              
              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`${getDayStyling(dayType, day.isCurrentMonth)} ${
                    isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : ''
                  }`}
                >
                  {day.dayNumber}
                  {/* Indicators */}
                  {dayType === 'ovulation' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                  {dayType === 'period' && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-pink-500 rounded-full"></div>
                  )}
                  {dayType === 'fertile' && (
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  )}
                  {dayType === 'follicular' && (
                    <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-400 rounded-full"></div>
                  )}
                  {dayType === 'luteal' && (
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-orange-400 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-100 border-2 border-pink-300 rounded-full"></div>
                <span className="text-gray-600">Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
                <span className="text-gray-600">Follicular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 border-2 border-yellow-300 rounded-full"></div>
                <span className="text-gray-600">Ovulation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
                <span className="text-gray-600">Fertile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded-full"></div>
                <span className="text-gray-600">Luteal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded-full"></div>
                <span className="text-gray-600">PMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Day Details Panel */}
        {showDayDetails && selectedDate && (
          <div className="absolute inset-0 bg-white rounded-3xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => setShowDayDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Day Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FiHeart className="text-pink-500" />
                    <span className="font-medium text-gray-800">Cycle Day {getCycleDay(selectedDate)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {getDayType(selectedDate) === 'period' && '🩸 Period day - Menstrual phase'}
                    {getDayType(selectedDate) === 'ovulation' && '✨ Ovulation day - Egg released'}
                    {getDayType(selectedDate) === 'fertile' && '🌱 Fertile window - High chance of conception'}
                    {getDayType(selectedDate) === 'follicular' && '🌿 Follicular phase - Estrogen rising'}
                    {getDayType(selectedDate) === 'luteal' && '🍂 Luteal phase - Progesterone high'}
                    {getDayType(selectedDate) === 'pms' && '😣 PMS symptoms likely - Pre-menstrual'}
                    {getDayType(selectedDate) === 'normal' && '📅 Regular cycle day'}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onLogDay(selectedDate)}
                    className="flex items-center justify-center gap-2 bg-pink-500 text-white py-3 px-4 rounded-xl hover:bg-pink-600 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                    Log Symptoms
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                    <FiEdit3 className="w-4 h-4" />
                    Add Notes
                  </button>
                </div>

                {/* Recent Logs (placeholder) */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Recent Activity</h4>
                  <div className="text-sm text-gray-600">
                    No logs for this day yet. Tap "Log Symptoms" to get started!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 