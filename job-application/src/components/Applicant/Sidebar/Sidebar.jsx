import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUserCircle, FaUsers, FaBriefcase, FaEnvelope, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the profile picture from the API.
  const fetchProfileImage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:7000/auth/profile-picture', {
        method: 'GET',
        headers: {
          Authorization: ` ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profilePicture);
      } else {
        console.error('Failed to fetch profile picture');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <div className="sidebarr fixed top-0 left-0 h-screen w-[250px] bg-[#2c3e50] text-white transition-all duration-300 overflow-auto z-50">
      {/* Profile Section */}
      <div className="flex justify-center items-center mb-5 p-4">
        {isLoading ? (
          <div className="text-sm">Loading...</div>
        ) : (
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
      </div>
      {/* Sidebar Links */}
      <ul className="space-y-2 px-4">
        <li>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaUserCircle className="mr-3" />
            <span>View Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/jobprofile"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaUserCircle className="mr-3" />
            <span>My Job Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/networks"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaUsers className="mr-3" />
            <span>My Network</span>
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaBriefcase className="mr-3" />
            <span>Jobs</span>
          </Link>
        </li>
        <li>
          <Link
            to="/myapplication"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaClipboardList className="mr-3" />
            <span>My Application</span>
          </Link>
        </li>
        <li>
          <Link
            to="/messages"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaEnvelope className="mr-3" />
            <span>Messages</span>
          </Link>
        </li>
        <li>
          <Link
            to="/help"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaEnvelope className="mr-3" />
            <span>Help and Support</span>
          </Link>
        </li>
        <li>
          <Link
            to="/setting"
            className="flex items-center px-4 py-2 hover:bg-[#34495e] transition-colors"
          >
            <FaCog className="mr-3" />
            <span>Setting</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
