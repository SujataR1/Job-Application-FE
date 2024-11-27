import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar w-full md:w-1/4 p-6 bg-gray-100 shadow-md">
      <div className="sidebar-links flex flex-col space-y-4">
        <Link to="/profile" className="sidebar-link">View Profile</Link>
        <Link to="/network" className="sidebar-link">My Network</Link>
        <Link to="/jobs" className="sidebar-link">Jobs</Link>
        <Link to="/messages" className="sidebar-link">Messages</Link>
        <Link to="/settings" className="sidebar-link">Settings</Link>
      </div>
    </div>
  );
};

export default Sidebar;
