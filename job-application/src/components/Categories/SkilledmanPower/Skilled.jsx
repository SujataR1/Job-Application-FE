import React, { useState, useMemo, useEffect } from 'react';
import './Skilled.css'; 
import SkilledModal from '../../SkilledManpowerModal/SkilledModal'; 

function SkilledManpower() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    jobType: [],
    location: [],
    salary: [],
    experience: [],
    companyType: []
  });

  // Job data
  const allJobs = useMemo(() => [
    { id: 1, title: 'Construction Worker', company: 'ABC Builders', location: 'Delhi', salary: '₹20,000/month', experience: '1-2 Years', jobType: 'Full-Time', companyType: 'Startup' },
    { id: 2, title: 'Electrician', company: 'XYZ Electricals', location: 'Mumbai', salary: '₹25,000/month', experience: '2-3 Years', jobType: 'Full-Time', companyType: 'Corporate' },
    { id: 3, title: 'Welder', company: 'WeldTech', location: 'Bengaluru', salary: '₹18,000/month', experience: '1-3 Years', jobType: 'Contract', companyType: 'Indian MNC' },
    { id: 4, title: 'Plumber', company: 'PlumbRight', location: 'Hyderabad', salary: '₹15,000/month', experience: '0-1 Years', jobType: 'Part-Time', companyType: 'Startup' },
    // Add more job entries as needed
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
  }, [filters, allJobs]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const appliedFilterCount = Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);

  return (
    <div className="skilled-manpower-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />
        {/* Job Type Filter */}
        <div className="filter-section">
          <h3>Job Type</h3>
          {['Full-Time', 'Part-Time', 'Contract'].map((type, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`jobType${index}`}
                onChange={() => handleFilterChange('jobType', type)}
              />
              <label htmlFor={`jobType${index}`}>{type}</label>
            </div>
          ))}
        </div>
        <hr />
        {/* Location Filter */}
        <div className="filter-section">
          <h3>Location</h3>
          {['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad'].map((location, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`location${index}`}
                onChange={() => handleFilterChange('location', location)}
              />
              <label htmlFor={`location${index}`}>{location}</label>
            </div>
          ))}
        </div>
        <hr />
        {/* Salary Filter */}
        <div className="filter-section">
          <h3>Salary</h3>
          {['₹10,000-₹20,000', '₹20,001-₹30,000', '₹30,001-₹40,000'].map((salary, index) => (
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
        {/* Experience Filter */}
        <div className="filter-section">
          <h3>Experience</h3>
          <div className="experience-slider">
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={0} // Replace with your experience state if needed
              className="slider"
              id="experienceRange"
            />
            <div className="slider-labels">
              <span>0 to </span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
        <hr />
        {/* Company Type Filter */}
        <div className="filter-section">
          <h3>Company Type</h3>
          {['Startup', 'Corporate', 'Indian MNC'].map((type, index) => (
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
        <button className="view-more-button" onClick={openModal}>
          View More
        </button>
        {isModalOpen && (
          <SkilledModal
            closeModal={closeModal}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        )}
      </div>
      <div className="jobs-section">
        <h2>Job Listings</h2>
        <div className="jobs-list">
          {filteredJobs.map(job => (
            <div key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Company Type:</strong> {job.companyType}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkilledManpower;
