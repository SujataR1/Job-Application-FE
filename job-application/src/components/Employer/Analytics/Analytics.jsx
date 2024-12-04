import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Analytics.css';
import EmployerNavbar from '../Navbar/Navbar';
 import EmployerSidebar from '../Sidebar/Sidebar';


// Dummy Data for job and applicants
const initialJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators',
    applicants: [
      { id: 1, name: 'John Doe', resume: 'resume_link1', status: 'Applied', appliedOn: '2024-12-01' },
      { id: 2, name: 'Jane Smith', resume: 'resume_link2', status: 'Applied', appliedOn: '2024-12-02' },
      { id: 3, name: 'Emma Watson', resume: 'resume_link3', status: 'Applied', appliedOn: '2024-12-03' },
    ],
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovative Solutions',
    applicants: [
      { id: 4, name: 'Mark Lee', resume: 'resume_link4', status: 'Applied', appliedOn: '2024-12-01' },
      { id: 5, name: 'Sally Green', resume: 'resume_link5', status: 'Applied', appliedOn: '2024-12-02' },
    ],
  },
];

const JobAnalyticsPage = () => {
  const { jobId } = useParams();
  const job = initialJobs.find((job) => job.id === parseInt(jobId));

  const [applicants, setApplicants] = useState(job ? job.applicants : []);
  const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  // Interview related state variables
  const [interviewType, setInterviewType] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [address, setAddress] = useState('');

  const handleShortlist = (applicantId) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === applicantId ? { ...applicant, status: 'Shortlisted' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  const handleReject = (applicantId) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === applicantId ? { ...applicant, status: 'Rejected' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  const handleAssessment = (applicantId) => {
    setSelectedApplicant(applicants.find((applicant) => applicant.id === applicantId));
    setShowAssessmentPopup(true);
  };

  const handleInterview = (applicantId) => {
    setSelectedApplicant(applicants.find((applicant) => applicant.id === applicantId));
    setShowInterviewPopup(true);
  };

  const handleAssessmentSend = () => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === selectedApplicant.id ? { ...applicant, status: 'In Progress' } : applicant
    );
    setApplicants(updatedApplicants);
    setShowAssessmentPopup(false);
  };

  const handleInterviewSend = () => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === selectedApplicant.id ? { ...applicant, status: 'In Progress' } : applicant
    );
    setApplicants(updatedApplicants);
    setShowInterviewPopup(false);
  };

  // Cancel button logic to close the popups
  const handleCancel = () => {
    // Reset form fields for interview
    setInterviewType('');
    setMeetingLink('');
    setAddress('');

    // Close both popups
    setShowAssessmentPopup(false);
    setShowInterviewPopup(false);
  };

  // Calculating statistics
  const shortlistedCount = applicants.filter((applicant) => applicant.status === 'Shortlisted').length;
  const rejectedCount = applicants.filter((applicant) => applicant.status === 'Rejected').length;
  const inProgressCount = applicants.filter((applicant) => applicant.status === 'In Progress').length;

  return (
    <div className="home-page">
    <EmployerNavbar />
     <div className="home-content flex flex-row">
       <EmployerSidebar />
    <div className="job-analytics-page">
      <h1>Applicants Analytics for {job?.title}</h1>

      {/* Displaying the statistics */}
      <div className="statistics">
        <div className="stat-item">
          <h4>Shortlisted: {shortlistedCount}</h4>
        </div>
        <div className="stat-item">
          <h4>Rejected: {rejectedCount}</h4>
        </div>
        <div className="stat-item">
          <h4>In Progress: {inProgressCount}</h4>
        </div>
      </div>

      {/* Applicant List */}
      <ul className="applicant-list">
        {applicants.map((applicant) => (
          <li key={applicant.id} className="applicant-item">
            <h4>{applicant.name}</h4>
            <p>Status: {applicant.status}</p>
            <p>Applied On: {applicant.appliedOn}</p>
            <a href={applicant.resume} download>Download Resume</a>
            <div>
              <button className="shortlist" style={{ marginRight: '10px' }} onClick={() => handleShortlist(applicant.id)}>Shortlist</button>
              <button className="reject" onClick={() => handleReject(applicant.id)}>Reject</button>
            </div>
            {applicant.status === 'Shortlisted' && (
              <div>
                <button className="assessment" onClick={() => handleAssessment(applicant.id)}>Custom Assessment</button>
                <button className="interview" onClick={() => handleInterview(applicant.id)}>Schedule Interview</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Custom Assessment Popup */}
      {showAssessmentPopup && (
        <div className="popup assessment-popup">
          <div className="popup-content">
            <h3>Custom Assessment for {selectedApplicant.name}</h3>
            <label>Assessment Type</label>
            <input type="text" placeholder="Enter assessment type" />
            <label>Deadline</label>
            <input type="date" />
            <div className="popup-buttons">
              <button className="send" onClick={handleAssessmentSend}>Send</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Popup */}
      {showInterviewPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Schedule Interview for {selectedApplicant.name}</h3>
            <label>Interview Type</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="">Select Interview Type</option>
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </select>
            <label>Date & Time</label>
            <input type="datetime-local" />
            <label>Note</label>
            <input type="text" placeholder="Enter any notes" />
            {interviewType === 'Online' && (
              <>
                <label>Meeting Link</label>
                <input
                  type="text"
                  placeholder="Enter meeting link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              </>
            )}
            {interviewType === 'Physical' && (
              <>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </>
            )}
            <div className="popup-buttons">
              <button className="send" onClick={handleInterviewSend}>Schedule Interview</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default JobAnalyticsPage;
