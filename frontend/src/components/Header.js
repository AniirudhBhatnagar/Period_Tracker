import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${isScrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}>
            <div className="navbar__container">
                <div className="navbar__content">
                    {/* Logo with increased left padding */}
                    <div className="navbar__logo">
                        <Link to="/" className="navbar__logo-link">
                            <img 
                                src="/images/my_rhythm_logo.png" 
                                alt="MyRhythm Logo" 
                                className="navbar__logo-image"
                            />
                        </Link>
                    </div>
                    
                    {/* Navigation Links */}
                    <nav className="navbar__nav">
                        <Link to="/about" className="navbar__nav-link">About Us</Link>
                        <Link to="/features" className="navbar__nav-link">Features</Link>
                        <a href="#how-it-works" className="navbar__nav-link">How It Works</a>
                        <a href="#integrations" className="navbar__nav-link">Integrations</a>
                    </nav>
                    
                    {/* Auth Buttons with consistent right margin */}
                    <div className="navbar__auth">
                        <Link to="/login" className="navbar__login-link">Login</Link>
                        <Link to="/register" className="navbar__register-button">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;