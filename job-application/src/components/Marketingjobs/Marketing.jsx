import React, { useState, useMemo, useEffect } from 'react';
import './Marketing.css';
import Modal from '../model/Modal';

function Marketing() {
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
    { id: 1, title: 'Marketing Specialist', company: 'JKL Ltd', location: 'Delhi', salary: '₹7-12 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 2, title: 'Marketing Manager', company: 'XYZ Ltd', location: 'Mumbai', salary: '₹8-15 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 3, title: 'Digital Marketing Executive', company: 'LMN Inc', location: 'Bengaluru', salary: '₹5-8 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 4, title: 'Content Strategist', company: 'ABC Corp', location: 'Delhi', salary: '₹6-10 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 5, title: 'SEO Specialist', company: 'DEF Ltd', location: 'Mumbai', salary: '₹7-11 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 6, title: 'Marketing Analyst', company: 'GHI Ltd', location: 'Bengaluru', salary: '₹6-9 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 7, title: 'Brand Manager', company: 'PQR Ltd', location: 'Delhi', salary: '₹8-13 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 8, title: 'Market Research Analyst', company: 'STU Ltd', location: 'Mumbai', salary: '₹5-8 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 9, title: 'Advertising Manager', company: 'VWX Ltd', location: 'Bengaluru', salary: '₹7-12 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 10, title: 'Social Media Manager', company: 'YZA Ltd', location: 'Delhi', salary: '₹6-11 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 11, title: 'Product Marketing Manager', company: 'BCD Ltd', location: 'Mumbai', salary: '₹8-14 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 12, title: 'Email Marketing Specialist', company: 'EFG Ltd', location: 'Bengaluru', salary: '₹5-9 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 13, title: 'Public Relations Manager', company: 'HIJ Ltd', location: 'Delhi', salary: '₹7-12 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 14, title: 'Marketing Coordinator', company: 'KLM Ltd', location: 'Mumbai', salary: '₹6-10 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 15, title: 'Digital Marketing Manager', company: 'NOP Ltd', location: 'Bengaluru', salary: '₹8-15 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 16, title: 'Content Marketing Manager', company: 'QRS Ltd', location: 'Delhi', salary: '₹7-11 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 17, title: 'Affiliate Marketing Manager', company: 'TUV Ltd', location: 'Mumbai', salary: '₹6-9 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' },
    { id: 18, title: 'Marketing Research Analyst', company: 'WXY Ltd', location: 'Bengaluru', salary: '₹5-8 Lakhs', department: 'Marketing & Advertising', workMode: 'Work from office' },
    { id: 19, title: 'Events Manager', company: 'ZAB Ltd', location: 'Delhi', salary: '₹8-13 Lakhs', department: 'Marketing & Advertising', workMode: 'Remote' },
    { id: 20, title: 'Growth Hacker', company: 'CDE Ltd', location: 'Mumbai', salary: '₹7-12 Lakhs', department: 'Marketing & Advertising', workMode: 'Hybrid' }
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
    <div className="marketing-job-container">
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
            'Marketing & Advertising',
            'Sales & Business Development',
            'Customer Success, Service & Operations',
            'Product Management',
            'Finance & Accounting',
            'Human Resources',
            'IT & Support'
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
            <Modal closeModal={closeModal} />
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
          {['Delhi / NCR', 'Mumbai (All Areas)', 'Bengaluru', 'Hyderabad'].map((loc, index) => (
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
          {['Retail', 'Sales & Marketing', 'IT & Support', 'Finance'].map((category, index) => (
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
          {['0-5K', '5K-10K', '10K-15K', '15K-20K'].map((stipend, index) => (
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

      <div className="job-listing-section">
        <h2>Job Listings</h2>
        <ul>
          {filteredJobs.map(job => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
              <p>{job.department}</p>
              <p>{job.workMode}</p>
              <button className="apply-button">Apply Now</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Marketing;
