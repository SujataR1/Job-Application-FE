import React from 'react';
import EmployerNavbar from '../Navbar/Navbar';
import ESidebar from '../Sidebar/Sidebar';
import Efeed from '../Efeed/Efeed';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <EmployerNavbar />
      
      <div className="flex pt-16">
        <ESidebar />
        
        <main className="flex-1 transition-all duration-300 md:ml-16">
          <div className="p-6">
            <Efeed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;