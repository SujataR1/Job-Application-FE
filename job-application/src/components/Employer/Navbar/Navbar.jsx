import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaNetworkWired, FaSignOutAlt, FaBell, FaClipboardList, FaUserCircle, FaHome, FaEnvelope } from 'react-icons/fa';

function EmployerNavbar({ toggleSidebar, profileImageUrl }) {
  const navigate = useNavigate();

 
  const handleLogout = async () => {
    const token = localStorage.getItem('token');  

    if (token) {
      try {
        
        const tokenToSend = token.startsWith('Bearer ') ? token.substring(7) : token;
        const response = await fetch('http://localhost:7000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenToSend}`, 
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden hover:bg-gray-700 transition-colors"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-8 w-8" />
              )}
            </button>

            <div className="hidden md:flex space-x-6">
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
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default EmployerNavbar;