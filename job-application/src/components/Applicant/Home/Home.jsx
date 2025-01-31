// import React, { useState } from 'react';

// import Sidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
// import Feed from '../Feed/Feed';  // Create Feed Component
// import './Home.css';

// const HomePage = () => {
//   const [postText, setPostText] = useState('');

//   const handlePostSubmit = (e) => {
//     e.preventDefault();
//     if (postText.trim() !== '') {
//       alert(`Post Created: ${postText}`);
//       setPostText(''); // Clear the text after post submission
//     }
//   };

//   return (
//     <div className="home-page">
//       {/* Navbar/Header */}


//       <div className="home-content flex flex-row">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}


//           {/* Feed Section */}
//           <Feed />
//         </div>
//       </div>

//   );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';

import Sidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
import Feed from '../Feed/Feed';  // Create Feed Component
import './Home.css';

const HomePage = () => {
  const [postText, setPostText] = useState('');
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch job applications
  const fetchJobApplications = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    if (!token) {
      console.error('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/jobs/applications', {
        method: 'GET',
        headers: {
          'Authorization': ` ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobApplications(data.applications); // Set the applications from the response
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to fetch job applications');
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setError('An error occurred while fetching job applications.');
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  // Fetch job applications on component mount
  useEffect(() => {
    fetchJobApplications();
  }, []);

  // Handle post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() !== '') {
      alert(`Post Created: ${postText}`);
      setPostText(''); // Clear the text after post submission
    }
  };

  // Handle refresh button
  const handleRefresh = () => {
    setJobApplications([]); // Clear previous data
    fetchJobApplications(); // Re-fetch job applications
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          {/* Job Applications Section */}
          <div className="job-applications">
            <h2>My Job Applications</h2>

            {/* Refresh Button */}
            <button onClick={handleRefresh} className="refresh-button">
              Refresh Applications
            </button>

            {loading ? (
              <p>Loading job applications...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : jobApplications.length === 0 ? (
              <p>You haven't applied to any jobs yet.</p>
            ) : (
              <div className="applications-list">
                {jobApplications.map((application) => (
                  <div key={application.id} className="application-card">
                    <h3>{application.jobTitle}</h3>
                    <p>Company: {application.company}</p>
                    <p>Status: <strong>{application.status}</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feed Section */}
          <Feed />

        </div>
      </div>
    </div>
  );
};

export default HomePage;
