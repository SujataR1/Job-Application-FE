
// import React, { useState } from 'react';
// import './Network.css'; // Link to your CSS file
// import EmployerNavbar from '../Navbar/Navbar';
// import EmployerSidebar from '../Sidebar/Sidebar';

// const MyNetwork = () => {
//   // State for connections, requests, people you may know, and followed companies
//   const [connections, setConnections] = useState([
//     { id: 1, name: 'John Doe', position: 'Software Engineer', image: 'https://via.placeholder.com/50', status: 'Accepted' },
//     { id: 2, name: 'Jane Smith', position: 'Product Manager', image: 'https://via.placeholder.com/50', status: 'Accepted' },
//   ]);

//   const [connectionRequests, setConnectionRequests] = useState([
//     { id: 3, name: 'Mark Johnson', position: 'Data Scientist', image: 'https://via.placeholder.com/50', status: 'Pending' },
//     { id: 4, name: 'Sara Lee', position: 'UX Designer', image: 'https://via.placeholder.com/50', status: 'Pending' },
//   ]);

//   const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([
//     { id: 5, name: 'Lucas Green', position: 'Marketing Manager', image: 'https://via.placeholder.com/50', status: 'Add' },
//     { id: 6, name: 'Maya Brown', position: 'Content Writer', image: 'https://via.placeholder.com/50', status: 'Add' },
//   ]);

//   const [followedCompanies, setFollowedCompanies] = useState([
//     { id: 1, name: 'Tech Corp', description: 'A leading tech company', image: 'https://via.placeholder.com/50', status: 'Follow' },
//     { id: 2, name: 'Design Studios', description: 'Creative solutions for businesses', image: 'https://via.placeholder.com/50', status: 'Follow' },
//   ]);

//   // Accepting a connection request
//   const acceptRequest = (personId) => {
//     const personToAccept = connectionRequests.find(person => person.id === personId);
//     setConnections([...connections, { ...personToAccept, status: 'Accepted' }]);
//     setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
//   };

//   // Cancel a connection request
//   const cancelRequest = (personId) => {
//     setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
//   };

//   // Send a request to a person
//   const sendRequest = (personId) => {
//     setPeopleYouMayKnow(prevState =>
//       prevState.map(person =>
//         person.id === personId ? { ...person, status: 'Request Sent' } : person
//       )
//     );
//   };

//   // Cancel a sent request
//   const cancelSentRequest = (personId) => {
//     setPeopleYouMayKnow(prevState =>
//       prevState.map(person =>
//         person.id === personId ? { ...person, status: 'Add' } : person
//       )
//     );
//   };

//   // Follow a company
//   const followCompany = (companyId) => {
//     setFollowedCompanies(prevState =>
//       prevState.map(company =>
//         company.id === companyId ? { ...company, status: 'Following' } : company
//       )
//     );
//   };

//   // Unfollow a company
//   const unfollowCompany = (companyId) => {
//     setFollowedCompanies(prevState =>
//       prevState.map(company =>
//         company.id === companyId ? { ...company, status: 'Follow' } : company
//       )
//     );
//   };

//   return (
//     <div className="network-page">
//       <EmployerNavbar />
//       <div className="network-content">
//         <EmployerSidebar />
//         <div className="network-main-content">
          
