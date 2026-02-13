import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage1 from './components/RegisterPage1';
import RegisterPage2 from './components/RegisterPage2';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { AboutUs } from './components/AboutUs';
import Features from './components/Features';
import Footer from './components/Footer';
import AuthSuccessHandler from './components/AuthSuccessHandler';
import './styles/main.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage1 />} />
                <Route path="/register/step2" element={<RegisterPage2 />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/features" element={<Features />} />
                <Route path="/auth-success" element={<AuthSuccessHandler />} />
            </Routes>
            <Footer />
            <Chatbot />
        </Router>
    );
}

export default App; 