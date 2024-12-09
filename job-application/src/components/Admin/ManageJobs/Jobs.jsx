import React, { useState } from 'react';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', location: 'New York', salary: 90000, type: 'Full-time' },
    { id: 2, title: 'Data Analyst', location: 'Remote', salary: 70000, type: 'Part-time' },
  ]);
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'full-time',
  });

  // Handle Add Job
  const handleAddJob = (e) => {
    e.preventDefault();
    const newJobObj = {
      id: jobs.length + 1,
      title: newJob.title,
      location: newJob.location,
      salary: newJob.salary,
      type: newJob.type,
    };
    setJobs((prevJobs) => [...prevJobs, newJobObj]);
    setShowAddJobForm(false);
    setNewJob({
      title: '',
      location: '',
      salary: '',
      type: 'full-time',
    });
  };

  // Handle Delete Job
  const handleDeleteJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="home-page">
    <AdminNavbar />
    <div className="home-content flex flex-row">
      <AdminSidenavbar />
    <div className="admin-container">
      <h1>Manage Job Listings</h1>

      <button className="add-job-btn" onClick={() => setShowAddJobForm(true)}>
        Add New Job
      </button>

      {/* Add Job Form Modal */}
      {showAddJobForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowAddJobForm(false)}>
              &times;
            </span>
            <h2>Add Job Listing</h2>
            <form onSubmit={handleAddJob}>
              <label htmlFor="title">Job Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="location">Job Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={newJob.salary}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="type">Job Type:</label>
              <select
                id="type"
                name="type"
                value={newJob.type}
                onChange={handleInputChange}
                required
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
              </select>
              <button type="submit" className="submit-btn">
                Add Job
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Job Listings Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Job Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.type}</td>
              <td>
                <button className="edit-btn" onClick={() => alert(`Editing job with ID: ${job.id}`)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default ManageJobs;
