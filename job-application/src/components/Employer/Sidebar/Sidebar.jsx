import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChartBar, FaBriefcase, FaBuilding, FaCog } from 'react-icons/fa';  // Import React Icons
import './Sidebar.css';

const ESidebar = () => {
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
      
      {/* If expanded, show full links, otherwise show collapsed state */}
      {isExpanded && (
        <div className="sidebar-links">
          <ul className="sidebar-links">
            <li>
              <Link to="/employerprofile" className="sidebar-item">
                <FaChartBar className="sidebar-icon" /> View Profile
              </Link>
            </li>
            <li>
              <Link to="/jobposting" className="sidebar-item">
                <FaBriefcase className="sidebar-icon" /> Job Posting Management
              </Link>
            </li>
            <li>
              <Link to="/candidate" className="sidebar-item">
                <FaBuilding className="sidebar-icon" /> Candidate Management
              </Link>
            </li>
            <li>
              <Link to="/interview" className="sidebar-item">
                <FaBuilding className="sidebar-icon" /> Interview Scheduling
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="sidebar-item">
                <FaChartBar className="sidebar-icon" /> Analytics
              </Link>
            </li>
            <li>
              <Link to="/Esetting" className="sidebar-item">
                <FaCog className="sidebar-icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ESidebar;