//           {/* Connection Requests Section */}
//           <section className="connection-requests-section">
//             <h3>Connection Requests</h3>
//             <ul>
//               {connectionRequests.map((request) => (
//                 <li key={request.id}>
//                   <div className="connection-infor">
//                     <img src={request.image} alt={request.name} className="profile-image" />
//                     <div>
//                       <h4>{request.name}</h4>
//                       <p>{request.position}</p>
//                     </div>
//                     {request.status === 'Pending' && (
//                       <>
//                         <button onClick={() => acceptRequest(request.id)} className="accept-button">Accept</button>
//                         <button onClick={() => cancelRequest(request.id)} className="cancel-button">Cancel</button>
//                       </>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* People You May Know Section */}
//           <section className="people-you-may-know">
//             <h3>People You May Know</h3>
//             <ul>
//               {peopleYouMayKnow.map((person) => (
//                 <li key={person.id}>
//                   <div className="connection-infor">
//                     <img src={person.image} alt={person.name} className="profile-image" />
//                     <div>
//                       <h4>{person.name}</h4>
//                       <p>{person.position}</p>
//                     </div>
//                     {person.status === 'Add' ? (
//                       <button onClick={() => sendRequest(person.id)} className="add-to-network-button">Add to Network</button>
//                     ) : person.status === 'Request Sent' ? (
//                       <button onClick={() => cancelSentRequest(person.id)} className="cancel-request-button">Cancel Request</button>
//                     ) : (
//                       <button disabled>{person.status}</button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Your Connections Section */}
//           <section className="your-connections">
//             <h3>Your Connections</h3>
//             <div className="connection-lists">
//               {connections.map((connection) => (
//                 <div className="connection-items" key={connection.id}>
//                   <img src={connection.image} alt={connection.name} className="profile-image" />
//                   <div>
//                     <h4>{connection.name}</h4>
//                     <p>{connection.position}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Followed Companies Section */}
//           <section className="followed-companies">
//             <h3>Followed Companies</h3>
//             <ul>
//               {followedCompanies.map((company) => (
//                 <li key={company.id}>
//                   <div className="company-infor">
//                     <img src={company.image} alt={company.name} className="company-image" />
//                     <div>
//                       <h4>{company.name}</h4>
//                       <p>{company.description}</p>
//                     </div>
//                     {company.status === 'Follow' ? (
//                       <button onClick={() => followCompany(company.id)} className="follow-button">Follow</button>
//                     ) : (
//                       <button onClick={() => unfollowCompany(company.id)} className="unfollow-button">Following</button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyNetwork;

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

  // Accepting a connection request
  const acceptRequest = (personId) => {
    const personToAccept = connectionRequests.find(person => person.id === personId);
    setConnections([...connections, { ...personToAccept, status: 'Accepted' }]);
    setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
  };

  // Cancel a connection request
  const cancelRequest = (personId) => {
    setConnectionRequests(prevState => prevState.filter(person => person.id !== personId));
  };

  // Send a request to a person
  const sendRequest = (personId) => {
    setPeopleYouMayKnow(prevState =>
      prevState.map(person =>
        person.id === personId ? { ...person, status: 'Request Sent' } : person
      )
    );
  };

  // Cancel a sent request
  const cancelSentRequest = (personId) => {
    setPeopleYouMayKnow(prevState =>
      prevState.map(person =>
        person.id === personId ? { ...person, status: 'Add' } : person
      )
    );
  };

  // Follow a company
  const followCompany = (companyId) => {
    setFollowedCompanies(prevState =>
      prevState.map(company =>
        company.id === companyId ? { ...company, status: 'Following' } : company
      )
    );
  };

  // Unfollow a company
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
            <ul>
              {connectionRequests.map((request) => (
                <li key={request.id}>
                  <div className="connection-info">
                    <img src={request.image} alt={request.name} className="profile-image" />
                    <div>
                      <h4>{request.name}</h4>
                      <p>{request.position}</p>
                    </div>
                    {request.status === 'Pending' && (
                      <>
                        <button onClick={() => acceptRequest(request.id)} className="accept-button">Accept</button>
                        <button onClick={() => cancelRequest(request.id)} className="cancel-button">Cancel</button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* People You May Know Section */}
          <section className="people-you-may-know">
            <h3>People You May Know</h3>
            <ul>
              {peopleYouMayKnow.map((person) => (
                <li key={person.id}>
                  <div className="connection-info">
                    <img src={person.image} alt={person.name} className="profile-image" />
                    <div>
                      <h4>{person.name}</h4>
                      <p>{person.position}</p>
                    </div>
                    {person.status === 'Add' ? (
                      <button onClick={() => sendRequest(person.id)} className="add-to-network-button">Add to Network</button>
                    ) : person.status === 'Request Sent' ? (
                      <button onClick={() => cancelSentRequest(person.id)} className="cancel-request-button">Cancel Request</button>
                    ) : (
                      <button disabled>{person.status}</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Your Connections Section */}
          <section className="your-connections">
            <h3>Your Connections</h3>
            <div className="connection-lists">
              {connections.map((connection) => (
                <div className="connection-item" key={connection.id}>
                  <img src={connection.image} alt={connection.name} className="profile-image" />
                  <div>
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
            <ul>
              {followedCompanies.map((company) => (
                <li key={company.id}>
                  <div className="company-infor">
                    <img src={company.image} alt={company.name} className="company-image" />
                    <div>
                      <h4>{company.name}</h4>
                      <p>{company.description}</p>
                    </div>
                    {company.status === 'Follow' ? (
                      <button onClick={() => followCompany(company.id)} className="follow-button">Follow</button>
                    ) : (
                      <button onClick={() => unfollowCompany(company.id)} className="unfollow-button">Following</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default MyNetwork;
