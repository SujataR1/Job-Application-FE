// src/components/Categories/WalkInJobs/WalkInJobs.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './WalkInJobs.css'; // Link to the corresponding CSS file
import Modal from '../model/Modal';

function WalkInJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    workMode: [], // Only workMode filter is relevant for WalkInJobs
  });

  // Static job data for Walk-in jobs (only remote)
  const allJobs = useMemo(() => [
    { id: 1, title: 'Software Engineer', company: 'ABC Tech', location: 'Delhi', salary: '₹10-15 Lakhs', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Product Manager', company: 'XYZ Inc', location: 'Mumbai', salary: '₹12-18 Lakhs', department: 'Product', workMode: 'Remote' },
    { id: 3, title: 'UX/UI Designer', company: 'DesignCo', location: 'Bengaluru', salary: '₹8-12 Lakhs', department: 'Design', workMode: 'Remote' },
    { id: 4, title: 'Data Scientist', company: 'DataWorks', location: 'Hyderabad', salary: '₹15-20 Lakhs', department: 'Data', workMode: 'Remote' },
    { id: 5, title: 'Marketing Specialist', company: 'Growthly', location: 'Pune', salary: '₹9-13 Lakhs', department: 'Marketing', workMode: 'Remote' },
  ], []);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const filterJobs = () => {
      let newFilteredJobs = allJobs;

      if (filters.workMode.length > 0) {
        newFilteredJobs = newFilteredJobs.filter(job =>
          filters.workMode.includes(job.workMode)
        );
      }

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
    <div className="walkin-job-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />
        
        {/* WorkMode Filter */}
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

export default WalkInJobs;
