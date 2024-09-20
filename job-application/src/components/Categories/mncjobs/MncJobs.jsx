import React, { useState, useMemo, useEffect } from 'react';
import './MncJobs.css'; // Make sure to create a corresponding CSS file
import Modal from '../model/Modal';

function MncJobs() {
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

  // Static job data for MNC jobs
  const allJobs = useMemo(() => [
    { id: 1, title: 'Software Engineer', company: 'Google', location: 'Bengaluru', salary: '₹15-20 Lakhs', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Project Manager', company: 'Amazon', location: 'Hyderabad', salary: '₹18-24 Lakhs', department: 'Management', workMode: 'Hybrid' },
    { id: 3, title: 'Data Scientist', company: 'Microsoft', location: 'Delhi', salary: '₹20-25 Lakhs', department: 'Data', workMode: 'Work from office' },
    { id: 4, title: 'System Analyst', company: 'Facebook', location: 'Mumbai', salary: '₹12-18 Lakhs', department: 'IT', workMode: 'Remote' },
    { id: 5, title: 'Cloud Architect', company: 'IBM', location: 'Pune', salary: '₹16-22 Lakhs', department: 'Cloud', workMode: 'Hybrid' },
    { id: 6, title: 'Marketing Manager', company: 'Accenture', location: 'Chennai', salary: '₹14-19 Lakhs', department: 'Marketing', workMode: 'Work from office' }
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
    <div className="mnc-job-container">
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
          {['Engineering', 'Management', 'Data', 'IT', 'Cloud', 'Marketing'].map((dept, index) => (
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

        {/* Additional filters (Work mode, experience, etc.) can follow a similar structure */}
        
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

export default MncJobs;
