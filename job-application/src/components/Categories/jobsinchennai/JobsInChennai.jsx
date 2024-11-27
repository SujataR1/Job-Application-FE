import React, { useState, useMemo, useEffect } from 'react';
import './JobsInChennai.css';
import Modal from '../model/Modal';

function JobsInChennai() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experience, setExperience] = useState(0);

  
  const [filters, setFilters] = useState({
    department: [],
    workMode: [],
    experience: [],
    salary: [],
    companyType: [],
  });

  
  const allJobs = useMemo(() => [
    { id: 1, title: 'Software Engineer', company: 'XYZ Ltd', location: 'Chennai', salary: '₹7-12 Lakhs', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Product Manager', company: 'ABC Corp', location: 'Chennai', salary: '₹8-15 Lakhs', department: 'Product', workMode: 'Hybrid' },
    { id: 3, title: 'Data Scientist', company: 'LMN Inc', location: 'Chennai', salary: '₹10-20 Lakhs', department: 'Data', workMode: 'Work from office' },
    { id: 4, title: 'Frontend Developer', company: 'JKL Ltd', location: 'Chennai', salary: '₹5-10 Lakhs', department: 'Engineering', workMode: 'Remote' },
    
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
    <div className="jobs-in-chennai-container">
      <div className="filters-section">
        <h2>All Filters</h2>

       
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />

       
        <div className="filter-section">
          <h3>Department</h3>
          {['Engineering', 'Product', 'Data', 'Marketing', 'Sales'].map((dept, index) => (
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

       
        <div className="filter-section">
          <h3>Work Mode</h3>
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

        
        <div className="filter-section">
          <h3>Salary</h3>
          {['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-20 Lakhs'].map((salary, index) => (
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

        
        <div className="filter-section">
          <h3>Company Type</h3>
          {['Corporate', 'Startup', 'MNC'].map((type, index) => (
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

export default JobsInChennai;
