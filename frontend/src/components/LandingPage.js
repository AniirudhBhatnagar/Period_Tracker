import React from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturesStrip from './FeaturesStrip';
import Footer from './Footer';
import '../styles/landing.css'; // Only import landing-specific styles

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <main className="landing-page__main">
                <Hero />
                <FeaturesStrip />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage; 