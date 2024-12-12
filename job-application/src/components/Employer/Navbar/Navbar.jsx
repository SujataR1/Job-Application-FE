import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate for redirection
import { FaNetworkWired, FaSignOutAlt, FaBell, FaClipboardList, FaUserCircle, FaHome, FaEnvelope } from 'react-icons/fa'; // Importing additional icons
import './Navbar.css';

function EmployerNavbar({ toggleSidebar, profileImageUrl }) {
  const navigate = useNavigate();  // To navigate to login page after logout

  // Function to handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (token) {
      try {
        // Ensure the token does not have the 'Bearer ' prefix (if already present)
        const tokenToSend = token.startsWith('Bearer ') ? token.substring(7) : token;

        // Send a POST request to logout
        const response = await fetch('http://localhost:7000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenToSend}`, // Send only one 'Bearer' prefix
          },
        });

        if (response.ok) {
          // If the logout is successful, remove the token from localStorage and navigate to login page
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
    <nav className="employer-navbar">
      <div className="navbar-container">
        {/* Left side: Profile Image */}
        <div className="account-icon" onClick={toggleSidebar}>
          {/* Display profile image if available, otherwise fallback to default icon */}
          {profileImageUrl ? (
            <div className="profile-img">
              <img
                src={profileImageUrl}
                alt="Profile"
                className="profile-img-thumbnail"
              />
            </div>
          ) : (
            <FaUserCircle size={30} color="#fff" />
          )}
        </div>

        {/* Center: Navbar Links */}
        <ul className="nav-links">
          <li>
            <Link to="/employerdashboard" className="nav-item">
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/network" className="nav-item">
              <FaNetworkWired className="nav-icon" /> My Network
            </Link>
          </li>
          <li>
            <Link to="/application" className="nav-item">
              <FaClipboardList className="nav-icon" /> My Posts
            </Link>
          </li>
          <li>
            <Link to="/message" className="nav-item">
              <FaEnvelope className="nav-icon" /> Messages
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="nav-item">
              <FaBell className="nav-icon" /> Notifications
            </Link>
          </li>
        </ul>

        {/* Right side: Logout Button */}
        <div className="logout-section">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="nav-icon" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default EmployerNavbar;
