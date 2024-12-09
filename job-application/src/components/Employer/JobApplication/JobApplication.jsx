
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobApplication.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

// Dummy Data for job and applicants
const initialJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators',
    description: 'Join our team of innovators working on cutting-edge projects.',
    salary: '₹50,000 - ₹70,000',
    location: 'New York, NY',
    employmentType: 'Full-time',
    status: 'active',
    totalApplications: 3,
    applicants: [
      { id: 1, name: 'John Doe', status: 'Applied' },
      { id: 2, name: 'Jane Smith', status: 'Shortlisted' },
      { id: 3, name: 'Emma Watson', status: 'Rejected' },
    ],
    postedDate: new Date() - 5 * 60 * 60 * 1000, // 5 hours ago
    deadline: new Date() + 7 * 24 * 60 * 60 * 1000, // 1 week later
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovative Solutions',
    description: 'Lead product strategy for an exciting new product.',
    salary: '₹70,000 - ₹90,000',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    status: 'active',
    totalApplications: 3,
    applicants: [
      { id: 4, name: 'Mark Lee', status: 'Applied' },
      { id: 5, name: 'Sally Green', status: 'Shortlisted' },
    ],
    postedDate: new Date() - 30 * 60 * 60 * 1000, // 30 hours ago
    deadline: new Date() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
];

const JobApplicationPage = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [showEditJobPopup, setShowEditJobPopup] = useState(false);
  const [showApplicantPopup, setShowApplicantPopup] = useState(false);
  const [showCloseJobPopup, setShowCloseJobPopup] = useState(false);

  const navigate = useNavigate();

  // Function to calculate time passed since job posting
  const timeAgo = (postedDate) => {
    const now = new Date();
    const diff = now - new Date(postedDate); // Difference in milliseconds
    const hours = Math.floor(diff / (1000 * 60 * 60)); // Calculate hours
    const days = Math.floor(hours / 24); // Calculate days
    return hours < 24 ? `${hours} hours ago` : `${days} days ago`;
  };

  // Function to format the deadline in a readable format
  const formatDeadline = (deadlineDate) => {
    const date = new Date(deadlineDate);
    return date.toLocaleDateString();
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/job-analytics/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    const jobToEdit = jobs.find((job) => job.id === jobId);
    if (jobToEdit) {
      setEditedJob({ ...jobToEdit });
      setSelectedJobId(jobId);
      setShowEditJobPopup(true);
    }
  };

  const handleSaveJob = () => {
    const updatedJobs = jobs.map((job) =>
      job.id === selectedJobId ? { ...job, ...editedJob } : job
    );
    setJobs(updatedJobs);  // Update the state with the new job data
    alert('Job has been updated.');
    setShowEditJobPopup(false);
  };

  // Close the popups
  const handleClosePopup = () => {
    setShowApplicantPopup(false);
    setShowCloseJobPopup(false);
    setShowEditJobPopup(false);
  };

  // Mark Job as Closed
  const handleCloseJob = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: 'closed' } : job
    );
    setJobs(updatedJobs);
    alert('Job has been closed.');
    setShowCloseJobPopup(false);
  };

  return (
    <div className="home-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="job-application-page" style={{ width: '80%' }}>
          <h1>My Job Postings</h1>
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Employment Type:</strong> {job.employmentType}</p>
              <p><strong>Status:</strong> {job.status === 'active' ? 'Active' : 'Closed'}</p>
              <p><strong>Posted:</strong> {timeAgo(job.postedDate)}</p>
              <p><strong>Deadline:</strong> {formatDeadline(job.deadline)}</p>
              <div className="job-actions">
                {job.status === 'active' && (
                  <>
                   <button 
  onClick={() => handleViewApplicants(job.id)} 
  className="action-button"
  style={{
    backgroundColor: '#2196f3', // Blue for View Applicants
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    transition: 'background-color 0.3s ease', 
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'} // Darker blue on hover
  onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'} // Reset to blue when mouse leaves
>
  View Applicants
</button>

<button 
  onClick={() => handleEditJob(job.id)} 
  className="action-button"
  style={{
    backgroundColor: '#ff9800', // Orange for Edit Job
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    transition: 'background-color 0.3s ease', 
    marginLeft: '10px', // Gap between buttons
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#fb8c00'} // Darker orange on hover
  onMouseOut={(e) => e.target.style.backgroundColor = '#ff9800'} // Reset to orange when mouse leaves
>
  Edit Job
</button>

<button 
  onClick={() => handleCloseJob(job.id)} 
  className="action-button"
  style={{
    backgroundColor: '#f44336', // Red for Close Job
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    transition: 'background-color 0.3s ease', 
    marginLeft: '10px', // Gap between buttons
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'} // Darker red on hover
  onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'} // Reset to red when mouse leaves
>
  Close Job
</button>

                  </>
                )}
              </div>
            </div>
          ))}

          {/* Edit Job Popup */}
          {showEditJobPopup && editedJob && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Edit Job: {editedJob.title}</h3>
                {/* Job Title Fixed */}
                <label>Job Title</label>
                <input
                  type="text"
                  value={editedJob.title}
                  readOnly
                />
                <label>Salary</label>
                <input
                  type="text"
                  value={editedJob.salary}
                  onChange={(e) => setEditedJob({ ...editedJob, salary: e.target.value })}
                />
                <label>Location</label>
                <input
                  type="text"
                  value={editedJob.location}
                  onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
                />
                <label>Employment Type</label>
                <select
                  value={editedJob.employmentType}
                  onChange={(e) => setEditedJob({ ...editedJob, employmentType: e.target.value })}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <label>Deadline</label>
                <input
                  type="date"
                  value={new Date(editedJob.deadline).toLocaleDateString('en-CA')}
                  onChange={(e) => setEditedJob({ ...editedJob, deadline: new Date(e.target.value).getTime() })}
                />
               <button 
  onClick={handleSaveJob} 
  className="action-button"
  style={{
    backgroundColor: '#4caf50', // Green for Save
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    transition: 'background-color 0.3s ease', 
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
  onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'} // Reset to green when mouse leaves
>
  Save Changes
</button>

<button 
  onClick={handleClosePopup} 
  className="cancel-button"
  style={{
    backgroundColor: '#f44336', // Red for Cancel
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '14px', 
    transition: 'background-color 0.3s ease', 
    marginLeft: '15px', // Add space between the buttons
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'} // Darker red on hover
  onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'} // Reset to red when mouse leaves
>
  Cancel
</button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
