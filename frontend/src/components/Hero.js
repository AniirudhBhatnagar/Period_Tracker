import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const imageRef = useRef(null);

    // Fade-in animation on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current) return;
            const rect = imageRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                imageRef.current.classList.add('hero__image--visible');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero">
            <div className="hero__pattern-bg"></div>
            <div className="hero__container">
                {/* Left: Text Content */}
                <div className="hero__content">
                    <h1 className="hero__headline">
                        Track your cycle with <span className="hero__highlight hero__highlight--rose">comfort</span> and <span className="hero__highlight hero__highlight--coral">care</span>.
                    </h1>
                    <p className="hero__subhead">
                        From cramps to mood swings—we're here to help you feel balanced, understood, and supported throughout your cycle.
                    </p>
                    <div className="hero__cta-group">
                        <Link to="/login" className="hero__cta">Start Your Journey →</Link>
                        <Link to="#how-it-works" className="hero__cta hero__cta--secondary">See How It Works</Link>
                    </div>
                    {/* Mini Benefits */}
                    <div className="mini-benefits">
                        <ul>
                            <li>🌿 Sync with your body, not against it</li>
                            <li>💡 Smart symptom and mood tracking</li>
                            <li>🧘 Gentle wellness recommendations</li>
                        </ul>
                    </div>
                </div>
                {/* Right: Hero Image with pastel blob */}
                <div className="hero__image-wrapper">
                    <div className="hero__image-blob"></div>
                    <img
                        ref={imageRef}
                        src={process.env.PUBLIC_URL + '/images/landing.jpg'}
                        alt="Woman resting with heating pad"
                        className="hero__image"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero; 