import React, { useState } from 'react';
import './MyApplication.css';  // Import the CSS file

// Dummy Data for jobs
const initialJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators',
    location: 'New York, NY',
    salary: '₹50,000 - ₹70,000',
    status: 'Shortlisted',
    appliedOn: '2024-12-01',
    resumeDownloaded: true,
    shortlisted: true,
    rejected: false,
    emailSent: true,
    assessmentSent: true,
    interviewScheduled: true,
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovative Solutions',
    location: 'San Francisco, CA',
    salary: '₹70,000 - ₹90,000',
    status: 'Rejected',
    appliedOn: '2024-11-25',
    resumeDownloaded: false,
    shortlisted: false,
    rejected: true,
    emailSent: false,
    assessmentSent: false,
    interviewScheduled: false,
  },
];

const MyApplicationPage = () => {
  const [jobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle showing job details in modal
  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true); // Open the modal when a job is selected
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h1>My Applications</h1>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>

          {/* View Job Details Button */}
          <div className="job-actions">

           <button onClick={() => handleViewJobDetails(job)}>
            View Job Details
          </button>
        </div> 
        </div>
      ))}

      {/* Modal for showing job details */}
      {isModalOpen && selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Job Details</h2>
            <p><strong>Status:</strong> 
              <span className={`status ${selectedJob.status.toLowerCase()}`}>{selectedJob.status}</span>
            </p>
            <p><strong>Applied On:</strong> {selectedJob.appliedOn}</p>
            <p><strong>Resume Downloaded:</strong> {selectedJob.resumeDownloaded ? 'Yes' : 'No'}</p>

            {/* Conditionally render details based on the status */}
            {selectedJob.status === 'Shortlisted' && (
              <>
                <p><strong>Email Sent:</strong> {selectedJob.emailSent ? 'Yes' : 'No'}</p>
                <p><strong>Assessment Sent:</strong> {selectedJob.assessmentSent ? 'Yes' : 'No'}</p>
                {selectedJob.assessmentSent && (
                  <p><strong>Interview Scheduled:</strong> {selectedJob.interviewScheduled ? 'Yes' : 'No'}</p>
                )}
              </>
            )}

            {selectedJob.status === 'Rejected' }

            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplicationPage;
