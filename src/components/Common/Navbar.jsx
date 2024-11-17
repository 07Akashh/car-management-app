// Example: src/components/Common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <div>
                <Link to="/" className="text-2xl">Car Management</Link>
            </div>
            <div>
                <Link to="/cars" className="mx-2">Cars</Link>
                {user ? (
                    <>
                        <button onClick={logout} className="mx-2">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login" className="mx-2">Login</Link>
                        <Link to="/auth/signup" className="mx-2">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

