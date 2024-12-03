import React, { useState } from 'react';
import JobCard from './JobCard';

const JobListings = () => {
  const [filters, setFilters] = useState({
    location: '',
    wfh: false,
    salaryRange: [0, 10],
    experience: '',
  });

  const jobData = [
    {
      id: 1,
      title: 'Marketing Specialist',
      company: 'Sun Chem India',
      location: 'Mumbai, Goregaon',
      salary: '₹ 2,00,000 - ₹ 3,00,000',
      experience: '0-2 years',
      wfh: false,
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Bangalore',
      salary: '₹ 6,00,000 - ₹ 8,00,000',
      experience: '1-3 years',
      wfh: true,
    },
    // Add more job objects here...
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>5602 Jobs</h1>
      <h2>Start applying to the latest job vacancies at leading companies in India below.</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Location (e.g. Delhi)"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="checkbox"
          name="wfh"
          checked={filters.wfh}
          onChange={(e) => setFilters({ ...filters, wfh: e.target.checked })}
        />
        Work from Home
        <input
          type="range"
          name="salaryRange"
          min="0"
          max="10"
          value={filters.salaryRange[1]}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="experience"
          value={filters.experience}
          onChange={handleFilterChange}
          placeholder="Experience in years"
        />
      </div>
      <div className="job-list">
        {jobData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
