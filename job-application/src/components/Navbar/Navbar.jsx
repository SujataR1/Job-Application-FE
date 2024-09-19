import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file at the top of your Navbar.js component
const Navbar = () => {
    const [showJobsDropdown, setShowJobsDropdown] = useState(false);
    const [showCompaniesDropdown, setShowCompaniesDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const toggleJobsDropdown = () => {
        setShowJobsDropdown(!showJobsDropdown);
    };
    const toggleCompaniesDropdown = () => {
        setShowCompaniesDropdown(!showCompaniesDropdown);
    };
    const toggleServicesDropdown = () => {
        setShowServicesDropdown(!showServicesDropdown);
    };

 
    return (
        <div className="navbar-background font-sans">
            {/* Navbar */}
            <header className="navbar-header flex flex-col md:flex-row justify-between items-center p-5 bg-opacity-80 bg-gray-800">
                {/* Header Left - Logo */}
                <div className="navbar-logo text-3xl font-bold text-white">
                    <span className="text-saffron">Job</span> {/* Saffron color */}
                    <span className="text-white">Portal</span> {/* White color */}
                    <span className="text-green">by Transmogrify</span> {/* Green color */}
                </div>
                {/* Centered Navigation Links */}
                <nav className="navbar-nav flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
                    <Link to="/" className="text-white font-bold text-lg hover:text-teal-300">Home</Link>
                    {/* Jobs Dropdown */}
                    <div className="relative">
                        <button onClick={toggleJobsDropdown} className="text-white font-bold text-lg hover:text-teal-300">
                            Jobs
                        </button>
                        {showJobsDropdown && (
                            <div className="dropdown-menu absolute mt-2 bg-gray-800 text-white shadow-lg rounded-md w-96">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    {/* Popular Categories Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Popular Categories</h3>
                                        <ul>
                                            <li><Link to="/it-jobs" className="dropdown-item">IT Jobs</Link></li>
                                            <li><Link to="/sales-jobs" className="dropdown-item">Sales Jobs</Link></li>
                                            <li><Link to="/marketing-jobs" className="dropdown-item">Marketing Jobs</Link></li>
                                            <li><Link to="/data-science-jobs" className="dropdown-item">Data Science Jobs</Link></li>
                                            <li><Link to="/hr-jobs" className="dropdown-item">HR Jobs</Link></li>
                                            <li><Link to="/engineering-jobs" className="dropdown-item">Engineering Jobs</Link></li>
                                            <li><Link to="/manpower-jobs" className="dropdown-item">Skilled Manpower Jobs</Link></li>
                                        </ul>
                                    </div>
                                    {/* Jobs in Demand Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Jobs in Demand</h3>
                                        <ul>
                                            <li><Link to="/fresher-jobs" className="dropdown-item">Fresher Jobs</Link></li>
                                            <li><Link to="/mnc-jobs" className="dropdown-item">MNC Jobs</Link></li>
                                            <li><Link to="/remote-jobs" className="dropdown-item">Remote Jobs</Link></li>
                                            <li><Link to="/work-from-home-jobs" className="dropdown-item">Work from Home Jobs</Link></li>
                                            <li><Link to="/walk-in-jobs" className="dropdown-item">Walk-in Jobs</Link></li>
                                            <li><Link to="/part-time-jobs" className="dropdown-item">Part-time Jobs</Link></li>
                                        </ul>
                                    </div>
                                    {/* Jobs by Location Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Jobs by Location</h3>
                                        <ul>
                                            <li><Link to="/jobs-in-delhi" className="dropdown-item">Jobs in Delhi</Link></li>
                                            <li><Link to="/jobs-in-mumbai" className="dropdown-item">Jobs in Mumbai</Link></li>
                                            <li><Link to="/jobs-in-bangalore" className="dropdown-item">Jobs in Bangalore</Link></li>
                                            <li><Link to="/jobs-in-hyderabad" className="dropdown-item">Jobs in Hyderabad</Link></li>
                                            <li><Link to="/jobs-in-chennai" className="dropdown-item">Jobs in Chennai</Link></li>
                                            <li><Link to="/jobs-in-pune" className="dropdown-item">Jobs in Pune</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Companies Dropdown */}
                    <div className="relative">
                        <button onClick={toggleCompaniesDropdown} className="text-white font-bold text-lg hover:text-teal-300">
                            Companies
                        </button>
                        {showCompaniesDropdown && (
                            <div className="dropdown-menu absolute mt-2 bg-gray-800 text-white shadow-lg rounded-md w-96">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    {/* Explore Categories Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Explore Categories</h3>
                                        <ul>
                                            <li><Link to="/unicorn-companies" className="dropdown-item">Unicorn</Link></li>
                                            <li><Link to="/mnc-companies" className="dropdown-item">MNC</Link></li>
                                            <li><Link to="/startup-companies" className="dropdown-item">Startup</Link></li>
                                            <li><Link to="/product-based-companies" className="dropdown-item">Product Based</Link></li>
                                            <li><Link to="/internet-companies" className="dropdown-item">Internet</Link></li>
                                            <li><Link to="/skilled-manpower-companies" className="dropdown-item">Skilled Manpower</Link></li>
                                        </ul>
                                    </div>
                                    {/* Explore Collections Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Explore Collections</h3>
                                        <ul>
                                            <li><Link to="/top-companies" className="dropdown-item">Top Companies</Link></li>
                                            <li><Link to="/it-companies" className="dropdown-item">IT Companies</Link></li>
                                            <li><Link to="/fintech-companies" className="dropdown-item">Fintech Companies</Link></li>
                                            <li><Link to="/sponsored-companies" className="dropdown-item">Sponsored Companies</Link></li>
                                            <li><Link to="/featured-companies" className="dropdown-item">Featured Companies</Link></li>
                                        </ul>
                                    </div>
                                    {/* Research Companies Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Research Companies by Ambitionbox</h3>
                                        <ul>
                                            <li><Link to="/interview-questions" className="dropdown-item">Interview Questions</Link></li>
                                            <li><Link to="/company-salaries" className="dropdown-item">Company Salaries</Link></li>
                                            <li><Link to="/company-reviews" className="dropdown-item">Company Reviews</Link></li>
                                            <li><Link to="/salary-calculator" className="dropdown-item">Salary Calculator</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Services Dropdown */}
                    <div className="relative">
                        <button onClick={toggleServicesDropdown} className="text-white font-bold text-lg hover:text-teal-300">
                            Services
                        </button>
                        {showServicesDropdown && (
                            <div className="dropdown-menu absolute mt-2 bg-gray-800 text-white shadow-lg rounded-md w-96">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    {/* Resume Writing Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Resume Writing</h3>
                                        <ul>
                                            <li><Link to="/text-resume" className="dropdown-item">Text Resume</Link></li>
                                            <li><Link to="/visual-resume" className="dropdown-item">Visual Resume</Link></li>
                                            <li><Link to="/resume-critique" className="dropdown-item">Resume Critique</Link></li>
                                        </ul>
                                    </div>
                                    {/* Find Jobs Column */}
                                   
                                    {/* Get Recruiter's Attention Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Get Recruiter's Attention</h3>
                                        <ul>
                                            <li><Link to="/resume-display" className="dropdown-item">Resume Display</Link></li>
                                            <li><h3 className="dropdown-header">Monthly Subscriptions</h3></li>
                                            <li><Link to="/basic-premium-plans" className="dropdown-item">Basic & Premium Plans</Link></li>
                                        </ul>
                                    </div>
                                    {/* Free Resume Resources Column */}
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Free Resume Resources</h3>
                                        <ul>
                                            <li><Link to="/resume-quality-score" className="dropdown-item">Resume Quality Score</Link></li>
                                            <li><Link to="/resume-samples" className="dropdown-item">Resume Samples</Link></li>
                                            <li><Link to="/job-letter-samples" className="dropdown-item">Job Letter Samples</Link></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown-section">
                                        <h3 className="dropdown-header">Find Jobs</h3>
                                        <ul>
                                            <li><Link to="/jobs4u" className="dropdown-item">Jobs4u</Link></li>
                                            <li><Link to="/priority-applicant" className="dropdown-item">Priority Applicant</Link></li>
                                            <li><Link to="/contact-us" className="dropdown-item">Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
                {/* Header Right - Buttons */}
                <div className="navbar-buttons flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <Link to="/login">
                        <button className="login-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="signup-button text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
                            Signup
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
};
export default Navbar;