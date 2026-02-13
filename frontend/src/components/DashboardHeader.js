import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ userName, currentDate }) => {
    return (
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                src="/images/my_rhythm_logo.png" 
                                alt="MyRhythm Logo" 
                                className="h-10 w-auto"
                            />
                </Link>
            </div>

                    {/* User Info Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-gray-900">Hi, {userName}!</span>
                            <span className="text-xs text-gray-500">{currentDate}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white">
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader; 