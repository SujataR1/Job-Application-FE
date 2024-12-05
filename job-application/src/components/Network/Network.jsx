import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';  // Import components you need for routing
// Import your components
//import Connections from './Connections';

import Groups from './Groups';
import Header from './Header';
import Contacts from './Contacts';  // Ensure this file exists
import PeopleIFollow from './PeopleIFollow';  // Ensure this file exists
import NewsLetter from './NewsLetter';  // Ensure this file exists
import Hashtags from './Hashtags';  // Ensure this file exists

// Dummy data for "People I Know"
const peopleIKnow = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Alice Johnson', position: 'Data Scientist', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 4, name: 'Bob Brown', position: 'UI/UX Designer', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
];


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
                Others
              </NavLink>
            </li>
            {/* <li>
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
            */}
          </ul>
        </div>

        {/* Content Area */}
        <div className="network-content">
          <div className="left-column">
            <Routes>
              {/* <Route path="/connections" element={<Connections />} /> */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/people-i-follow" element={<PeopleIFollow />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/newsletter" element={<NewsLetter />} />
              <Route path="/hashtags" element={<Hashtags />} />

              {/* Default route */}
              {/* <Route path="/" element={<Connections />} /> */}
            </Routes>
          </div>

          {/* Right Column - People I Know */}
          <div className="right-column">
            <div className="section">
              <h3> Suggestions </h3>
              <ul>
                {peopleIKnow.map((person) => (
                  <li key={person.id} className="suggestion-item">
                    <div className="suggestion-img">
                      <img src={person.imgUrl} alt={person.name} />
                    </div>
                    <div className="suggestion-info">
                      <span className="suggestion-name">{person.name}</span>
                      <span className="suggestion-position">{person.position}</span>
                    </div>
                    <button className="connect-button">Connect</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;