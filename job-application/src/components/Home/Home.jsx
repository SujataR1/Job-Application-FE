import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';  // Ensure Navbar is created in a separate file
import Sidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
import Feed from '../Feed/Feed';  // Create Feed Component
import './Home.css';

const HomePage = () => {
  const [postText, setPostText] = useState('');
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() !== '') {
      alert(`Post Created: ${postText}`);
      setPostText(''); // Clear the text after post submission
    }
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}
     

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content w-full md:w-3/4 p-6">
          <div className="create-post-form p-4 mb-6 bg-white rounded-lg shadow-md">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows="4"
              className="post-textarea w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="What's on your mind?"
            />
            <button
              onClick={handlePostSubmit}
              className="submit-post-button px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>

          {/* Feed Section */}
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
