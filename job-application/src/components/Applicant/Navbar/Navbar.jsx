import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaSignOutAlt, FaUserCircle, FaBell, FaEnvelope, FaBriefcase } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  // Handle logout by calling the API, removing token, and navigating to login.
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:7000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': ` ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem('token');
          navigate('/login');
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

  // Toggle the Sidebar's visibility.
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  // Close Sidebar if clicking outside of it and outside the account icon.
  const handleClickOutside = (e) => {
    if (
      sidebarVisible &&
      !e.target.closest('.sidebar') &&
      !e.target.closest('.account-icon')
    ) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => { document.removeEventListener('click', handleClickOutside); };
  }, [sidebarVisible]);

  return (
    <div className="bg-[#2c3e50] font-sans">
      <header className="flex flex-col md:flex-row items-center justify-between p-4">
        {/* Profile Icon in Navbar (click to toggle Sidebar) */}
        <div className="account-icon cursor-pointer" onClick={toggleSidebar}>
          <FaUserCircle size={30} className="text-white" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10">
          <Link to="/home" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/networks" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
            <FaUsers className="mr-2" /> My Network
          </Link>
          <Link to="/jobs" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
            <FaBriefcase className="mr-2" /> Jobs
          </Link>
          <Link to="/messages" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
            <FaEnvelope className="mr-2" /> Messages
          </Link>
          <Link to="/notification" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
            <FaBell className="mr-2" /> Notification
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={handleLogout}
            className="text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700 flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </header>

      {/* Render Sidebar only when sidebarVisible is true */}
      {sidebarVisible && (
        <Sidebar closeSidebar={() => setSidebarVisible(false)} />
      )}
    </div>
  );
};

export default Navbar;
