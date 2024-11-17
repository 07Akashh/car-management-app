import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#050b20] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">About Us</h2>
                        <p className="text-sm">
                            Welcome to Car Management, your trusted platform for buying and selling cars. 
                            Explore a wide range of vehicles with ease.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-car" className="hover:underline">
                                    Add Listing
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:underline">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p className="text-sm">
                            <span>Email:</span> support@carmanagement.com
                        </p>
                        <p className="text-sm">
                            <span>Phone:</span> +1 800 123 456
                        </p>
                        <p className="text-sm">
                            <span>Address:</span> 123 Car Lane, Auto City, CA 90001
                        </p>
                    </div>
                </div>

                <hr className="my-8 border-gray-700" />

                <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Car Management. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <Link to="#" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
