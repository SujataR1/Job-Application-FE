import React, { useState } from 'react';
import './Progress.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
const jobData = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators',
    applicants: [
      { id: 1, name: 'John Doe', status: 'Shortlisted', assessmentSent: false },
      { id: 2, name: 'Jane Smith', status: 'In Progress', assessmentSent: true },
      { id: 3, name: 'Mark Lee', status: 'Applied', assessmentSent: false },
    ],
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovative Solutions',
    applicants: [
      { id: 4, name: 'Lucas Harris', status: 'In Progress', assessmentSent: false },
      { id: 5, name: 'Emma Watson', status: 'Shortlisted', assessmentSent: true },
      { id: 6, name: 'Mia Black', status: 'Applied', assessmentSent: false },
    ],
  },
];

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState(jobData[0]);
  const [assessmentSentCount, setAssessmentSentCount] = useState(0);
  const [shortlistedCount, setShortlistedCount] = useState(0);
  const [interviewScheduledCount, setInterviewScheduledCount] = useState(0);
  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [candidateForInterview, setCandidateForInterview] = useState(null);

  const handleAssessmentSend = (candidateId) => {
    const updatedApplicants = selectedJob.applicants.map((applicant) =>
      applicant.id === candidateId
        ? { ...applicant, assessmentSent: true }
        : applicant
    );
    setSelectedJob({ ...selectedJob, applicants: updatedApplicants });
    setAssessmentSentCount(assessmentSentCount + 1);
  };

  const handleShortlist = (candidateId) => {
    const updatedApplicants = selectedJob.applicants.map((applicant) =>
      applicant.id === candidateId
        ? { ...applicant, status: 'Shortlisted' }
        : applicant
    );
    setSelectedJob({ ...selectedJob, applicants: updatedApplicants });
    setShortlistedCount(shortlistedCount + 1);
  };

  const handleScheduleInterview = () => {
    // Example to simulate scheduling an interview
    setInterviewScheduledCount(interviewScheduledCount + 1);
    setShowInterviewPopup(false);
  };

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />
    <div className="job-page">
      <h1>Job Analytics for {selectedJob.title}</h1>

      <div className="status-summary">
        <div>
          <strong>Assessments Sent: </strong>{assessmentSentCount}
        </div>
        <div>
          <strong>Shortlisted Candidates: </strong>{shortlistedCount}
        </div>
        <div>
          <strong>Interview Scheduled: </strong>{interviewScheduledCount}
        </div>
      </div>

      <div className="job-details">
        <h2>Applicants for {selectedJob.title}</h2>

        <div className="applicant-list">
          {selectedJob.applicants.map((applicant) => (
            <div key={applicant.id} className="applicant-card">
              <h3>{applicant.name}</h3>
              <p>Status: {applicant.status}</p>
              <p>Assessment Sent: {applicant.assessmentSent ? 'Yes' : 'No'}</p>

              {/* Action buttons */}
              {applicant.status === 'In Progress' && !applicant.assessmentSent && (
                <button onClick={() => handleAssessmentSend(applicant.id)}>Send Assessment</button>
              )}
              {applicant.status !== 'Shortlisted' && (
                <button onClick={() => handleShortlist(applicant.id)}>Shortlist</button>
              )}
              {applicant.status === 'Shortlisted' && !applicant.assessmentSent && (
                <button
                  onClick={() => {
                    setCandidateForInterview(applicant.name);
                    setShowInterviewPopup(true);
                  }}
                >
                  Schedule Interview
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interview Scheduling Popup */}
      {showInterviewPopup && (
        <div className="popup">
          <h3>Schedule Interview for {candidateForInterview}</h3>
          <label>Interview Date:</label>
          <input type="date" className="input-field" />
          <label>Interview Time:</label>
          <input type="time" className="input-field" />
          <button onClick={handleScheduleInterview}>Schedule Interview</button>
          <button onClick={() => setShowInterviewPopup(false)}>Close</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default JobPage;
