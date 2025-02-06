import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaNetworkWired, FaSignOutAlt, FaBell, FaClipboardList, FaHome, FaEnvelope, FaBars } from 'react-icons/fa';

function EmployerNavbar({ toggleSidebar }) {
  const navigate = useNavigate();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Button at the extreme left */}
          <div className="absolute left-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-0.5 hover:bg-gray-700 transition-colors focus:outline-none"
            >
              <FaBars className="text-white text-3xl" />
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex space-x-6 mx-auto">
            <Link to="/employerdashboard" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link to="/network" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <FaNetworkWired className="text-lg" />
              <span>My Network</span>
            </Link>
            <Link to="/application" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <FaClipboardList className="text-lg" />
              <span>My Posts</span>
            </Link>
            <Link to="/message" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <FaEnvelope className="text-lg" />
              <span>Messages</span>
            </Link>
            <Link to="/notifications" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <FaBell className="text-lg" />
              <span>Notifications</span>
            </Link>
          </div>

          {/* Logout Button (extreme right) */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors focus:outline-none"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default EmployerNavbar;
