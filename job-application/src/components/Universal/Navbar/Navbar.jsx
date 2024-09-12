import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your styles

const Navbar = () => {
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showCompaniesDropdown, setShowCompaniesDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/path-to-your-logo.png" alt="Job Portal Logo" className="logo-image" />
          JobPortal
        </Link>
        <div className="navbar-menu">
          <div className="navbar-item dropdown">
            <button
              className="dropdown-button"
              onClick={() => setShowJobsDropdown(!showJobsDropdown)}
            >
              Jobs
            </button>
            {showJobsDropdown && (
              <div className="dropdown-content">
                <Link to="/jobs/popular" className="dropdown-link">Popular categories</Link>
                <Link to="/jobs/it" className="dropdown-link">IT jobs</Link>
                <Link to="/jobs/sales" className="dropdown-link">Sales jobs</Link>
                <Link to="/jobs/marketing" className="dropdown-link">Marketing jobs</Link>
                <Link to="/jobs/data-science" className="dropdown-link">Data Science jobs</Link>
                <Link to="/jobs/hr" className="dropdown-link">HR jobs</Link>
                <Link to="/jobs/engineering" className="dropdown-link">Engineering jobs</Link>
                <Link to="/jobs/in-demand" className="dropdown-link">Jobs in demand</Link>
                <Link to="/jobs/freshers" className="dropdown-link">Fresher jobs</Link>
                <Link to="/jobs/mnc" className="dropdown-link">MNC jobs</Link>
                <Link to="/jobs/remote" className="dropdown-link">Remote jobs</Link>
                <Link to="/jobs/work-from-home" className="dropdown-link">Work from home jobs</Link>
                <Link to="/jobs/walk-in" className="dropdown-link">Walk-in jobs</Link>
                <Link to="/jobs/part-time" className="dropdown-link">Part-time jobs</Link>
                <Link to="/jobs/location/delhi" className="dropdown-link">Jobs in Delhi</Link>
                <Link to="/jobs/location/mumbai" className="dropdown-link">Jobs in Mumbai</Link>
                <Link to="/jobs/location/bangalore" className="dropdown-link">Jobs in Bangalore</Link>
                <Link to="/jobs/location/hyderabad" className="dropdown-link">Jobs in Hyderabad</Link>
                <Link to="/jobs/location/chennai" className="dropdown-link">Jobs in Chennai</Link>
                <Link to="/jobs/location/pune" className="dropdown-link">Jobs in Pune</Link>
              </div>
            )}
          </div>
          <div className="navbar-item dropdown">
            <button
              className="dropdown-button"
              onClick={() => setShowCompaniesDropdown(!showCompaniesDropdown)}
            >
              Companies
            </button>
            {showCompaniesDropdown && (
              <div className="dropdown-content">
                <Link to="/companies/explore" className="dropdown-link">Explore categories</Link>
                <Link to="/companies/unicorn" className="dropdown-link">Unicorn</Link>
                <Link to="/companies/mnc" className="dropdown-link">MNC</Link>
                <Link to="/companies/startup" className="dropdown-link">Startup</Link>
                <Link to="/companies/product-based" className="dropdown-link">Product based</Link>
                <Link to="/companies/internet" className="dropdown-link">Internet</Link>
                <Link to="/companies/top" className="dropdown-link">Top companies</Link>
                <Link to="/companies/it" className="dropdown-link">IT companies</Link>
                <Link to="/companies/fintech" className="dropdown-link">Fintech companies</Link>
                <Link to="/companies/sponsored" className="dropdown-link">Sponsored companies</Link>
                <Link to="/companies/featured" className="dropdown-link">Featured companies</Link>
                <Link to="/companies/research" className="dropdown-link">Research companies by Ambitionbox</Link>
                <Link to="/companies/interview-questions" className="dropdown-link">Interview questions</Link>
                <Link to="/companies/salaries" className="dropdown-link">Company salaries</Link>
                <Link to="/companies/reviews" className="dropdown-link">Company reviews</Link>
                <Link to="/companies/salary-calculator" className="dropdown-link">Salary Calculator</Link>
              </div>
            )}
          </div>
          <Link to="/services" className="navbar-item">Services</Link>
          <Link to="/login" className="navbar-item">Login</Link>
          <Link to="/register" className="navbar-item">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
