import React from 'react';
import { FiCalendar, FiHeart, FiZap } from 'react-icons/fi';

const FeaturesStrip = () => {
    return (
        <section className="features-strip">
            <div className="features-strip__divider"></div>
            <div className="features-strip__container">
                <div className="features-strip__grid">
                    <div className="features-strip__card">
                        <div className="features-strip__icon">
                            <FiCalendar />
                        </div>
                        <h3 className="features-strip__title">Smart Cycle Tracking</h3>
                        <p className="features-strip__description">
                            AI-powered predictions that learn your unique patterns. 
                            Track symptoms, moods, and energy levels with intuitive insights.
                        </p>
                    </div>
                    
                    <div className="features-strip__card">
                        <div className="features-strip__icon">
                            <FiHeart />
                        </div>
                        <h3 className="features-strip__title">Personalized Wellness</h3>
                        <p className="features-strip__description">
                            Get tailored recommendations for nutrition, exercise, and self-care 
                            that align with your hormonal phases.
                        </p>
                    </div>
                    
                    <div className="features-strip__card">
                        <div className="features-strip__icon">
                            <FiZap />
                        </div>
                        <h3 className="features-strip__title">Energy Optimization</h3>
                        <p className="features-strip__description">
                            Understand your natural energy rhythms and optimize productivity, 
                            creativity, and rest throughout your cycle.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesStrip; 