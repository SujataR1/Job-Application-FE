// src/components/Categories/RemoteJobs/RemoteJobs.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './RemoteJobs.css'; // Create a corresponding CSS file
import Modal from '../model/Modal';

function RemoteJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    department: [],
    workMode: ['Remote'], // Pre-set to only allow Remote jobs
    experience: [],
    location: [],
    salary: [],
    companyType: [],
    roleCategory: [],
    stipend: [],
    duration: []
  });

  // Static job data for remote jobs
  const allJobs = useMemo(() => [
    { id: 1, title: 'Remote Software Engineer', company: 'ABC Corp', location: 'Mumbai', salary: '₹10-15 Lakhs', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Remote Data Scientist', company: 'XYZ Ltd', location: 'Bengaluru', salary: '₹12-18 Lakhs', department: 'Data Science', workMode: 'Remote' },
    { id: 3, title: 'Remote Product Manager', company: 'DEF Ltd', location: 'Delhi', salary: '₹15-20 Lakhs', department: 'Product', workMode: 'Remote' },
    { id: 4, title: 'Remote Marketing Manager', company: 'GHI Ltd', location: 'Chennai', salary: '₹8-12 Lakhs', department: 'Marketing', workMode: 'Remote' },
    { id: 5, title: 'Remote HR Specialist', company: 'JKL Ltd', location: 'Hyderabad', salary: '₹6-10 Lakhs', department: 'HR', workMode: 'Remote' }
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
    <div className="remote-job-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />
        
        {/* Department Filter */}
        <div className="filter-section">
          <h3>Department</h3>
          {['Engineering', 'Data Science', 'Product', 'Marketing', 'HR'].map((dept, index) => (
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

export default RemoteJobs;

