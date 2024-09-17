// ITJobs.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './ITjobs.css'; // Import the CSS file for styling
import ITmodal from '../../ITmodal/ITmodal'; // Import the ITmodal component

function ITJobs() {
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
    { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'Bengaluru', salary: '₹6-10 Lakhs', department: 'Engineering - Software & QA', workMode: 'Remote' },
    { id: 2, title: 'Data Scientist', company: 'DataTech', location: 'Hyderabad', salary: '₹12-20 Lakhs', department: 'Engineering - Software & QA', workMode: 'Hybrid' },
    { id: 3, title: 'System Administrator', company: 'SysAdminCo', location: 'Pune', salary: '₹5-8 Lakhs', department: 'IT & Information Security', workMode: 'Work from office' },
    { id: 4, title: 'Network Engineer', company: 'NetSolutions', location: 'Delhi / NCR', salary: '₹8-12 Lakhs', department: 'Engineering - Hardware & Networks', workMode: 'Hybrid' },
    { id: 5, title: 'QA Tester', company: 'QualitySoft', location: 'Bengaluru', salary: '₹4-6 Lakhs', department: 'Engineering - Software & QA', workMode: 'Remote' },
    { id: 6, title: 'IT Support Specialist', company: 'SupportIT', location: 'Mumbai', salary: '₹3-5 Lakhs', department: 'IT & Information Security', workMode: 'Work from office' },
    { id: 7, title: 'DevOps Engineer', company: 'DevOpsPro', location: 'Delhi / NCR', salary: '₹10-15 Lakhs', department: 'Engineering - Software & QA', workMode: 'Hybrid' },
    { id: 8, title: 'Technical Lead', company: 'TechLeadInc', location: 'Bengaluru', salary: '₹15-25 Lakhs', department: 'Engineering - Software & QA', workMode: 'Remote' }
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
    <div className="it-jobs-container">
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
            'Engineering - Hardware & Networks',
            'Engineering - Software & QA',
            'IT & Information Security',
            'Sales & Business Development'
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
            <ITmodal closeModal={closeModal} />
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
          {['Delhi / NCR', 'Mumbai', 'Bengaluru', 'Hyderabad'].map((loc, index) => (
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
          {['Software Development', 'DBA / Data warehousing', 'Quality Assurance and Testing', 'IT Support'].map((category, index) => (
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
          {['0-10k', '10k-20k', '20k-30k'].map((stipend, index) => (
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

export default ITJobs;
