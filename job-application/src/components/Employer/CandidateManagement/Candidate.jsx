import React, { useState, useEffect } from 'react';
import './Candidate.css';  // Importing the CSS file

// Dummy data for applicants
const applicantsData = [
  {
    id: 1,
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    status: 'Applied',
    coverLetter: 'A passionate software developer with expertise in React.',
    resume: 'resume_johndoe.pdf',
  },
  {
    id: 2,
    name: 'Jane Smith',
    jobTitle: 'Software Engineer',
    status: 'Applied',
    coverLetter: '5 years of experience in full-stack development.',
    resume: 'resume_janesmith.pdf',
  },
  {
    id: 3,
    name: 'Mark Lee',
    jobTitle: 'Software Engineer',
    status: 'Applied',
    coverLetter: 'Strong background in machine learning and AI.',
    resume: 'resume_marklee.pdf',
  },
];

const JobApplicantAndCandidateManagement = () => {
  const [jobApplications, setJobApplications] = useState([]);

  // Use effect to initialize state from applicantsData
  useEffect(() => {
    setJobApplications(applicantsData);
  }, []);

  // Shortlist the applicant
  const handleShortlist = (applicantId) => {
    setJobApplications((prevState) =>
      prevState.map((app) =>
        app.id === applicantId ? { ...app, status: 'Shortlisted' } : app
      )
    );
  };

  // Reject the applicant
  const handleReject = (applicantId) => {
    setJobApplications((prevState) =>
      prevState.map((app) =>
        app.id === applicantId ? { ...app, status: 'Rejected' } : app
      )
    );
  };

  return (
    <div className="candidate-management">
      <h2 className="header">Job Applications</h2>

      {jobApplications.length === 0 ? (
        <p className="no-applications">No applications yet.</p>
      ) : (
        <div className="applications-container">
          {jobApplications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="applicant-info">
                <h3 className="applicant-name">{application.name}</h3>
                <p><strong>Job Title:</strong> {application.jobTitle}</p>
                <p><strong>Status:</strong> {application.status}</p>
                <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                <div className="resume">
                  <a href={`/${application.resume}`} download>
                    <button className="download-resume-button">Download Resume</button>
                  </a>
                </div>
              </div>

              <div className="action-buttons">
                {application.status !== 'Shortlisted' && application.status !== 'Rejected' && (
                  <>
                    <button className="shortlist-button" onClick={() => handleShortlist(application.id)}>
                      Shortlist
                    </button>
                    <button className="reject-button" onClick={() => handleReject(application.id)}>
                      Reject
                    </button>
                  </>
                )}
                {application.status === 'Shortlisted' && (
                  <span className="status-indicator shortlisted">Shortlisted</span>
                )}
                {application.status === 'Rejected' && (
                  <span className="status-indicator rejected">Rejected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplicantAndCandidateManagement;
