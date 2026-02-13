import React from 'react';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="container how-it-works-section">
            <h2 className="section-title">How MyRhythm Works</h2>
            <p className="section-description">
                MyRhythm uses advanced AI to understand your unique cycle and provide actionable insights.
            </p>
            <div className="how-it-works-grid">
                <div className="step-box">
                    <div className="step-icon"><i className="fas fa-calendar-alt"></i></div> {/* Track Your Cycle Icon */}
                    <h3>1. Track Your Cycle</h3>
                    <p>Log your menstrual cycle data, symptoms, and moods effortlessly to build your personal rhythm profile.</p>
                </div>
                <div className="step-box">
                    <div className="step-icon"><i className="fas fa-chart-line"></i></div> {/* Get Personalized Insights Icon */}
                    <h3>2. Get Personalized Insights</h3>
                    <p>Our AI analyzes your data to predict hormonal shifts, revealing unique patterns and offering tailored advice.</p>
                </div>
                <div className="step-box">
                    <div className="step-icon"><i className="fas fa-seedling"></i></div> {/* Thrive in Every Phase Icon */}
                    <h3>3. Thrive in Every Phase</h3>
                    <p>Receive daily suggestions for nutrition, exercise, productivity, and mood support, empowering you to thrive.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks; 