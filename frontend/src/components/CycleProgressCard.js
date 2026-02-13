import React from 'react';
import CycleTracker from './CycleTracker';

const CycleProgressCard = () => {
    // Data based on the new reference image
    const currentDayCircle = 26; // This is the 'Day 26' in the top circle
    const currentMonthDay = "SEP 26"; // This is 'SEP 26' below the Day
    const nextPeriodCountdown = 2; // '2 Days Untill Next Period'
    const fertilityInfo = "Low chances of getting pregnant";

    return (
        <div className="dashboard-card cycle-progress-card">
            <h3 className="card-title">Period Tracker</h3>
            <div className="cycle-header-meta">
                <span>October, 2022</span>
                {/* Placeholder for settings icon */}
                <i className="fas fa-cog"></i>
            </div>
            <div className="cycle-visual-wrapper">
                <CycleTracker cycleDay={currentDayCircle} />
            </div>
            <div className="cycle-prediction-summary">
                <p className="countdown-text">{nextPeriodCountdown} Days Untill Next Period</p>
                <p className="fertility-text">{fertilityInfo}</p>
            </div>
            {/* Quick Overview - Today section is handled in DashboardPage */}
        </div>
    );
};

export default CycleProgressCard; 