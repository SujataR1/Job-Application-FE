import React, { useState, useMemo, useEffect } from 'react';
import './Engineering.css'; // Adjust the CSS path if necessary
import Modal from '../model/Modal';

function Engineering() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const allJobs = useMemo(() => [
    { id: 1, title: 'Software Engineer', company: 'Tech Solutions', location: 'San Francisco', salary: '$120K - $150K', department: 'Engineering', workMode: 'Remote' },
    { id: 2, title: 'Frontend Developer', company: 'Innovate Inc', location: 'New York', salary: '$100K - $130K', department: 'Engineering', workMode: 'Hybrid' },
    { id: 3, title: 'Backend Engineer', company: 'DevWorks', location: 'Austin', salary: '$110K - $140K', department: 'Engineering', workMode: 'Work from office' },
    { id: 4, title: 'Full Stack Developer', company: 'BuildIt', location: 'Seattle', salary: '$115K - $145K', department: 'Engineering', workMode: 'Remote' },
    { id: 5, title: 'Data Scientist', company: 'DataCorp', location: 'San Francisco', salary: '$125K - $155K', department: 'Engineering', workMode: 'Hybrid' },
    { id: 6, title: 'DevOps Engineer', company: 'CloudTech', location: 'Chicago', salary: '$120K - $150K', department: 'Engineering', workMode: 'Work from office' },
    { id: 7, title: 'QA Engineer', company: 'TestLab', location: 'Austin', salary: '$100K - $130K', department: 'Engineering', workMode: 'Remote' },
    { id: 8, title: 'Machine Learning Engineer', company: 'AI Innovations', location: 'New York', salary: '$130K - $160K', department: 'Engineering', workMode: 'Hybrid' },
    { id: 9, title: 'Systems Engineer', company: 'SysNet', location: 'San Francisco', salary: '$110K - $140K', department: 'Engineering', workMode: 'Work from office' },
    { id: 10, title: 'Network Engineer', company: 'NetSecure', location: 'Seattle', salary: '$105K - $135K', department: 'Engineering', workMode: 'Remote' }
  ], []);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const filterJobs = () => {
      let newFilteredJobs = allJobs;

      if (Object.values(filters).every(filter => filter.length === 0)) {
        setFilteredJobs(allJobs);
        return;
      }

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
    <div className="engineering-job-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          {appliedFilterCount > 0 && <p>Applied ({appliedFilterCount})</p>}
        </div>
        <hr />
        
        <div className="filter-section">
          <h3>Department</h3>
          {['Engineering'].map((dept, index) => (
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

export default Engineering;
