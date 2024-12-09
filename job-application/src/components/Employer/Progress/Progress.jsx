import React, { useState } from 'react';
import './Progress.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const initialApplicants = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Shortlisted',
    domain: 'Software Development',
    interviewMode: 'Online',
    interviewDate: '2024-12-10',
    interviewTime: '10:00',
    interviewLink: 'https://meet.google.com/johndoe',
    interviewStatus: 'In Progress',
    designation: 'Software Developer',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Shortlisted',
    domain: 'Product Management',
    interviewMode: 'Physical',
    interviewDate: '2024-12-12',
    interviewTime: '14:00',
    interviewLink: '',
    interviewStatus: 'Scheduled',
    designation: 'Product Manager',
  },
  {
    id: 3,
    name: 'Emma Watson',
    status: 'Pending',
    domain: 'UI/UX Design',
    interviewMode: '',
    interviewDate: '',
    interviewTime: '',
    interviewLink: '',
    interviewStatus: '',
    designation: 'UI/UX Designer',
  },
  {
    id: 4,
    name: 'Chris Brown',
    status: 'Rejected',
    domain: 'Marketing',
    interviewMode: '',
    interviewDate: '',
    interviewTime: '',
    interviewLink: '',
    interviewStatus: '',
    designation: 'Marketing Executive',
  },
];

const HiringProcessPage = () => {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleSendOfferLetter = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Offer Sent' } : applicant
    );
    setApplicants(updatedApplicants);

    // Add the candidate to selected candidates list
    const selectedCandidate = applicants.find(applicant => applicant.id === id);
    setSelectedCandidates([...selectedCandidates, selectedCandidate]);
  };

  const handleRejectCandidate = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Rejected' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  return (
    <div className="network-page">
      <EmployerNavbar />
      <div className="network-content">
        <EmployerSidebar />
        <div className="hiring-process-page">
          <h1>Hiring Process</h1>

          {/* Shortlisted Candidates */}
          <div className="applicant-list">
            <h2>Shortlisted Candidates</h2>
            {applicants
              .filter((applicant) => applicant.status === 'Shortlisted')
              .map((applicant) => (
                <div className="applicant-card" key={applicant.id}>
                  <h3>{applicant.name}</h3>
                  <p>Status: {applicant.interviewStatus}</p>
                  <p>Domain: {applicant.domain}</p>

                  {/* Interview Details */}
                  <h4>Interview Details</h4>
                  <p>Mode: {applicant.interviewMode}</p>
                  <p>Date: {applicant.interviewDate}</p>
                  <p>Time: {applicant.interviewTime}</p>
                  {applicant.interviewMode === 'Online' ? (
                    <p>Link: {applicant.interviewLink}</p>
                  ) : (
                    <p>Location: Office Address</p>
                  )}

                  {/* Send Offer Letter and Reject Buttons */}
                  {applicant.interviewStatus === 'In Progress' && (
                    <div>
                      <button onClick={() => handleSendOfferLetter(applicant.id)}>
                        Send Offer Letter
                      </button> <br></br>
                      <button onClick={() => handleRejectCandidate(applicant.id)}>
                        Reject Candidate
                      </button>
                    </div>
                  )}
                  {applicant.interviewStatus === 'Scheduled' && (
                    <div>
                      <button onClick={() => handleSendOfferLetter(applicant.id)}>
                        Send Offer Letter
                      </button> <br></br>
                      <button onClick={() => handleRejectCandidate(applicant.id)}>
                        Reject Candidate
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Pending Interviews Section */}
          <div className="applicant-list">
            <h2>Pending Interviews</h2>
            {applicants
              .filter((applicant) => applicant.status === 'Pending')
              .map((applicant) => (
                <div className="applicant-card" key={applicant.id}>
                  <h3>{applicant.name}</h3>
                  <p>Status: Pending</p>
                  <p>Domain: {applicant.domain}</p>
                </div>
              ))}
          </div>

          {/* Rejected Candidates Section */}
          <div className="applicant-list">
            <h2>Rejected Candidates</h2>
            {applicants
              .filter((applicant) => applicant.status === 'Rejected')
              .map((applicant) => (
                <div className="applicant-card" key={applicant.id}>
                  <h3>{applicant.name}</h3>
                  <p>Status: Rejected</p>
                  <p>Domain: {applicant.domain}</p>
                </div>
              ))}
          </div>

          {/* Table for Displaying Selected Candidates */}
          <h2>Selected Candidates for Offer</h2>
          {selectedCandidates.length > 0 ? (
            <table className="selected-candidates-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {selectedCandidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No selected candidates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiringProcessPage;
