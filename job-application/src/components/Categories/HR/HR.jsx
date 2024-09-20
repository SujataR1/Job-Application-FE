// src/components/Categories/HR/HR.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './HR.css'; // Make sure to create a corresponding CSS file
import Modal from '../../model/Modal';

function HR() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Static job data for HR jobs
  const allJobs = useMemo(() => [
    { id: 1, title: 'HR Manager', company: 'XYZ Corp', location: 'Delhi', salary: '₹8-12 Lakhs', department: 'HR', workMode: 'Remote' },
    { id: 2, title: 'Recruitment Specialist', company: 'ABC Ltd', location: 'Mumbai', salary: '₹7-11 Lakhs', department: 'HR', workMode: 'Hybrid' },
    { id: 3, title: 'HR Generalist', company: 'DEF Inc', location: 'Bengaluru', salary: '₹6-10 Lakhs', department: 'HR', workMode: 'Work from office' },
    { id: 4, title: 'Talent Acquisition Manager', company: 'GHI Ltd', location: 'Delhi', salary: '₹9-13 Lakhs', department: 'HR', workMode: 'Remote' },
    { id: 5, title: 'HR Business Partner', company: 'JKL Ltd', location: 'Mumbai', salary: '₹10-15 Lakhs', department: 'HR', workMode: 'Hybrid' },
    { id: 6, title: 'Compensation and Benefits Specialist', company: 'MNO Ltd', location: 'Bengaluru', salary: '₹8-12 Lakhs', department: 'HR', workMode: 'Work from office' },
    { id: 7, title: 'HR Coordinator', company: 'PQR Ltd', location: 'Delhi', salary: '₹5-8 Lakhs', department: 'HR', workMode: 'Remote' },
    { id: 8, title: 'Employee Relations Specialist', company: 'STU Ltd', location: 'Mumbai', salary: '₹7-11 Lakhs', department: 'HR', workMode: 'Hybrid' },
    { id: 9, title: 'HR Consultant', company: 'VWX Ltd', location: 'Bengaluru', salary: '₹9-13 Lakhs', department: 'HR', workMode: 'Work from office' },
    { id: 10, title: 'Training and Development Manager', company: 'YZA Ltd', location: 'Delhi', salary: '₹10-14 Lakhs', department: 'HR', workMode: 'Remote' }
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
    <div className="hr-job-container">
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
          {['HR'].map((dept, index) => (
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
        
        {/* Additional filters (Work mode, experience, etc.) can follow similar structure */}
        
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

export default HR;
