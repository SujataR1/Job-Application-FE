import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChartBar, FaBriefcase, FaBuilding, FaCog, FaComment } from 'react-icons/fa';

const ESidebar = () => {
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
    <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${isExpanded ? 'w-48' : 'w-16'} z-40`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden hover:bg-gray-700 transition-colors"
        >
          {isLoading ? (
            <FaUserCircle className="h-8 w-8" />
          ) : (
            <img
              src={profileImage || '/default-profile.png'}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          )}
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/myprofile"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaUserCircle className="text-xl" />
              {isExpanded && <span>My Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/jobposting"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaBriefcase className="text-xl" />
              {isExpanded && <span>Job Posting</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/interview"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaBuilding className="text-xl" />
              {isExpanded && <span>Interviews</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/companyprofile"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaChartBar className="text-xl" />
              {isExpanded && <span>Company Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/companyanalytics"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaChartBar className="text-xl" />
              {isExpanded && <span>Analytics</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaComment className="text-xl" />
              {isExpanded && <span>Reviews</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/Esetting"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaCog className="text-xl" />
              {isExpanded && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ESidebar;