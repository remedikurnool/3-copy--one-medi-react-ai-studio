
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-6 text-center font-sans">
            {/* 404 Illustration */}
            <div className="relative mb-8">
                <div className="text-[120px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary/50">search_off</span>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Page Not Found
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            <div className="w-full max-w-xs flex flex-col gap-3">
                <button
                    onClick={() => navigate('/')}
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">home</span>
                    Go to Homepage
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="w-full h-12 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Go Back
                </button>
            </div>

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => navigate('/medicines')}
                    className="text-sm text-primary font-medium hover:underline"
                >
                    Medicines
                </button>
                <button
                    onClick={() => navigate('/doctors')}
                    className="text-sm text-primary font-medium hover:underline"
                >
                    Doctors
                </button>
                <button
                    onClick={() => navigate('/lab-tests')}
                    className="text-sm text-primary font-medium hover:underline"
                >
                    Lab Tests
                </button>
                <button
                    onClick={() => navigate('/services')}
                    className="text-sm text-primary font-medium hover:underline"
                >
                    Services
                </button>
            </div>
        </div>
    );
}
