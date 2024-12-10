
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
  { id: 4, name: 'Bob Ghosh', position: 'UI/UX Designer', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

const Network = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Header */}
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>

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
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '260px',  // To offset the sidebar
          padding: '20px',
          overflowY: 'auto'
        }}>

          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/people-i-follow" element={<PeopleIFollow />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/newsletter" element={<NewsLetter />} />
            <Route path="/hashtags" element={<Hashtags />} />
          </Routes>

          {/* Suggestions Section */}
          <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
            flexGrow: 1 // Ensures the content grows as the page grows
          }}>
            <h3>Suggestions</h3>
            <ul>
              {peopleIKnow.map((person) => (
                <li key={person.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{ marginRight: '15px' }}>
                    <img src={person.imgUrl} alt={person.name} style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%'
                    }} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#333'
                    }}>{person.name}</span>
                    <span style={{
                      fontSize: '14px',
                      color: '#777'
                    }}>{person.position}</span>
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    transition: 'background-color 0.3s ease'
                  }}>
                    Connect
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Footer */}
      
</div>

  );
};

export default Network;
