import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CycleTracker from './CycleTracker';

const RegisterPage1 = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // You would typically handle form validation here
        // For now, we'll just navigate to the next page
        navigate('/register/step2');
    };

    return (
        <div className="registration-page-container">
            <div className="registration-form-container">
                <h2>Create Your Account</h2>
                <p>Just a few details to get started!</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="reg-email">Email Address</label>
                        <input type="email" id="reg-email" name="email" placeholder="you@example.com" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="reg-password">Password</label>
                        <input type="password" id="reg-password" name="password" placeholder="Create a strong password" required />
                        <div className="password-hint">Min 8 characters, 1 uppercase, 1 number, 1 symbol</div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm your password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" required />
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="terms-agree" name="termsAgree" required />
                        <label htmlFor="terms-agree">I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a></label>
                    </div>
                    <button type="submit" className="primary-button">Next</button>
                    <p className="login-link">Already have an account? <Link to="/login">Log In</Link></p>
                </form>
            </div>
            <div className="registration-visual-container flex flex-col items-center justify-center">
                <img src="./images/pag1.jpg" alt="Illustration for registration" className="registration-illustration mb-4" />
            </div>
        </div>
    );
};

export default RegisterPage1; 