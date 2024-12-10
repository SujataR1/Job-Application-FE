import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'; 

// Import your components
import Groups from './Groups';
import Header from './Header';
import Contacts from './Contacts';
import PeopleIFollow from './PeopleIFollow';
import NewsLetter from './NewsLetter';
import Hashtags from './Hashtags';

// Dummy data for "People I Know"
const peopleIKnow = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Alice Johnson', position: 'Data Scientist', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 4, name: 'Bob Brown', position: 'UI/UX Designer', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 1, name: 'John Pal', position: 'Software Engineer', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Smith Das', position: 'Product Manager', imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Alice Black', position: 'Data Scientist', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 4, name: 'Bob Ghosh', position: 'UI/UX Designer', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
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
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="network-main-content">
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/people-i-follow" element={<PeopleIFollow />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/newsletter" element={<NewsLetter />} />
            <Route path="/hashtags" element={<Hashtags />} />
          </Routes>

          {/* Suggestions Section (Moved to Center) */}
          <div className="section suggestions-section">
            <h3>Suggestions</h3>
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
  );
};

export default Network;
