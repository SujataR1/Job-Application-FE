// import React, { useState } from 'react';
// import AdminNavbar from '../Navbar/Navbar';
// import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

// const ManageJobs = () => {
//   const [jobs, setJobs] = useState([
//     { id: 1, title: 'Software Engineer', location: 'New York', salary: 90000, type: 'Full-time' },
//     { id: 2, title: 'Data Analyst', location: 'Remote', salary: 70000, type: 'Part-time' },
//   ]);
//   const [showAddJobForm, setShowAddJobForm] = useState(false);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     location: '',
//     salary: '',
//     type: 'full-time',
//   });

//   // Handle Add Job
//   const handleAddJob = (e) => {
//     e.preventDefault();
//     const newJobObj = {
//       id: jobs.length + 1,
//       title: newJob.title,
//       location: newJob.location,
//       salary: newJob.salary,
//       type: newJob.type,
//     };
//     setJobs((prevJobs) => [...prevJobs, newJobObj]);
//     setShowAddJobForm(false);
//     setNewJob({
//       title: '',
//       location: '',
//       salary: '',
//       type: 'full-time',
//     });
//   };

//   // Handle Delete Job
//   const handleDeleteJob = (id) => {
//     setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
//   };

//   // Handle Input Change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="home-page">
//     <AdminNavbar />
//     <div className="home-content flex flex-row">
//       <AdminSidenavbar />
//     <div className="admin-container">
//       <h1>Manage Job Listings</h1>

//       <button className="add-job-btn" onClick={() => setShowAddJobForm(true)}>
//         Add New Job
//       </button>

//       {/* Add Job Form Modal */}
//       {showAddJobForm && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close-btn" onClick={() => setShowAddJobForm(false)}>
//               &times;
//             </span>
//             <h2>Add Job Listing</h2>
//             <form onSubmit={handleAddJob}>
//               <label htmlFor="title">Job Title:</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={newJob.title}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor="location">Job Location:</label>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 value={newJob.location}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor="salary">Salary:</label>
//               <input
//                 type="number"
//                 id="salary"
//                 name="salary"
//                 value={newJob.salary}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor="type">Job Type:</label>
//               <select
//                 id="type"
//                 name="type"
//                 value={newJob.type}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="full-time">Full-time</option>
//                 <option value="part-time">Part-time</option>
//                 <option value="remote">Remote</option>
//               </select>
//               <button type="submit" className="submit-btn">
//                 Add Job
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Job Listings Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Job Title</th>
//             <th>Location</th>
//             <th>Salary</th>
//             <th>Job Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((job) => (
//             <tr key={job.id}>
//               <td>{job.id}</td>
//               <td>{job.title}</td>
//               <td>{job.location}</td>
//               <td>{job.salary}</td>
//               <td>{job.type}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => alert(`Editing job with ID: ${job.id}`)}>
//                   Edit
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default ManageJobs;


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

  // Fetch jobs from an API or use mock data
  useEffect(() => {
    // Example of mock job data, replace with an API call in a real app
    const mockJobs = [
      { id: 1, title: 'Frontend Developer', company: 'ABC Corp', location: 'New York', status: 'Open' },
      { id: 2, title: 'Backend Developer', company: 'XYZ Inc', location: 'Remote', status: 'Closed' },
      { id: 3, title: 'UI/UX Designer', company: 'DesignPro', location: 'San Francisco', status: 'Open' },
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
                <option value="Pending">Pending</option>
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
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.status}</td>
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
