import React from 'react';

const MoodTrackerCard = () => {
    const moods = [
        { name: "Happy", emoji: "😊" },
        { name: "Sad", emoji: "😔" },
        { name: "Angry", emoji: "😠" },
        { name: "Tired", emoji: "😴" },
        { name: "Energetic", emoji: "😄" },
    ];

    const [selectedMood, setSelectedMood] = React.useState(null);

    const handleMoodSelect = (moodName) => {
        setSelectedMood(moodName === selectedMood ? null : moodName); // Toggle selection
    };

    return (
        <div className="dashboard-card mood-tracker-card">
            <h3>How are you feeling?</h3>
            <div className="mood-options-grid">
                {moods.map(mood => (
                    <div
                        key={mood.name}
                        className={`mood-option ${selectedMood === mood.name ? 'selected' : ''}`}
                        onClick={() => handleMoodSelect(mood.name)}
                    >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-label">{mood.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodTrackerCard; 