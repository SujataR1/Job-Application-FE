import React, { useState } from 'react';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';


const MyNetwork = () => {
  const [connections, setConnections] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', image: 'https://cdn-icons-png.flaticon.com/128/15735/15735364.png', status: 'Accepted' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', image: 'https://cdn-icons-png.flaticon.com/128/4140/4140047.png', status: 'Accepted' },
  ]);

  const [connectionRequests, setConnectionRequests] = useState([
    { id: 3, name: 'Mark Johnson', position: 'Data Scientist', image: 'https://cdn-icons-png.flaticon.com/128/15735/15735364.png', status: 'Pending' },
    { id: 4, name: 'Sara Lee', position: 'UX Designer', image: 'https://cdn-icons-png.flaticon.com/128/4140/4140047.png', status: 'Pending' },
  ]);

  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([
    { id: 5, name: 'Rechal Green', position: 'Marketing Manager', image: 'https://cdn-icons-png.flaticon.com/128/4140/4140047.png', status: 'Add' },
    { id: 6, name: 'Maya Brown', position: 'Content Writer', image: 'https://cdn-icons-png.flaticon.com/128/4140/4140047.png', status: 'Add' },
  ]);

  const [followedCompanies, setFollowedCompanies] = useState([
    { id: 1, name: 'Tech Corp', description: 'A leading tech company', image: 'https://cdn-icons-png.flaticon.com/128/993/993854.png', status: 'Follow' },
    { id: 2, name: 'Design Studios', description: 'Creative solutions for businesses', image: 'https://cdn-icons-png.flaticon.com/128/993/993854.png', status: 'Follow' },
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="flex flex-1 pt-16"> {/* Add top padding for navbar */}
        <EmployerSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 ml-[200px]"> {/* Reduced margin-left */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Network</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Connection Requests */}
            <section className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Connection Requests</h2>
              <div className="space-y-3">
                {connectionRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No connection requests at the moment.</p>
                ) : (
                  connectionRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center">
                        <img src={request.image} alt={request.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                        <div>
                          <h4 className="text-base font-medium text-gray-800">{request.name}</h4>
                          <p className="text-xs text-gray-500">{request.position}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => acceptRequest(request.id)}
                          className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => cancelRequest(request.id)}
                          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* People You May Know */}
            <section className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">People You May Know</h2>
              <div className="space-y-3">
                {peopleYouMayKnow.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No suggestions available right now.</p>
                ) : (
                  peopleYouMayKnow.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center">
                        <img src={person.image} alt={person.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                        <div>
                          <h4 className="text-base font-medium text-gray-800">{person.name}</h4>
                          <p className="text-xs text-gray-500">{person.position}</p>
                        </div>
                      </div>
                      {person.status === 'Add' ? (
                        <button
                          onClick={() => sendRequest(person.id)}
                          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          onClick={() => cancelSentRequest(person.id)}
                          className="px-3 py-1.5 text-sm bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Your Connections */}
            <section className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Connections</h2>
              <div className="space-y-3">
                {connections.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">You have no connections yet.</p>
                ) : (
                  connections.map((connection) => (
                    <div key={connection.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <img src={connection.image} alt={connection.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                      <div>
                        <h4 className="text-base font-medium text-gray-800">{connection.name}</h4>
                        <p className="text-xs text-gray-500">{connection.position}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Followed Companies */}
            <section className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Followed Companies</h2>
              <div className="space-y-3">
                {followedCompanies.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">You are not following any companies yet.</p>
                ) : (
                  followedCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center">
                        <img src={company.image} alt={company.name} className="w-12 h-12 rounded-lg object-cover mr-3" />
                        <div>
                          <h4 className="text-base font-medium text-gray-800">{company.name}</h4>
                          <p className="text-xs text-gray-500">{company.description}</p>
                        </div>
                      </div>
                      {company.status === 'Follow' ? (
                        <button
                          onClick={() => followCompany(company.id)}
                          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Follow
                        </button>
                      ) : (
                        <button
                          onClick={() => unfollowCompany(company.id)}
                          className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Following
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyNetwork;
