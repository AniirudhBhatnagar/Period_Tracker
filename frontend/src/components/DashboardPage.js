import React from 'react';
import DashboardHeader from './DashboardHeader';
import CycleProgressCard from './CycleProgressCard';
import CalendarCard from './CalendarCard';
import SymptomsTrackerCard from './SymptomsTrackerCard';
import MoodTrackerCard from './MoodTrackerCard';
import NotesCard from './NotesCard';
import NotificationCard from './NotificationCard';
// import NotificationCard from './NotificationCard'; // Will create this next
import '../styles/main.css';

const DashboardPage = () => {
    // Dummy data for now
    const userName = "User";
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="dashboard-page-container">
            <div className="dashboard-left-panel">
                <DashboardHeader userName={userName} currentDate={currentDate} />
                <main className="dashboard-content-grid">
                    <CycleProgressCard />
                    <CalendarCard />
                    {/* The "High probability of getting pregnant" section will go here, currently it's part of CalendarCard or will be a new component */}
                    <h3 className="quick-overview-title">Quick Overview - Today</h3>
                    <div className="quick-overview-cards-wrapper">
                        <MoodTrackerCard />
                        <SymptomsTrackerCard />
                        <NotesCard />
                    </div>
                </main>
            </div>
            <div className="dashboard-right-panel">
                {/* Right panel content will go here: Moods, Temperature, Period Length */}
            </div>
        </div>
    );
};

export default DashboardPage; 