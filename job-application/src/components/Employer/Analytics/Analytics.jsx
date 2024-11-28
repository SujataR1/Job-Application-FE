// Analytics.js
import React from 'react';

const Analytics = ({ jobApplications, jobs }) => {
  const totalApplications = jobApplications.length;
  const totalInterviews = jobApplications.filter(app => app.status === 'Interview Scheduled').length;
  const totalShortlisted = jobApplications.filter(app => app.status === 'Shortlisted').length;
  
  const hiringProgress = {
    total: totalApplications,
    interviews: totalInterviews,
    shortlisted: totalShortlisted,
    notSelected: totalApplications - (totalInterviews + totalShortlisted)
  };

  return (
    <div>
      <h3>Application Analytics</h3>
      <div>
        <p><strong>Total Applications Received:</strong> {totalApplications}</p>
        <p><strong>Total Interviews Scheduled:</strong> {totalInterviews}</p>
        <p><strong>Total Shortlisted Candidates:</strong> {totalShortlisted}</p>
        <p><strong>Hiring Progress:</strong></p>
        <ul>
          <li>Shortlisted: {hiringProgress.shortlisted}</li>
          <li>Interview Scheduled: {hiringProgress.interviews}</li>
          <li>Not Selected: {hiringProgress.notSelected}</li>
        </ul>
      </div>
      
      <h3>Job Performance Metrics</h3>
      {jobs.map((job) => (
        <div key={job.id}>
          <h4>{job.title}</h4>
          <p>Applications: {jobApplications.filter(app => app.jobId === job.id).length}</p>
          {/* You can track metrics such as visibility, application rate, and quality metrics here */}
        </div>
      ))}
    </div>
  );
};

export default Analytics;
