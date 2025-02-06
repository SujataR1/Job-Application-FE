import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaNetworkWired, FaSignOutAlt, FaBell, FaClipboardList, FaHome, FaEnvelope, FaBars, FaUserCircle } from 'react-icons/fa';

function EmployerNavbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:7000/auth/profile-picture', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileImageUrl(data.profilePicture); // Adjust according to your API response
        } else {
          console.error('Failed to fetch profile picture:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProfileImage();
  }, []);

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
          {/* Hamburger Button aligned to the left */}
          <div className="flex items-center ml-0">
            <button
              onClick={toggleSidebar}
              className="absolute left-1 top-1 flex items-center justify-center hover:bg-transparent focus:bg-transparent focus:outline-none"
            >
              <FaBars className="text-xl" />
            </button>
          </div>

          {/* Centered Navigation Links */}
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

          {/* Profile and Logout Button */}
          <div className="flex items-center">
            {/* Display Profile Image or Default Avatar */}
            {isLoading ? (
              <FaUserCircle className="text-3xl text-gray-400" /> // Placeholder while loading
            ) : profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="rounded-full h-8 w-8 object-cover" // Adjust size as needed
              />
            ) : (
              <FaUserCircle className="text-3xl" /> // Default avatar if no image
            )}

            <button
              onClick={handleLogout}
              className=" absolute right-16 top-1 flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors focus:outline-none"
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
