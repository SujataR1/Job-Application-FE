import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBriefcase, FaBuilding, FaRegPaperPlane, FaChartBar, FaCog, FaTimes } from 'react-icons/fa'; // Import icons
import './Sidenavbar.css'; // Add CSS for Sidenavbar styling

const Sidenavbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false); // State to control sidebar visibility

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible); // Toggle the visibility of the sidebar
    };

    const closeSidebar = () => {
        setSidebarVisible(false); // Close the sidebar when the close button is clicked
    };

    return (
        <>
            {/* Button to open the sidebar */}
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                ☰ {/* Hamburger icon to open the sidebar */}
            </button>

            {/* Sidebar */}
            <div className={`admin-sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
                {/* Close Button inside the Sidebar */}
                <button className="sidebar-close-btn" onClick={closeSidebar}>
                    <FaTimes /> {/* Close icon */}
                </button>

                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>

                {/* Sidebar Links */}
                <ul className="sidebar-links">
                    <li><Link to="/admindashboard"><FaHome /> Dashboard</Link></li>
                    <li><Link to="/manage-users"><FaUsers /> Manage Users</Link></li>
                    <li><Link to="/manage-jobs"><FaBriefcase /> Manage Jobs</Link></li>
                    <li><Link to="/manage-companies"><FaBuilding /> Manage Companies</Link></li>
                    <li><Link to="/applications"><FaRegPaperPlane /> Job Applications</Link></li>
                    <li><Link to="/reports"><FaChartBar /> Reports</Link></li>
                    <li><Link to="/settings"><FaCog /> Settings</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Sidenavbar;
