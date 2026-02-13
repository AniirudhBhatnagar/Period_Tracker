import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccessHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            // Store token in localStorage
            localStorage.setItem('authToken', token);
            // Redirect to dashboard
            navigate('/dashboard');
        } else {
            // No token found, redirect to login
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <p>Processing authentication...</p>
        </div>
    );
};

export default AuthSuccessHandler;
