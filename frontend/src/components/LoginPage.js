import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CycleTracker from './CycleTracker';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // In a real application, you would perform authentication here (e.g., API call)
        // If login is successful, navigate to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className="login-page-container">
            <div className="login-form-container">
                <h2>Login</h2>
                <p>Login to access your MyRhythm account.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email or Username</label>
                        <input type="text" id="email" name="email" placeholder="Enter your email or username" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="#">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="or-separator">
                        <span>Or</span>
                    </div>
                    <div className="social-login">
                        <button type="button" className="social-button google" onClick={() => { window.location.href = 'https://period-tracker-backend.onrender.com/auth/google'; }}>
                            <i className="fab fa-google"></i> Google
                        </button>
                        <button className="social-button facebook">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </button>
                        <button className="social-button apple">
                            <i className="fab fa-apple"></i> Apple
                        </button>
                    </div>
                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
            <div className="login-visual-container flex flex-col items-center justify-center">
                <img src="./images/period-calendar.jpg" alt="Person meditating" className="login-illustration mb-4" />
                {/* Circular tracker preview for login 2nd page */}
                <div className="w-full flex justify-center">
                  <div className="w-48">
                    <h4 className="text-center text-sm font-semibold mb-2">Cycle Status</h4>
                    <CycleTracker cycleDay={14} />
                  </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 