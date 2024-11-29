import React from 'react';
import './Analytics.css'; 
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar'; // Importing the CSS file for styling

const Analytics = () => {
  // Dummy job applications data
  const jobApplications = [
    { jobId: 1, status: 'Interview Scheduled' },
    { jobId: 1, status: 'Shortlisted' },
    { jobId: 2, status: 'Not Selected' },
    { jobId: 2, status: 'Shortlisted' },
    { jobId: 3, status: 'Interview Scheduled' },
  ];

  // Dummy jobs data
  const jobs = [
    { id: 1, title: 'Software Engineer' },
    { id: 2, title: 'Product Manager' },
    { id: 3, title: 'Data Analyst' },
  ];

  // Calculate total applications and other metrics
  const totalApplications = jobApplications.length;
  const totalInterviews = jobApplications.filter(app => app.status === 'Interview Scheduled').length;
  const totalShortlisted = jobApplications.filter(app => app.status === 'Shortlisted').length;

  const hiringProgress = {
    total: totalApplications,
    interviews: totalInterviews,
    shortlisted: totalShortlisted,
    notSelected: totalApplications - (totalInterviews + totalShortlisted),
  };

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />

    <div className="analytics-container">
      <h2 className="analytics-header">Company Analytics Dashboard</h2>
      
      <div className="analytics-summary">
        <div className="analytics-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>
        
        <div className="analytics-card">
          <h3>Interviews Scheduled</h3>
          <p>{totalInterviews}</p>
        </div>

        <div className="analytics-card">
          <h3>Shortlisted Candidates</h3>
          <p>{totalShortlisted}</p>
        </div>

        <div className="analytics-card">
          <h3>Not Selected</h3>
          <p>{hiringProgress.notSelected}</p>
        </div>
      </div>

      <div className="hiring-progress">
        <h3>Hiring Progress</h3>
        <div className="progress-bar">
          <div className="progress progress-shortlisted" style={{ width: `${(hiringProgress.shortlisted / totalApplications) * 100}%` }}>
            Shortlisted: {hiringProgress.shortlisted}
          </div>
          <div className="progress progress-interviews" style={{ width: `${(hiringProgress.interviews / totalApplications) * 100}%` }}>
            Interviews: {hiringProgress.interviews}
          </div>
          <div className="progress progress-not-selected" style={{ width: `${(hiringProgress.notSelected / totalApplications) * 100}%` }}>
            Not Selected: {hiringProgress.notSelected}
          </div>
        </div>
      </div>

      <h3>Job Performance Metrics</h3>
      <div className="job-performance">
        {jobs.map((job) => (
          <div key={job.id} className="job-performance-card">
            <h4>{job.title}</h4>
            <p>Applications: {jobApplications.filter(app => app.jobId === job.id).length}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Analytics;
