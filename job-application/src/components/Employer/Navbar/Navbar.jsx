import React from 'react';
import { Link } from 'react-router-dom';
import { FaNetworkWired, FaSignOutAlt, FaBell, FaClipboardList, FaUserCircle,FaHome,FaEnvelope  } from 'react-icons/fa'; // Importing additional icons
import './Navbar.css';

function EmployerNavbar({ toggleSidebar, profileImageUrl }) {
  return (
    <nav className="employer-navbar">
      <div className="navbar-container">
        {/* Left side: Profile Image */}
        <div className="account-icon" onClick={toggleSidebar}>
                    <FaUserCircle size={30} color="#fff" />
                </div>
        {/* Center: Navbar Links */}
        <ul className="nav-links">
        <li>
            <Link to="/employerdashboard" className="nav-item">
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/my-network" className="nav-item">
              <FaNetworkWired className="nav-icon" /> My Network
            </Link>
          </li>
          <li>
            <Link to="/my-posts" className="nav-item">
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
          <Link to="/login">
            <button className="logout-btn">
              <FaSignOutAlt className="nav-icon" /> Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default EmployerNavbar;
