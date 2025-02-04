import React, { useState, useEffect } from 'react';
import Feed from '../Feed/Feed'; // Your Feed Component

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
        setJobApplications(data.applications);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch job applications');
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setError('An error occurred while fetching job applications.');
    } finally {
      setLoading(false);
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
      setPostText('');
    }
  };

  // Handle refresh button
  const handleRefresh = () => {
    setJobApplications([]);
    fetchJobApplications();
  };

  return (
    // Outer container: full viewport height, light gray background
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-5">
      {/* Main content container: white background, rounded corners, shadow */}
      <div className="flex flex-col flex-1 p-4 md:p-5 bg-white rounded-lg shadow">
        {/* Job Applications Section */}
        <div className="mb-5">
          {/* Title */}
          <h2 className="font-bold mb-2 text-xl md:text-2xl">
            My Job Applications
          </h2>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded transition-colors w-full mb-4 px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm md:w-auto md:mb-5"
          >
            Refresh Applications
          </button>

          {/* Display loading, error, or the applications list */}
          {loading ? (
            <p>Loading job applications...</p>
          ) : error ? (
            <p className="text-red-500 text-base">{error}</p>
          ) : jobApplications.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {jobApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-gray-200 p-4 rounded-lg shadow"
                >
                  {/* Job title */}
                  <h3 className="mb-2 text-lg sm:text-base font-semibold">
                    {application.jobTitle}
                  </h3>
                  {/* Company */}
                  <p className="my-1">Company: {application.company}</p>
                  {/* Status */}
                  <p className="my-1">
                    Status: <strong className="font-bold">{application.status}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feed Section */}
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
