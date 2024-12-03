import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';  // Import components you need for routing
// Import your components
import Connections from './Connections';
import Groups from './Groups';
import Header from './Header';
import Contacts from './Contacts';  // Ensure this file exists
import PeopleIFollow from './PeopleIFollow';  // Ensure this file exists
import NewsLetter from './NewsLetter';  // Ensure this file exists
import Hashtags from './Hashtags';  // Ensure this file exists


const Network = () => {
  return (
    <div className="network-container">
      <Header />
      <div className="network-body">

        {/* Sidebar */}
        <div className="network-sidebar">
          <ul>
            <li>
              <NavLink to="/connections" activeClassName="active">
                Connections
              </NavLink>
            </li>

            <li>
              <NavLink to="/contacts" activeClassName="active">
                Contacts
              </NavLink>
            </li>

            <li>
              <NavLink to="/people-i-follow" activeClassName="active">
                People I Follow
              </NavLink>
            </li>

            <li>
              <NavLink to="/groups" activeClassName="active">
                Groups
              </NavLink>
            </li>

            <li>
              <NavLink to="/newsletter" activeClassName="active">
                Newsletter
              </NavLink>
            </li>

            <li>
              <NavLink to="/hashtags" activeClassName="active">
                Hashtags
              </NavLink>
            </li>

          </ul>
        </div>

        {/* Content Area */}
        <div className="network-content">
          <Routes>
            <Route path="/connections" element={<Connections />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/people-i-follow" element={<PeopleIFollow />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/newsletter" element={<NewsLetter />} />
            <Route path="/hashtags" element={<Hashtags />} />

            {/* Default route */}
            <Route path="/" element={<Connections />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Network;