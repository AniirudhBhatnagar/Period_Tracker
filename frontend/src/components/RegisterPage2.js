import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage2 = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Registration logic here
        navigate('/dashboard');
    };

    return (
        <div className="registration-page-container">
            <div className="registration-form-container">
                <h2>Tell Us About Your Cycle</h2>
                <p>This helps us provide accurate predictions and personalized insights.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="last-period-date">When did your last period start?</label>
                        <input type="date" id="last-period-date" name="lastPeriodDate" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="flow-intensity">How was your typical flow intensity?</label>
                        <select id="flow-intensity" name="flowIntensity">
                            <option value="">Select one</option>
                            <option value="light">Light</option>
                            <option value="medium">Medium</option>
                            <option value="heavy">Heavy</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="period-duration">How many days does your period usually last?</label>
                        <input type="number" id="period-duration" name="periodDuration" min="1" max="15" placeholder="e.g., 5 days" required />
                    </div>
                    <button type="submit" className="primary-button">Complete Registration</button>
                    <p className="back-link"><Link to="/register">← Back</Link></p>
                </form>
            </div>
            <div className="registration-visual-container">
                <img src="/images/regpag2.jpg" alt="Illustration for registration" className="registration-illustration" />
            </div>
        </div>
    );
};

export default RegisterPage2; 