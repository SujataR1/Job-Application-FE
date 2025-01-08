
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';  // Import FaCog icon
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
              <Link to="/jobprofile" className="sidebar-item">
                <FaUserCircle className="sidebar-icon" /> My Job Profile
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
              <Link to="/myapplication" className="sidebar-item">
                <FaClipboardList  className="sidebar-icon" /> My Application
              </Link>
            </li>
            <li>
              <Link to="/messages" className="sidebar-item">
                <FaEnvelope className="sidebar-icon" /> Messages
              </Link>
            </li>
            <li>
              <Link to="/help" className="sidebar-item">
                <FaEnvelope className="sidebar-icon" /> Help and Support
              </Link>
            </li>
            <li>
              <Link to="/setting" className="sidebar-item">
                <FaCog className="sidebar-icon" /> Setting
              </Link>
            </li>
           
           
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
