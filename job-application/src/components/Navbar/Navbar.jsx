import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file at the top of your Navbar.js component

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="navbar-background font-sans">
            {/* Navbar */}
            <header className="navbar-header flex flex-col md:flex-row justify-between items-center p-5 bg-opacity-80 bg-gray-800">
                {/* Header Left - Logo */}
                <div className="navbar-logo text-3xl font-bold text-white">
                    <span className="text-saffron">Job</span> {/* Saffron color */}
                    <span className="text-white">Portal</span> {/* White color */}
                    <span className="text-green">by Transmogrify</span> {/* Green color */}
                </div>

                {/* Centered Navigation Links */}
                <nav className="navbar-nav flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
                    <Link to="/" className="text-white font-bold text-lg hover:text-teal-300">Home</Link>
                    <div className="relative">
                        <button onClick={toggleDropdown} className="text-white font-bold text-lg hover:text-teal-300">
                            Jobs
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu absolute mt-2 bg-gray-800 text-white shadow-lg rounded-md w-48">
                                {/* Dropdown Sections */}
                                <div className="dropdown-section">
                                    <h3 className="dropdown-header">Popular categories</h3>
                                    <ul>
                                        {/* Dropdown Items */}
                                        <li><Link to="/it-jobs" className="dropdown-item">IT jobs</Link></li>
                                        <li><Link to="/sales-jobs" className="dropdown-item">Sales jobs</Link></li>
                                        <li><Link to="/marketing-jobs" className="dropdown-item">Marketing jobs</Link></li>
                                        <li><Link to="/data-science-jobs" className="dropdown-item">Data Science jobs</Link></li>
                                        <li><Link to="/hr-jobs" className="dropdown-item">HR jobs</Link></li>
                                        <li><Link to="/engineering-jobs" className="dropdown-item">Engineering jobs</Link></li>
                                    </ul>
                                </div>
                                <div className="dropdown-section">
                                    <h3 className="dropdown-header">Jobs in demand</h3>
                                    <ul>
                                        {/* Dropdown Items */}
                                        <li><Link to="/fresher-jobs" className="dropdown-item">Fresher jobs</Link></li>
                                        <li><Link to="/mnc-jobs" className="dropdown-item">MNC jobs</Link></li>
                                        <li><Link to="/remote-jobs" className="dropdown-item">Remote jobs</Link></li>
                                        <li><Link to="/work-from-home-jobs" className="dropdown-item">Work from home jobs</Link></li>
                                        <li><Link to="/walk-in-jobs" className="dropdown-item">Walk-in jobs</Link></li>
                                        <li><Link to="/part-time-jobs" className="dropdown-item">Part-time jobs</Link></li>
                                    </ul>
                                </div>
                                <div className="dropdown-section">
                                    <h3 className="dropdown-header">Jobs by location</h3>
                                    <ul>
                                        {/* Dropdown Items */}
                                        <li><Link to="/jobs-in-delhi" className="dropdown-item">Jobs in Delhi</Link></li>
                                        <li><Link to="/jobs-in-mumbai" className="dropdown-item">Jobs in Mumbai</Link></li>
                                        <li><Link to="/jobs-in-bangalore" className="dropdown-item">Jobs in Bangalore</Link></li>
                                        <li><Link to="/jobs-in-hyderabad" className="dropdown-item">Jobs in Hyderabad</Link></li>
                                        <li><Link to="/jobs-in-chennai" className="dropdown-item">Jobs in Chennai</Link></li>
                                        <li><Link to="/jobs-in-pune" className="dropdown-item">Jobs in Pune</Link></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/browse" className="text-white font-bold text-lg hover:text-teal-300">Browse</Link>
                </nav>

                {/* Header Right - Buttons */}
                <div className="navbar-buttons flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <Link to="/login">
                        <button className="login-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-gray-700">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="signup-button text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700">
                            Signup
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
