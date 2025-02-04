import React, { useState, useEffect } from 'react';
import './Jobs.css'; // Style the page (you can customize the styles as needed)
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

const JobListingPage = () => {
  // Mock data for job listings (This should come from an API in a real-world application)
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null); // New state to handle editing a job
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch jobs from an API or use mock data
  useEffect(() => {
    // Example of mock job data, replace with an API call in a real app
    const mockJobs = [
      { id: 1, title: 'Frontend Developer', company: 'ABC Corp', location: 'New York', status: 'Open' },
      { id: 2, title: 'Backend Developer', company: 'XYZ Inc', location: 'Remote', status: 'Closed' },
      { id: 3, title: 'UI/UX Designer', company: 'DesignPro', location: 'San Francisco', status: 'Open' },
      { id: 4, title: 'Product Manager', company: 'InnovateTech', location: 'Chicago', status: 'Filled' },
      // Add more mock jobs
    ];

    setJobs(mockJobs);
    setLoading(false);
  }, []);

  // Handle delete job
  const handleDelete = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  // Handle edit job (set up the form for editing)
  const handleEdit = (jobId) => {
    const jobToEdit = jobs.find(job => job.id === jobId);
    setEditingJob(jobToEdit);
    setJobTitle(jobToEdit.title);
    setJobCompany(jobToEdit.company);
    setJobLocation(jobToEdit.location);
    setJobStatus(jobToEdit.status);
  };

  // Handle job update (save changes)
  const handleUpdateJob = (event) => {
    event.preventDefault();
    const updatedJob = {
      ...editingJob,
      title: jobTitle,
      company: jobCompany,
      location: jobLocation,
      status: jobStatus,
    };

    // Update the job list with the updated job
    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    setEditingJob(null); // Clear editing state after update
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Color coding for status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'green';
      case 'Closed': return 'red';
      case 'Filled': return 'orange';
      default: return 'grey';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="job-listing-container">
          <h1>Job Listings</h1>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title or company"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Job Editing Form */}
          {editingJob && (
            <div className="edit-form-container">
              <h2>Edit Job</h2>
              <form onSubmit={handleUpdateJob}>
                <div>
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Company</label>
                  <input
                    type="text"
                    value={jobCompany}
                    onChange={(e) => setJobCompany(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Location</label>
                  <input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    required
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Filled">Filled</option>
                  </select>
                </div>
                <button type="submit" className="update-btn">Update Job</button>
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Job Listing Table */}
          {!editingJob && (
            <table className="job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td style={{ color: getStatusColor(job.status) }}>{job.status}</td>
                    <td>
                      <button onClick={() => handleEdit(job.id)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingPage;
