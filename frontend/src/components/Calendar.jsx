import React from 'react';
import dayjs from 'dayjs';

const Calendar = ({ 
  currentDate, 
  periodDates, 
  predictedPeriodDates, 
  ovulationDate,
  onDateClick,
  onEditPeriod
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar grid
  const generateCalendarDays = () => {
    const firstDayOfMonth = dayjs(currentDate).startOf('month');
    const lastDayOfMonth = dayjs(currentDate).endOf('month');
    const daysInMonth = lastDayOfMonth.date();
    const startingDayIndex = firstDayOfMonth.day();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = dayjs(currentDate).date(day);
      const isPeriodDay = periodDates.some(d => dayjs(d).isSame(date, 'day'));
      const isPredictedPeriodDay = predictedPeriodDates.some(d => dayjs(d).isSame(date, 'day'));
      const isOvulationDay = dayjs(ovulationDate).isSame(date, 'day');
      const isToday = dayjs().isSame(date, 'day');
      
      const dayClasses = [
        'calendar-day',
        isPeriodDay ? 'period' : '',
        isPredictedPeriodDay ? 'predicted-period' : '',
        isOvulationDay ? 'ovulation' : '',
        isToday ? 'today' : ''
      ].filter(Boolean).join(' ');
      
      days.push(
        <div 
          key={day} 
          className={dayClasses}
          onClick={() => onDateClick(date)}
        >
          {day}
          {isOvulationDay && <span className="ovulation-dot"></span>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <h4>{dayjs(currentDate).format('MMMM YYYY')}</h4>
        <div className="calendar-navigation">
          <button onClick={() => onDateClick(dayjs(currentDate).subtract(1, 'month'))}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={() => onDateClick(dayjs(currentDate).add(1, 'month'))}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-of-week">{day}</div>
        ))}
        {generateCalendarDays()}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot period"></span>
          <span>Period</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot predicted-period"></span>
          <span>Predicted</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot ovulation"></span>
          <span>Ovulation</span>
        </div>
      </div>
      
      <button className="edit-period-button" onClick={onEditPeriod}>
        Edit Period
      </button>
    </div>
  );
};

export default Calendar; 