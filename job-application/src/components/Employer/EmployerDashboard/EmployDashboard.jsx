import React, { useState } from 'react';

import EmployerSidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
import Efeed from '../Efeed/Efeed';  // Create Feed Component
import './EmployDashboard.css';
import EmployerNavbar from '../Navbar/Navbar';

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
     <EmployerNavbar/>

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content Area */}
        

          {/* Feed Section */}
          <Efeed />
        </div>
      </div>

  );
};

export default HomePage;
