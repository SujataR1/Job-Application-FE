import React, { useState, useMemo } from 'react';
import './DataScience.css'; // Import your CSS for styling
import DataModal from '../DataModal/DataModal'; // Import the Modal component

function DataScienceJobs() {
  const [filters, setFilters] = useState({
    department: [],
    workMode: [],
    location: [],
    salary: [],
    companyType: [],
    roleCategory: [],
    stipend: [],
    duration: [],
    education: [],
    postedBy: [],
    industry: [],
    topCompanies: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Sample job data for demonstration
  const allJobs = useMemo(() => [
    { id: 1, title: 'Lead Data Science Consultant', company: 'Wells Fargo', location: 'Hyderabad', salary: 'Not disclosed', experience: '8-9 Yrs' },
    { id: 2, title: 'Data Science Senior Analyst', company: 'Pepsico', location: 'Hyderabad', salary: 'Not disclosed', experience: '8-10 Yrs' },
    { id: 3, title: 'Senior Business Analyst - Data Science', company: 'Saisystems Technology', location: 'Pune', salary: '5-10 Lacs PA', experience: '5-10 Yrs' },
    // ... More sample job data
  ], []);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

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

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="data-science-jobs-container">
      <div className="filters-section">
        <h2>All Filters</h2>

        {/* Applied Filters */}
        <div className="filter-section">
          <h3>Applied</h3>
          <p>Applied ({filters.department.length})</p>
        </div>
        <hr />

        {/* Department Filter */}
        <div className="filter-section">
          <h3>Department</h3>
          {['Data Science & Analytics', 'Engineering - Software & QA', 'Marketing & Communication', 'Sales & Business Development'].map((dept, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`department${index}`}
                onChange={() => handleFilterChange('department', dept)}
              />
              <label htmlFor={`department${index}`}>{dept} (12584)</label>
            </div>
          ))}
          <button className="view-more-button" onClick={() => openModal('departments')}>
            View More
          </button>
        </div>
        <hr />

        {/* Location Filter */}
        <div className="filter-section">
          <h3>Location</h3>
          {['Bengaluru', 'Delhi / NCR', 'Hyderabad', 'Mumbai (All Areas)'].map((loc, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`location${index}`}
                onChange={() => handleFilterChange('location', loc)}
              />
              <label htmlFor={`location${index}`}>{loc} (4550)</label>
            </div>
          ))}
          <button className="view-more-button" onClick={() => openModal('locations')}>
            View More
          </button>
        </div>
        <hr />

        {/* Other filters go here */}
      </div>

      <div className="jobs-section">
        <h2>Data Science Jobs</h2>
        <div className="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      {showModal && (
        <DataModal
          closeModal={() => setShowModal(false)}
          type={modalType}
        />
      )}
    </div>
  );
}

export default DataScienceJobs;
