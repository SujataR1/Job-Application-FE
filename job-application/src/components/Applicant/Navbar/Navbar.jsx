

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaHome, FaUsers, FaSignOutAlt, FaUserCircle,FaBell, FaEnvelope,FaBriefcase} from 'react-icons/fa'; // Import icons from react-icons
import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component
import './Navbar.css'; // Import the CSS file for styles

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false); // State to control Sidebar visibility
    const navigate = useNavigate(); // Hook for navigation after logout

    // Function to handle logout
    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (token) {
            try {
                // Send logout request to backend API (if necessary)
                const response = await fetch('http://localhost:7000/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': ` ${token}`, // Pass token in Authorization header
                    },
                });

                if (response.ok) {
                    // If logout is successful, remove the token from localStorage and redirect
                    localStorage.removeItem('token'); // Remove JWT token from localStorage
                    navigate('/login'); // Redirect to login page
                } else {
                    const error = await response.json();
                    alert(error.message || 'Logout failed. Please try again.');
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('Logout failed. Please try again.');
            }
        } else {
            alert('You are not logged in.');
        }
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible((prevState) => !prevState);
    };

    // Close Sidebar if clicked outside
    const handleClickOutside = (e) => {
        if (sidebarVisible && !e.target.closest('.sidebar') && !e.target.closest('.account-icon')) {
            setSidebarVisible(false);
        }
    };

    // Adding event listener for clicks outside
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <div className="navbar-background font-sans">
            <header className="employer-navbar">
                {/* Account Icon */}
                <div className="account-icon" onClick={toggleSidebar}>
                    <FaUserCircle size={30} color="#fff" />
                </div>

                <nav className="navbar-nav flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
                    <Link to="/home" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaHome className="inline-block mr-2" /> Home
                    </Link>
                    <Link to="/networks" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaUsers className="inline-block mr-2" /> My Network
                    </Link>
                    <Link to="/jobs" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaBriefcase className="inline-block mr-2" /> Jobs
                    </Link>
                    <Link to="/messages" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaEnvelope className="inline-block mr-2" /> Messages
                    </Link>
                    <Link to="/notification" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaBell className="inline-block mr-2" />Notification
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="navbar-buttons flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <button
                        onClick={handleLogout}
                        className="login-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700"
                    >
                        <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            {sidebarVisible && (
                <Sidebar closeSidebar={() => setSidebarVisible(false)} />
            )}
        </div>
    );
};

export default Navbar;

