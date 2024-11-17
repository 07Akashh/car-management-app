import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-0 rounded shadow-md">
                {children}
            </div>
            <div className="mt-4 text-center">
                {isLoginPage && (
                    <p>
                        Don't have an account?
                        <Link to="/signup" className="text-blue-600"> Sign Up</Link>
                    </p>
                )}
                {isSignUpPage && (
                    <p>
                        Already have an account?
                        <Link to="/login" className="text-blue-600"> Login</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthWrapper;

