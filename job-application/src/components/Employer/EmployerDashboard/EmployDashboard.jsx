import React, { useState } from 'react';
import EmployerNavbar from '../Navbar/Navbar';
import ESidebar from '../Sidebar/Sidebar';
import Efeed from '../Efeed/Efeed';

const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployerNavbar toggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        <ESidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-48' : 'ml-16'}`}>
          <div className="p-6">
            <Efeed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
