import React, { useState, useMemo, useEffect } from 'react';
import './Sales.css'; // Import the CSS file for styling
import Modal from '../../model/Modal'; // Import the Modal component

function Sales() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experience, setExperience] = useState(0); // Initialize experience state

  // State for filters
  const [filters, setFilters] = useState({
    department: [],
    workMode: [],
    experience: [],
    location: [],
    salary: [],
    companyType: [],
    roleCategory: [],
    stipend: [],
    duration: []
  });

  // Static job data for design purposes
  const allJobs = useMemo(() => [
    { id: 1, title: 'Sales Manager', company: 'ABC Corp', location: 'Delhi', salary: '₹10-15 Lakhs', department: 'Sales & Business Development', workMode: 'Work from office' },
    { id: 2, title: 'Business Development Executive', company: 'XYZ Ltd', location: 'Mumbai', salary: '₹6-10 Lakhs', department: 'Customer Success, Service & Operations', workMode: 'Hybrid' },
    { id: 3, title: 'Account Executive', company: 'LMN Inc', location: 'Bengaluru', salary: '₹3-6 Lakhs', department: 'Sales & Business Development', workMode: 'Remote' },
    { id: 4, title: 'Sales Associate', company: 'DEF Ltd', location: 'Delhi', salary: '₹5-7 Lakhs', department: 'Customer Success, Service & Operations', workMode: 'Work from office' },
    { id: 5, title: 'Sales Director', company: 'GHI Ltd', location: 'Mumbai', salary: '₹15-25 Lakhs', department: 'Sales & Business Development', workMode: 'Hybrid' },
    { id: 6, title: 'Marketing Specialist', company: 'JKL Ltd', location: 'Delhi', salary: '₹7-12 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 7, title: 'Product Manager', company: 'MNO Corp', location: 'Bengaluru', salary: '₹12-20 Lakhs', department: 'Product Management', workMode: 'Hybrid' },
    { id: 8, title: 'Finance Analyst', company: 'PQR Ltd', location: 'Mumbai', salary: '₹8-14 Lakhs', department: 'Finance & Accounting', workMode: 'Work from office' },
    { id: 9, title: 'HR Manager', company: 'STU Inc', location: 'Delhi', salary: '₹10-16 Lakhs', department: 'Human Resources', workMode: 'Remote' },
    { id: 10, title: 'IT Support Specialist', company: 'VWX Ltd', location: 'Bengaluru', salary: '₹6-9 Lakhs', department: 'IT & Support', workMode: 'Hybrid' }
  ], []);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const filterJobs = () => {
      let newFilteredJobs = allJobs;

      Object.keys(filters).forEach(filterType => {
        if (filters[filterType].length > 0) {
          newFilteredJobs = newFilteredJobs.filter(job =>
            filters[filterType].includes(job[filterType])
          );
        }
      });

      setFilteredJobs(newFilteredJobs);
    };

    filterJobs();
  }, [filters, experience, allJobs]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle checkbox change
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType].push(value);
      }
      return newFilters;
    });
  };

  // Calculate the number of applied filters
  const getAppliedFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  const appliedFilterCount = getAppliedFilterCount();

  return (
    <div className="sales-job-container">
      <div className="filters-section">
        <h2>All Filters</h2>

        {/* Applied Filter */}
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />

        {/* Department Filter */}
        <div className="filter-section">
          <h3>Department</h3>
          {[
            'Sales & Business Development',
            'Customer Success, Service & Operations',
            'Marketing & Advertising',
            'Product Management',
            'Finance & Accounting',
            'Human Resources',
            'IT & Support'
          ].map((dept, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`department${index}`}
                onChange={() => handleFilterChange('department', dept)}
              />
              <label htmlFor={`department${index}`}>{dept}</label>
            </div>
          ))}
          <button className="view-more-button" onClick={openModal}>
            View More
          </button>
          {isModalOpen && (
            <Modal closeModal={closeModal} />
          )}
        </div>
        <hr />

        {/* Work Mode Filter */}
        <div className="filter-section">
          <h3>Work mode</h3>
          {['Work from office', 'Hybrid', 'Remote'].map((mode, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`workMode${index}`}
                onChange={() => handleFilterChange('workMode', mode)}
              />
              <label htmlFor={`workMode${index}`}>{mode}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Experience Filter */}
        <div className="filter-section">
          <h3>Experience</h3>
          <div className="experience-slider">
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="slider"
              id="experienceRange"
            />
            <div className="slider-labels">
              <span>{experience} to </span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
        <hr />

        {/* Location Filter */}
        <div className="filter-section">
          <h3>Location</h3>
          {['Delhi / NCR', 'Mumbai (All Areas)', 'Bengaluru', 'Hyderabad'].map((loc, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`location${index}`}
                onChange={() => handleFilterChange('location', loc)}
              />
              <label htmlFor={`location${index}`}>{loc}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Salary Filter */}
        <div className="filter-section">
          <h3>Salary</h3>
          {['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-15 Lakhs'].map((salary, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`salary${index}`}
                onChange={() => handleFilterChange('salary', salary)}
              />
              <label htmlFor={`salary${index}`}>{salary}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Company Type Filter */}
        <div className="filter-section">
          <h3>Company type</h3>
          {['Corporate', 'Indian MNC', 'Startup', 'Foreign MNC'].map((type, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`companyType${index}`}
                onChange={() => handleFilterChange('companyType', type)}
              />
              <label htmlFor={`companyType${index}`}>{type}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Role Category Filter */}
        <div className="filter-section">
          <h3>Role category</h3>
          {['Retail', 'Sales & Marketing', 'IT & Support', 'Finance'].map((category, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`roleCategory${index}`}
                onChange={() => handleFilterChange('roleCategory', category)}
              />
              <label htmlFor={`roleCategory${index}`}>{category}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Stipend Filter */}
        <div className="filter-section">
          <h3>Stipend</h3>
          {['0-5K', '5K-10K', '10K-15K', '15K-20K'].map((stipend, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`stipend${index}`}
                onChange={() => handleFilterChange('stipend', stipend)}
              />
              <label htmlFor={`stipend${index}`}>{stipend}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Duration Filter */}
        <div className="filter-section">
          <h3>Duration</h3>
          {['Less than 3 months', '3-6 months', '6-12 months', 'More than 12 months'].map((duration, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`duration${index}`}
                onChange={() => handleFilterChange('duration', duration)}
              />
              <label htmlFor={`duration${index}`}>{duration}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="jobs-section">
        <h2>Job Listings</h2>
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Department:</strong> {job.department}</p>
              <p><strong>Work Mode:</strong> {job.workMode}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sales;
