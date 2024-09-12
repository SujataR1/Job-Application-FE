import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components
import HomePage from './components/Homepage';
import JobListing from './components/JobListing';
import FeaturedJobs from './components/FeaturedJobs';
import LoginPage from './components/Authentication/Login/Login';
import Navbar from './components/Universal/Navbar/Navbar'; // Import the Navbar component

// App Component
function App() {
  return (
    <Router>
      <div className="App">
        {/* Render Navbar for all routes */}
        <Navbar />

        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/featured-jobs" element={<FeaturedJobs />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add additional routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
