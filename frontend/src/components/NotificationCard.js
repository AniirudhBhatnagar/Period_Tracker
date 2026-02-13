import React from 'react';

const NotificationCard = () => {
    return (
        <div className="dashboard-card notification-card">
            <div className="notification-icon">
                <i className="fas fa-tint"></i> {/* Example icon for period-related notification */}
            </div>
            <div className="notification-content">
                <h4>Periods in 2 days, be prepared</h4>
                <p>Low chances of getting pregnant</p>
            </div>
            {/* Optional: Edit icon or dismiss icon */}
            <div className="notification-action-icon">
                <i className="fas fa-edit"></i>
            </div>
        </div>
    );
};

export default NotificationCard; 