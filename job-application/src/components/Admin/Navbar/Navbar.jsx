
import React, { useState } from 'react'; 
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';  // Account icon from react-icons

function AdminNavbar() {
  const [menu, setMenu] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Admin Panel</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => { setMenu("dashboard") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/admindashboard'>
            Dashboard {menu === "dashboard" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("users") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/manage-users'>
            Manage Users {menu === "users" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("reports") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/admin-reports'>
            Reports {menu === "reports" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => { setMenu("settings") }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/admin-settings'>
            Settings {menu === "settings" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>

      {/* Dropdown container for user options */}
      <div className="dropdown-container" onClick={toggleDropdown}>
        <div className="user-icon">
          <FaUserAlt style={{ fontSize: '30px', color: 'white' }} />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <a href="/account">My Profile</a>
            <a href="/login">Log out</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;


