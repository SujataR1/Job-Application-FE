
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList } from 'react-icons/fa'; // Import necessary React Icons
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);  // Initially set to false, so the sidebar is hidden

  // Toggle the sidebar visibility when the account icon is clicked
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {/* Account icon that toggles the sidebar visibility */}
        <button onClick={toggleSidebar} className="account-icon-btn">
          <FaUserCircle size={30} color="#fff" />
        </button>
      </div>

      {isExpanded && (
        <div className="sidebar-links">
          <ul className="sidebar-links">
            <li>
              <Link to="/profile" className="sidebar-item">
                <FaUserCircle className="sidebar-icon" /> View Profile
              </Link>
            </li>
            <li>
              <Link to="/networks" className="sidebar-item">
                <FaUsers className="sidebar-icon" /> My Network
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="sidebar-item">
                <FaBriefcase className="sidebar-icon" /> Jobs
              </Link>
            </li>
            <li>
              <Link to="/application" className="sidebar-item">
                <FaClipboardList  className="sidebar-icon" /> My Application
              </Link>
            </li>
            <li>
              <Link to="/messages" className="sidebar-item">
                <FaEnvelope className="sidebar-icon" /> Messages
              </Link>
            </li>
           
           
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
