// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaSignOutAlt, FaUserCircle,FaBell } from 'react-icons/fa';  // Import icons from react-icons
// import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component
// import './Navbar.css';  // Import the CSS file for styles

// const Navbar = () => {
//     const [sidebarVisible, setSidebarVisible] = useState(false); // State to control Sidebar visibility

//     // Toggle sidebar visibility
//     const toggleSidebar = () => {
//         setSidebarVisible((prevState) => !prevState);
//     };

//     // Close Sidebar if clicked outside
//     const handleClickOutside = (e) => {
//         if (sidebarVisible && !e.target.closest('.sidebar') && !e.target.closest('.account-icon')) {
//             setSidebarVisible(false);
//         }
//     };

//     // Adding event listener for clicks outside
//     React.useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, [sidebarVisible]);

//     return (
//         <div className="navbar-background font-sans">
//             <header className="employer-navbar">
//                 {/* Account Icon */}
//                 <div className="account-icon" onClick={toggleSidebar}>
//                     <FaUserCircle size={30} color="#fff" />
//                 </div>

//                 <nav className="navbar-nav flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
//                     <Link to="/home" className="text-white font-bold text-lg hover:text-teal-300">
//                         <FaHome className="inline-block mr-2" /> Home
//                     </Link>
//                     <Link to="/network" className="text-white font-bold text-lg hover:text-teal-300">
//                         <FaUsers className="inline-block mr-2" /> My Network
//                     </Link>
//                     <Link to="/jobs" className="text-white font-bold text-lg hover:text-teal-300">
//                         <FaBriefcase className="inline-block mr-2" /> Jobs
//                     </Link>
//                     <Link to="/messages" className="text-white font-bold text-lg hover:text-teal-300">
//                         <FaEnvelope className="inline-block mr-2" /> Messages
//                     </Link>
//                     <Link to="/bell" className="text-white font-bold text-lg hover:text-teal-300">
//                         <FaBell className="inline-block mr-2" /> Notification
//                     </Link>
//                 </nav>

//                 <div className="navbar-buttons flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
//                     <Link to="/login">
//                         <button className="login-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
//                             <FaSignOutAlt className="inline-block mr-2" /> Logout
//                         </button>
//                     </Link>
//                 </div>
//             </header>

//             {/* Sidebar */}
//             {sidebarVisible && (
//                 <Sidebar closeSidebar={() => setSidebarVisible(false)} />
//             )}
//         </div>
//     );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaSignOutAlt, FaUserCircle, FaBell } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.css';

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false); // Sidebar toggle state
    const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown for jobs
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false); // Dropdown for Top Categories
    const [locationDropdownVisible, setLocationDropdownVisible] = useState(false); // Dropdown for Top Locations
    const [exploreDropdownVisible, setExploreDropdownVisible] = useState(false); // Dropdown for Explore More Jobs

    // Toggle Sidebar
    const toggleSidebar = () => {
        setSidebarVisible((prevState) => !prevState);
    };

    // Close Sidebar if clicked outside
    const handleClickOutside = (e) => {
        if (sidebarVisible && !e.target.closest('.sidebar') && !e.target.closest('.account-icon')) {
            setSidebarVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <div className="navbar-background font-sans">
            <header className="employer-navbar">
                {/* Account Icon */}
                <div className="account-icon" onClick={toggleSidebar}>
                    <FaUserCircle size={30} color="#fff" />
                </div>

                <nav className="navbar-nav flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
                    <Link to="/home" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaHome className="inline-block mr-2" /> Home
                    </Link>
                    <Link to="/networks" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaUsers className="inline-block mr-2" /> My Network
                    </Link>

                    {/* Jobs Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setDropdownVisible(true)} 
                        onMouseLeave={() => setDropdownVisible(false)}
                    >
                        <Link 
                            to="/jobs" 
                            className="text-white font-bold text-lg hover:text-teal-300"
                        >
                            <FaBriefcase className="inline-block mr-2" /> Jobs
                        </Link>

                        {dropdownVisible && (
                            <div className="dropdown-menu absolute bg-gray-800 text-white rounded-md shadow-md mt-2 w-48">
                                <div
                                    onMouseEnter={() => setCategoryDropdownVisible(true)}
                                    onMouseLeave={() => setCategoryDropdownVisible(false)}
                                    className="dropdown-item cursor-pointer"
                                >
                                    Top Categories
                                    {categoryDropdownVisible && (
                                        <div className="dropdown-submenu bg-gray-700 p-2 mt-1 rounded-md">
                                            <ul>
                                                <li>Fresher Job</li>
                                                <li>Marketing Jobs</li>
                                                <li>Content Writing Jobs</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div
                                    onMouseEnter={() => setLocationDropdownVisible(true)}
                                    onMouseLeave={() => setLocationDropdownVisible(false)}
                                    className="dropdown-item cursor-pointer"
                                >
                                    Top Locations
                                    {locationDropdownVisible && (
                                        <div className="dropdown-submenu bg-gray-700 p-2 mt-1 rounded-md">
                                            <ul>
                                                <li>Work From Home</li>
                                                <li>Jobs In Delhi</li>
                                                <li>Jobs In Mumbai</li>
                                                <li>Jobs In Kolkata</li>
                                                <li>Remote</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div
                                    onMouseEnter={() => setExploreDropdownVisible(true)}
                                    onMouseLeave={() => setExploreDropdownVisible(false)}
                                    className="dropdown-item cursor-pointer"
                                >
                                    Explore More Jobs
                                    {exploreDropdownVisible && (
                                        <div className="dropdown-submenu bg-gray-700 p-2 mt-1 rounded-md">
                                            <ul>
                                                <li>Jobs By Category</li>
                                                <li>Jobs By Locations</li>
                                                <li>Jobs By Position</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/messages" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaEnvelope className="inline-block mr-2" /> Messages
                    </Link>
                    <Link to="/notification" className="text-white font-bold text-lg hover:text-teal-300">
                        <FaBell className="inline-block mr-2" /> Notification
                    </Link>
                </nav>

                <div className="navbar-buttons flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <Link to="/login">
                        <button className="login-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
                            <FaSignOutAlt className="inline-block mr-2" /> Logout
                        </button>
                    </Link>
                </div>
            </header>

            {/* Sidebar */}
            {sidebarVisible && <Sidebar closeSidebar={() => setSidebarVisible(false)} />}
        </div>
    );
};

export default Navbar;

