import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';  // Import the account icon from react-icons
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
      
      {/* If expanded, show full links, otherwise show collapsed state */}
      {isExpanded && (
        <div className="sidebar-links flex flex-col space-y-4">
          <Link to="/profile" className="sidebar-link">View Profile</Link>
          <Link to="/network" className="sidebar-link">My Network</Link>
          <Link to="/jobs" className="sidebar-link">Jobs</Link>
          <Link to="/messages" className="sidebar-link">Messages</Link>
          <Link to="/settings" className="sidebar-link">Settings</Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
