// src/components/Categories/PartTimeJobs/PartTimeJobs.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './PartTimeJobs.css'; // Make sure to create a corresponding CSS file
import Modal from '../model/Modal';

function PartTimeJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    workMode: [],
    location: [],
    salary: []
  });

  // Static job data for Part-time jobs
  const allJobs = useMemo(() => [
    { id: 1, title: 'Remote Data Entry', company: 'ABC Corp', location: 'Remote', salary: '₹3-5 Lakhs', workMode: 'Remote' },
    { id: 2, title: 'Virtual Assistant', company: 'XYZ Ltd', location: 'Remote', salary: '₹4-6 Lakhs', workMode: 'Remote' },
    { id: 3, title: 'Freelance Graphic Designer', company: 'Design Co', location: 'Remote', salary: '₹5-8 Lakhs', workMode: 'Remote' },
    { id: 4, title: 'Part-time Content Writer', company: 'Content Hub', location: 'Remote', salary: '₹3-5 Lakhs', workMode: 'Remote' },
    { id: 5, title: 'Social Media Manager', company: 'Marketing Pros', location: 'Remote', salary: '₹4-7 Lakhs', workMode: 'Remote' }
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const getAppliedFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  const appliedFilterCount = getAppliedFilterCount();

  return (
    <div className="part-time-job-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />
        
        {/* Work Mode Filter */}
        <div className="filter-section">
          <h3>Work Mode</h3>
          {['Remote'].map((mode, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`workMode${index}`}
                onChange={() => handleFilterChange('workMode', mode)}
              />
              <label htmlFor={`workMode${index}`}>{mode}</label>
            </div>
          ))}
          <button className="view-more-button" onClick={openModal}>
            View More
          </button>
          {isModalOpen && <Modal closeModal={closeModal} />}
        </div>
        
        {/* Additional filters (Location, Salary, etc.) can follow similar structure */}
        
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
              <button className="apply-button">Apply Now</button>
            </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default PartTimeJobs;
