import React, { useState } from 'react';

// Static Data for Applications (to simulate real data)
const applications = [
  { id: 1, name: 'John Doe', jobTitle: 'Software Engineer', status: 'Interview Scheduled', resume: 'resume_johndoe.pdf' },
  { id: 2, name: 'Jane Smith', jobTitle: 'Software Engineer', status: 'Applied', resume: 'resume_janesmith.pdf' },
  { id: 3, name: 'Mark Lee', jobTitle: 'Software Engineer', status: 'Applied', resume: 'resume_marklee.pdf' },
  { id: 4, name: 'Emily Davis', jobTitle: 'Software Engineer', status: 'Applied', resume: 'resume_emilydavis.pdf' },
];

const Interview = () => {
  const [interviewScheduled, setInterviewScheduled] = useState({}); // Track which applicants have scheduled interviews
  const [dateInput, setDateInput] = useState(''); // Track the selected interview date
  
  const handleScheduleInterview = (applicantId) => {
    if (!dateInput) {
      alert('Please select a date for the interview');
      return;
    }
    
    // Update state to mark the interview as scheduled
    setInterviewScheduled(prevState => ({
      ...prevState,
      [applicantId]: dateInput,
    }));
    
    // Clear the date input after scheduling
    setDateInput('');

    alert(`Interview scheduled for ${applications.find(app => app.id === applicantId).name} on ${dateInput}`);
    // Here you can also call your API to persist this data
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
     
      <div>
        <h2>Job Applications</h2>
        <div>
          {applications.map((application) => (
            <div
              key={application.id}
              style={{
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{application.name} - {application.jobTitle}</h3>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Resume:</strong> <a href={`/${application.resume}`} download style={{ color: '#007bff' }}>Download Resume</a></p>

              {application.status === 'Applied' && !interviewScheduled[application.id] && (
                <div>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Disallow past dates
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    style={{
                      padding: '8px',
                      width: '200px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginRight: '10px',
                    }}
                  />
                  <button
                    onClick={() => handleScheduleInterview(application.id)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Schedule Interview
                  </button>
                </div>
              )}

              {interviewScheduled[application.id] && (
                <p style={{ color: 'green' }}>
                  Interview Scheduled for {application.name} on {interviewScheduled[application.id]}.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
