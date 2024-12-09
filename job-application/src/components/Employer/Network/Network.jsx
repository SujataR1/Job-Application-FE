import React, { useState } from 'react';
import './Network.css'; // Link to your CSS file
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const MyNetwork = () => {
  const [connections, setConnections] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', image: 'https://via.placeholder.com/100x100', status: 'Accepted' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', image: 'https://via.placeholder.com/100x100', status: 'Accepted' },
  ]);

  const [connectionRequests, setConnectionRequests] = useState([
    { id: 3, name: 'Mark Johnson', position: 'Data Scientist', image: 'https://via.placeholder.com/100x100', status: 'Pending' },
    { id: 4, name: 'Sara Lee', position: 'UX Designer', image: 'https://via.placeholder.com/100x100', status: 'Pending' },
  ]);

  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([
    { id: 5, name: 'Lucas Green', position: 'Marketing Manager', image: 'https://via.placeholder.com/100x100', status: 'Add' },
    { id: 6, name: 'Maya Brown', position: 'Content Writer', image: 'https://via.placeholder.com/100x100', status: 'Add' },
  ]);

  const [followedCompanies, setFollowedCompanies] = useState([
    { id: 1, name: 'Tech Corp', description: 'A leading tech company', image: 'https://via.placeholder.com/100x100', status: 'Follow' },
    { id: 2, name: 'Design Studios', description: 'Creative solutions for businesses', image: 'https://via.placeholder.com/100x100', status: 'Follow' },
  ]);

  const acceptRequest = (personId) => {
    const personToAccept = connectionRequests.find(person => person.id === personId);
    setConnections([...connections, { ...personToAccept, status: 'Accepted' }]);
    setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
  };

  const cancelRequest = (personId) => {
    setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
  };

  const sendRequest = (personId) => {
    setPeopleYouMayKnow(prevState =>
      prevState.map(person =>
        person.id === personId ? { ...person, status: 'Request Sent' } : person
      )
    );
  };

  const cancelSentRequest = (personId) => {
    setPeopleYouMayKnow(prevState =>
      prevState.map(person =>
        person.id === personId ? { ...person, status: 'Add' } : person
      )
    );
  };

  const followCompany = (companyId) => {
    setFollowedCompanies(prevState =>
      prevState.map(company =>
        company.id === companyId ? { ...company, status: 'Following' } : company
      )
    );
  };

  const unfollowCompany = (companyId) => {
    setFollowedCompanies(prevState =>
      prevState.map(company =>
        company.id === companyId ? { ...company, status: 'Follow' } : company
      )
    );
  };

  return (
    <div className="network-page">
      <EmployerNavbar />
      <div className="network-content">
        <EmployerSidebar />
        <div className="network-main-content">
          
          {/* Connection Requests Section */}
          <section className="connection-requests-section">
            <h3>Connection Requests</h3>
            <div className="network-list">
              {connectionRequests.map((request) => (
                <div key={request.id} className="network-item">
                  <img src={request.image} alt={request.name} className="profile-image" />
                  <div className="profile-details">
                    <h4>{request.name}</h4>
                    <p>{request.position}</p>
                    {request.status === 'Pending' && (
                      <>
                        <button onClick={() => acceptRequest(request.id)} className="accept-button">Accept</button>
                        <button onClick={() => cancelRequest(request.id)} className="cancel-button">Cancel</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* People You May Know Section */}
          <section className="people-you-may-know">
            <h3>People You May Know</h3>
            <div className="network-list">
              {peopleYouMayKnow.map((person) => (
                <div key={person.id} className="network-item">
                  <img src={person.image} alt={person.name} className="profile-image" />
                  <div className="profile-details">
                    <h4>{person.name}</h4>
                    <p>{person.position}</p>
                    {person.status === 'Add' ? (
                      <button onClick={() => sendRequest(person.id)} className="add-to-network-button">Add to Network</button>
                    ) : person.status === 'Request Sent' ? (
                      <button onClick={() => cancelSentRequest(person.id)} className="cancel-request-button">Cancel Request</button>
                    ) : (
                      <button disabled>{person.status}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Connections Section */}
          <section className="your-connections">
            <h3>Your Connections</h3>
            <div className="network-list">
              {connections.map((connection) => (
                <div key={connection.id} className="network-item">
                  <img src={connection.image} alt={connection.name} className="profile-image" />
                  <div className="profile-details">
                    <h4>{connection.name}</h4>
                    <p>{connection.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Followed Companies Section */}
          <section className="followed-companies">
            <h3>Followed Companies</h3>
            <div className="network-list">
              {followedCompanies.map((company) => (
                <div key={company.id} className="network-item">
                  <img src={company.image} alt={company.name} className="company-image" />
                  <div className="company-details">
                    <h4>{company.name}</h4>
                    <p>{company.description}</p>
                    {company.status === 'Follow' ? (
                      <button onClick={() => followCompany(company.id)} className="follow-button">Follow</button>
                    ) : (
                      <button onClick={() => unfollowCompany(company.id)} className="unfollow-button">Following</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyNetwork;
