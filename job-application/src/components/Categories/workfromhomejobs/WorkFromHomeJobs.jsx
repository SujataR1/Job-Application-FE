// src/components/Categories/WorkFromHomeJobs/WorkFromHomeJobs.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './WorkFromHomeJobs.css'; // Make sure to create a corresponding CSS file
import Modal from '../model/Modal';

function WorkFromHomeJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    department: [],
    workMode: ['Remote'],  // Only Remote jobs
    experience: [],
    location: [],
    salary: [],
    companyType: [],
    roleCategory: [],
    stipend: [],
    duration: []
  });

  // Static job data for Work From Home jobs (remote only)
  const allJobs = useMemo(() => [
    { id: 1, title: 'Software Engineer', company: 'XYZ Corp', location: 'Remote', salary: '₹10-15 Lakhs', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Digital Marketing Manager', company: 'ABC Ltd', location: 'Remote', salary: '₹8-12 Lakhs', department: 'Marketing', workMode: 'Remote' },
    { id: 3, title: 'Content Writer', company: 'DEF Inc', location: 'Remote', salary: '₹5-7 Lakhs', department: 'Content', workMode: 'Remote' },
    { id: 4, title: 'HR Manager', company: 'GHI Ltd', location: 'Remote', salary: '₹9-13 Lakhs', department: 'HR', workMode: 'Remote' },
    { id: 5, title: 'Frontend Developer', company: 'JKL Ltd', location: 'Remote', salary: '₹10-14 Lakhs', department: 'Engineering', workMode: 'Remote' },
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
    <div className="workfromhome-job-container">
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
          {['Engineering', 'Marketing', 'Content', 'HR'].map((dept, index) => (
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

        {/* You can add additional filters (Experience, Salary, etc.) */}
        
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

export default WorkFromHomeJobs;
