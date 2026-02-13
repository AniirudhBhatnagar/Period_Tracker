import React from 'react';

const Features = () => {
    return (
        <section id="features" className="features-section">
            <h2 className="section-title">Our Core Features</h2>
            <p className="section-description">
                MyRhythm provides personalized suggestions based on your hormonal phases, helping you optimize your well-being.
            </p>
            <div className="features-grid">
                <div className="feature-card">
                    <img src="/icons/meal-icon.svg" alt="Meals Icon" className="feature-icon" />
                    <h3>Meals</h3>
                    <p>AI-powered nutritional advice tailored to your cycle.</p>
                </div>
                <div className="feature-card">
                    <img src="/icons/workout-icon.svg" alt="Workouts Icon" className="feature-icon" />
                    <h3>Workouts</h3>
                    <p>AI-powered workout plans dynamically adjusted by our AI to match your unique hormonal fluctuations, ensuring optimal performance and recovery.</p>
                </div>
                <div className="feature-card">
                    <img src="/icons/productivity-icon.svg" alt="Productivity Icon" className="feature-icon" />
                    <h3>Productivity</h3>
                    <p>Smart recommendations to boost focus and energy, aligning with your cycle's natural rhythm.</p>
                </div>
                <div className="feature-card">
                    <img src="/icons/mood-support-icon.svg" alt="Mood Support Icon" className="feature-icon" />
                    <h3>Mood Support</h3>
                    <p>Personalized strategies and insights to help manage mood shifts throughout your cycle.</p>
                </div>
            </div>
        </section>
    );
};

export default Features; 