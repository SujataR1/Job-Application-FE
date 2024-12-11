// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaUserCircle, FaChartBar, FaBriefcase, FaBuilding, FaCog } from 'react-icons/fa';  // Import React Icons
// import './Sidebar.css';

// const ESidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(false);  // Initially set to false, so the sidebar is hidden

//   // Toggle the sidebar visibility when the account icon is clicked
//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
//       <div className="sidebar-header">
//         {/* Account icon that toggles the sidebar visibility */}
//         <button onClick={toggleSidebar} className="account-icon-btn">
//           <FaUserCircle size={30} color="#fff" />
//         </button>
//       </div>
      
//       {/* If expanded, show full links, otherwise show collapsed state */}
//       {isExpanded && (
//         <div className="sidebar-links">
//           <ul className="sidebar-links">
            
//             <li>
//               <Link to="/myprofile" className="sidebar-item">
//                 <FaUserCircle className="sidebar-icon" /> My Profile
//               </Link>
//             </li>
//             <li>
//               <Link to="/jobposting" className="sidebar-item">
//                 <FaBriefcase className="sidebar-icon" /> Job Posting Management
//               </Link>
//             </li>
            
//             <li>
//               <Link to="/interview" className="sidebar-item">
//                 <FaBuilding className="sidebar-icon" /> Interview Scheduling
//               </Link>
//             </li>
//             <li>
//               <Link to="/companyprofile" className="sidebar-item">
//                 <FaChartBar className="sidebar-icon" /> Company Profile
//               </Link>
//             </li>
//             <li>
//               <Link to="/companyanalytics" className="sidebar-item">
//                 <FaChartBar className="sidebar-icon" /> Analytics
//               </Link>
//             </li>
//             <li>
//               <Link to="/Esetting" className="sidebar-item">
//                 <FaCog className="sidebar-icon" /> Settings
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ESidebar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaChartBar, FaBriefcase, FaBuilding, FaCog } from 'react-icons/fa';  // Import React Icons
import './Sidebar.css';

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
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {/* Account icon that toggles the sidebar visibility */}
        <button onClick={toggleSidebar} className="account-icon-btn">
          {/* Displaying profile picture if available, otherwise showing default user icon */}
          {isLoading ? (
            <FaUserCircle size={30} color="#fff" />
          ) : (
            <div className="profile-img">
              {/* Display the profile image or fallback to default user icon */}
              <img
                src={profileImage || 'path_to_default_image'} // Replace with your default image path
                alt="Profile"
                className="profile-img-thumbnail"
              />
            </div>
          )}
        </button>
      </div>
      
      {/* If expanded, show full links, otherwise show collapsed state */}
      {isExpanded && (
        <div className="sidebar-links">
          <ul className="sidebar-links">
            <li>
              <Link to="/myprofile" className="sidebar-item">
                <FaUserCircle className="sidebar-icon" /> My Profile
              </Link>
            </li>
            <li>
              <Link to="/jobposting" className="sidebar-item">
                <FaBriefcase className="sidebar-icon" /> Job Posting Management
              </Link>
            </li>
            <li>
              <Link to="/interview" className="sidebar-item">
                <FaBuilding className="sidebar-icon" /> Interview Scheduling
              </Link>
            </li>
            <li>
              <Link to="/companyprofile" className="sidebar-item">
                <FaChartBar className="sidebar-icon" /> Company Profile
              </Link>
            </li>
            <li>
              <Link to="/companyanalytics" className="sidebar-item">
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
