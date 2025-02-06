    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FaUserCircle, FaChartBar, FaBriefcase, FaBuilding, FaCog, FaComment } from 'react-icons/fa';

    const ESidebar = ({ isExpanded, toggleSidebar }) => {
      return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${isExpanded ? 'w-48' : 'w-16'} z-40`}>
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden hover:bg-gray-700 transition-colors"
            >
              <FaUserCircle className="h-8 w-8" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/myprofile" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaUserCircle className="text-xl" />
                  {isExpanded && <span>My Profile</span>}
                </Link>
              </li>
              <li>
                <Link to="/jobposting" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaBriefcase className="text-xl" />
                  {isExpanded && <span>Job Posting</span>}
                </Link>
              </li>
              <li>
                <Link to="/interview" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaBuilding className="text-xl" />
                  {isExpanded && <span>Interviews</span>}
                </Link>
              </li>
              <li>
                <Link to="/companyprofile" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaChartBar className="text-xl" />
                  {isExpanded && <span>Company Profile</span>}
                </Link>
              </li>
              <li>
                <Link to="/companyanalytics" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaChartBar className="text-xl" />
                  {isExpanded && <span>Analytics</span>}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <FaComment className="text-xl" />
                  {isExpanded && <span>Reviews</span>}
                </Link>
              </li>
              <li>
                <Link to="/Esetting" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
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
