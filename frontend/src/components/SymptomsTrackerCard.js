import React from 'react';

const SymptomsTrackerCard = () => {
    const symptoms = [
        { name: "Headache", icon: "fas fa-headache" },
        { name: "Cramps", icon: "fas fa-stomach" },
        { name: "Bloating", icon: "fas fa- bloated" },
        { name: "Fatigue", icon: "fas fa-bed" },
        { name: "Acne", icon: "fas fa-grin-squint" },
    ];

    // State to manage selected symptoms (dummy for now)
    const [selectedSymptoms, setSelectedSymptoms] = React.useState({});

    const handleSymptomClick = (symptomName) => {
        setSelectedSymptoms(prev => ({
            ...prev,
            [symptomName]: !prev[symptomName]
        }));
    };

    return (
        <div className="dashboard-card symptoms-tracker-card">
            <h3>Today's Symptoms</h3>
            <div className="symptoms-grid">
                {symptoms.map(symptom => (
                    <div
                        key={symptom.name}
                        className={`symptom-item ${selectedSymptoms[symptom.name] ? 'selected' : ''}`}
                        onClick={() => handleSymptomClick(symptom.name)}
                    >
                        <i className={symptom.icon}></i>
                        <span>{symptom.name}</span>
                    </div>
                ))}
            </div>
            <button className="cta-button add-more-button">Add More</button>
        </div>
    );
};

export default SymptomsTrackerCard; 