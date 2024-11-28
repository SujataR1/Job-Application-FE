import React, { useState } from 'react';

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
        

          {/* Feed Section */}
          <Feed />
        </div>
      </div>

  );
};

export default HomePage;
