import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Common/Button';
import { logoutUser } from '../../api/auth';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
        window.location.reload();
    };

    return (
        <header className="bg-[#050b20] text-white p-4 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-semibold">
                <Link to="/">Car Management</Link>
            </h1>

            <button
                className="text-white md:hidden text-2xl"
                onClick={() => setIsSidebarOpen(true)}
            >
                <HiOutlineMenu />
            </button>

            <div className="hidden md:flex space-x-4">
                {user && (
                    <Button
                        onClick={handleLogout}
                        className="bg-white text-black  hover:bg-white/90"
                    >
                        Logout
                    </Button>
                )}
                {user ? (
                    <Link
                        to="/dashboard"
                        className="bg-transparent px-4 py-2 rounded text-white transition hover:underline"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="bg-transparent px-4 py-2 rounded text-white transition hover:underline"
                    >
                        Log In
                    </Link>
                )}
                {user &&(
                    <Link
                    to="/add-car"
                    className="bg-white px-5 py-2 font-medium rounded-3xl text-black transition hover:bg-gray-200"
                >
                    Add Listing
                </Link>
                )}
                
            </div>

            <div
                className={`fixed top-0 right-0 z-40 h-full bg-[#050b20] text-white w-3/5 max-w-xs shadow-lg transform duration-500 transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <button
                    className="absolute top-4 right-4 text-white text-2xl"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <HiX />
                </button>

                <nav className="mt-16 space-y-4 p-6">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="block px-4 py-2 rounded text-white transition hover:underline"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-4 py-2 rounded text-white transition hover:underline"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Log In
                        </Link>
                    )}
                    {user && (
                        <Link
                            to="/add-car"
                            className="block px-4 py-2 rounded text-white transition hover:underline"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            Add Listing
                        </Link>
                    )}
                    {user && (
                        <Button
                            onClick={() => {
                                handleLogout();
                                setIsSidebarOpen(false);
                            }}
                            className="w-full bg-white text-black hover:bg-white/90"
                        >
                            Logout
                        </Button>
                    )}
                </nav>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;
