import React, { useState } from 'react';
import './Progress.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const initialApplicants = [
  { id: 1, name: 'John Doe', status: 'Applied', domain: 'Software Development', interviewMode: '', interviewStatus: 'Pending', appliedOn: '2024-12-01', interviewDate: '', interviewTime: '', interviewLink: '', interviewAddress: '' },
  { id: 2, name: 'Jane Smith', status: 'Applied', domain: 'Product Management', interviewMode: '', interviewStatus: 'Pending', appliedOn: '2024-12-02', interviewDate: '', interviewTime: '', interviewLink: '', interviewAddress: '' },
  { id: 3, name: 'Emma Watson', status: 'Applied', domain: 'UI/UX Design', interviewMode: '', interviewStatus: 'Pending', appliedOn: '2024-12-03', interviewDate: '', interviewTime: '', interviewLink: '', interviewAddress: '' },
];

const HiringProcessPage = () => {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [interviewMode, setInterviewMode] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLink, setInterviewLink] = useState('');
  const [interviewAddress, setInterviewAddress] = useState('');
  const [isOfferSent, setIsOfferSent] = useState(false);
  const [joiningDate, setJoiningDate] = useState('');

  const handleShortlist = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Shortlisted' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  const handleReject = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Rejected' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  const handleInterviewSchedule = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id
        ? { ...applicant, interviewMode, interviewStatus: 'Scheduled', interviewDate, interviewTime, interviewLink, interviewAddress }
        : applicant
    );
    setApplicants(updatedApplicants);
    setSelectedApplicant(null);
  };

  const handleInterviewComplete = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id
        ? { ...applicant, interviewStatus: 'Completed' }
        : applicant
    );
    setApplicants(updatedApplicants);
  };

  const handleOfferSend = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Offer Sent' } : applicant
    );
    setApplicants(updatedApplicants);
    setIsOfferSent(true);
  };

  const handleJoiningLetter = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Joined', joiningDate } : applicant
    );
    setApplicants(updatedApplicants);
  };

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />
    <div className="hiring-process-page">
      <h1>Hiring Process</h1>
      <div className="applicant-list">
        {applicants.map((applicant) => (
          <div className="applicant-card" key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>Status: {applicant.status}</p>
            <p>Applied On: {applicant.appliedOn}</p>
            <p>Domain: {applicant.domain}</p>

            {/* If interview already scheduled, show interview details */}
            {applicant.interviewStatus === 'Scheduled' && (
              <div>
                <p>Interview Mode: {applicant.interviewMode}</p>
                <p>Interview Date: {applicant.interviewDate}</p>
                <p>Interview Time: {applicant.interviewTime}</p>
                {applicant.interviewMode === 'Online' && <p>Interview Link: {applicant.interviewLink}</p>}
                {applicant.interviewMode === 'Physical' && <p>Interview Address: {applicant.interviewAddress}</p>}
              </div>
            )}

            {/* If interview is pending */}
            {applicant.status === 'Applied' && (
              <div>
                <button onClick={() => handleShortlist(applicant.id)}>Shortlist</button>
                <button onClick={() => handleReject(applicant.id)}>Reject</button>
              </div>
            )}

            {/* If shortlisted */}
            {applicant.status === 'Shortlisted' && applicant.interviewStatus !== 'Scheduled' && (
              <div>
                <button onClick={() => setSelectedApplicant(applicant)}>Schedule Interview</button>
              </div>
            )}

            {/* If interview is completed */}
            {applicant.interviewStatus === 'Completed' && (
              <div>
                <button onClick={() => handleOfferSend(applicant.id)}>Send Offer Letter</button>
                {isOfferSent && <button onClick={() => handleJoiningLetter(applicant.id)}>Send Joining Letter</button>}
              </div>
            )}

            {/* Interview Schedule Form */}
            {selectedApplicant && selectedApplicant.id === applicant.id && (
              <div className="interview-schedule-form">
                <h4>Schedule Interview for {selectedApplicant.name}</h4>
                <label>Interview Mode</label>
                <select onChange={(e) => setInterviewMode(e.target.value)} value={interviewMode}>
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                </select>
                <label>Interview Date</label>
                <input type="date" onChange={(e) => setInterviewDate(e.target.value)} value={interviewDate} />
                <label>Interview Time</label>
                <input type="time" onChange={(e) => setInterviewTime(e.target.value)} value={interviewTime} />
                {interviewMode === 'Online' && (
                  <>
                    <label>Interview Link</label>
                    <input type="url" onChange={(e) => setInterviewLink(e.target.value)} value={interviewLink} />
                  </>
                )}
                {interviewMode === 'Physical' && (
                  <>
                    <label>Interview Address</label>
                    <input type="text" onChange={(e) => setInterviewAddress(e.target.value)} value={interviewAddress} />
                  </>
                )}
                <button onClick={() => handleInterviewSchedule(applicant.id)}>Schedule Interview</button>
              </div>
            )}

            {/* Offer Letter Form */}
            {applicant.status === 'Offer Sent' && (
              <div className="joining-letter-form">
                <label>Joining Date</label>
                <input type="date" onChange={(e) => setJoiningDate(e.target.value)} value={joiningDate} />
                <button onClick={() => handleJoiningLetter(applicant.id)}>Send Joining Letter</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default HiringProcessPage;
