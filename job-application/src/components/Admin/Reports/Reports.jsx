import React, { useState } from 'react';
import './Reports.css'; // Import the CSS styles
import AdminNavbar from '../Navbar/Navbar';  // Admin Navbar
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';  // Admin Sidebar

// Dummy data for Applicants
const applicantsData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', jobApplied: 'Software Developer', status: 'Interview Scheduled' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', jobApplied: 'UI/UX Designer', status: 'Application Received' },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', jobApplied: 'Frontend Developer', status: 'Rejected' },
  { id: 4, name: 'Emily White', email: 'emily@example.com', jobApplied: 'Backend Developer', status: 'Interview Scheduled' },
];

// Dummy data for Recruiters
const recruitersData = [
  { id: 1, name: 'TechCorp', jobPosted: 'Software Developer', applicants: 50, payment: 200 },
  { id: 2, name: 'InnovateX', jobPosted: 'UI/UX Designer', applicants: 20, payment: 150 },
  { id: 3, name: 'DevStudio', jobPosted: 'Frontend Developer', applicants: 35, payment: 180 },
  { id: 4, name: 'CreativeJobs', jobPosted: 'Backend Developer', applicants: 25, payment: 175 },
];

const AdminReports = () => {
  const [activeReport, setActiveReport] = useState('applicants');  // Track which report to show

  // Calculate total payment the admin will receive based on job posts
  const totalPayment = recruitersData.reduce((acc, recruiter) => acc + recruiter.payment, 0);

  // Calculate total applicants and recruiters
  const totalApplicants = applicantsData.length;
  const totalRecruiters = recruitersData.length;
  const totalJobPostings = recruitersData.reduce((acc, recruiter) => acc + 1, 0);

  // Growth Metrics (Dummy Example)
  const previousMonthApplicants = 120; // Placeholder value for the previous month
  const applicantsGrowth = ((totalApplicants - previousMonthApplicants) / previousMonthApplicants) * 100;

  const previousMonthRecruiters = 10; // Placeholder value for the previous month
  const recruitersGrowth = ((totalRecruiters - previousMonthRecruiters) / previousMonthRecruiters) * 100;

  return (
    <div className="admin-reports">
      <AdminNavbar />
      <div className="dashboard-content">
        <AdminSidenavbar />
        <div className="reports-content">
          <h1>Admin Reports</h1>
          
          {/* Navigation Buttons to switch between Reports */}
          <div className="report-nav">
            <button
              className={activeReport === 'applicants' ? 'active' : ''}
              onClick={() => setActiveReport('applicants')}
            >
              Applicants Report
            </button>
            <button
              className={activeReport === 'recruiters' ? 'active' : ''}
              onClick={() => setActiveReport('recruiters')}
            >
              Recruiters Report
            </button>
          </div>

          {/* Show different reports based on selection */}
          {activeReport === 'applicants' ? <ApplicantsReport /> : <RecruitersReport />}
          
          {/* Display Admin Earnings for Recruiters Job Post */}
          <div className="admin-earnings">
            <h2>Total Earnings for Admin</h2>
            <p>The total payment the admin has received from recruiters for job posts: <strong>${totalPayment}</strong></p>
          </div>

          {/* Admin Growth Metrics */}
          <div className="growth-metrics">
            <h2>Website Growth</h2>
            <p><strong>Total Applicants:</strong> {totalApplicants}</p>
            <p><strong>Total Recruiters:</strong> {totalRecruiters}</p>
            <p><strong>Total Job Postings:</strong> {totalJobPostings}</p>
            <p><strong>Applicants Growth (Monthly):</strong> {applicantsGrowth.toFixed(2)}%</p>
            <p><strong>Recruiters Growth (Monthly):</strong> {recruitersGrowth.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Applicants Report Component
const ApplicantsReport = () => {
  return (
    <div className="report-table">
      <h2>Applicants Report</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applicantsData.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.jobApplied}</td>
              <td>{applicant.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Recruiters Report Component
const RecruitersReport = () => {
  return (
    <div className="report-table">
      <h2>Recruiters Report</h2>
      <table>
        <thead>
          <tr>
            <th>Recruiter Name</th>
            <th>Job Posted</th>
            <th>Applicants</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {recruitersData.map((recruiter) => (
            <tr key={recruiter.id}>
              <td>{recruiter.name}</td>
              <td>{recruiter.jobPosted}</td>
              <td>{recruiter.applicants}</td>
              <td>${recruiter.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="revenue-summary">
        <h3>Total Revenue from Recruiters' Job Posts</h3>
        <p>${recruitersData.reduce((acc, recruiter) => acc + recruiter.payment, 0)}</p>
      </div>
    </div>
  );
};

export default AdminReports;
