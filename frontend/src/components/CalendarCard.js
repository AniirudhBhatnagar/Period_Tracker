import React from 'react';

const CalendarCard = () => {
    // Dummy data for a simple calendar display
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Adjusted to start with Mon
    const dates = [
        { day: 26, type: 'period-start' }, // Example: highlighted period start
        { day: 27, type: 'period' },
        { day: 28, type: 'period' },
        { day: 29, type: 'fertile' },
        { day: 30, type: 'fertile' },
        { day: 1, type: 'fertile' },
        { day: 2, type: 'fertile' },
        { day: 3, type: 'fertile' },
    ];

    const currentMonth = "October, 2022"; // Based on reference image

    // Helper to render empty days for alignment
    const renderEmptyDays = (count) => {
        return Array.from({ length: count }, (_, i) => <div key={`empty-${i}`} className="empty-day"></div>);
    };

    return (
        <div className="dashboard-card calendar-card">
            <div className="calendar-header">
                <h4>{currentMonth}</h4>
                {/* Add navigation for months here later if needed */}
            </div>
            <div className="calendar-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-of-week">{day}</div>
                ))}
                {/* Empty days for proper alignment with the first day of the month */}
                {renderEmptyDays(4)} {/* Assuming October 1st is a Friday, so 4 empty days for Mon-Thu */}

                {dates.map((dateObj, index) => (
                    <div 
                        key={index} 
                        className={`calendar-day ${dateObj.type} ${dateObj.day === 26 ? 'today' : ''}`}
                    >
                        {dateObj.day}
                    </div>
                ))}
            </div>
            {/* Buttons like Change Dates from previous version are removed as per new UI context */}
        </div>
    );
};

export default CalendarCard; 