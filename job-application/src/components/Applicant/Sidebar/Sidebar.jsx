import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { Link } from 'react-router-dom';
import { FaCog, FaUserCircle, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);  // Initially set to false, so the sidebar is hidden
  const [profileImage, setProfileImage] = useState(null); // To store the profile image
  const [isLoading, setIsLoading] = useState(true); // For loading state

  // Toggle the sidebar visibility when the account icon is clicked
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch the profile picture from the API
  const fetchProfileImage = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      // API call to get the profile picture
      const response = await fetch('http://localhost:7000/auth/profile-picture', {
        method: 'GET',
        headers: {
          Authorization: ` ${token}`, // Send the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profilePicture); // Assuming the API returns base64 image in `profilePicture`
      } else {
        console.error('Failed to fetch profile picture');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the fetch is complete
    }
  };

  // Fetch the image when the component mounts
  useEffect(() => {
    fetchProfileImage();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {/* Account icon that toggles the sidebar visibility */}
        <button onClick={toggleSidebar} className="account-icon-btn">
          {isLoading ? (
            <div>Loading...</div> // Display loading text or a loading spinner
          ) : (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          )}
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
                <FaClipboardList className="sidebar-icon" /> My Application
              </Link>
            </li>
            <li>
              <Link to="/messages" className="sidebar-item">
                <FaEnvelope className="sidebar-icon" /> Messages
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