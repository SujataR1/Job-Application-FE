import React, { useState } from 'react';
import './Reports.css';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';
import { Bar, Pie } from 'react-chartjs-2'; // For charts
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'; // Chart.js components
import { saveAs } from 'file-saver';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

// Dummy Data
const applicantsData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', jobApplied: 'Software Developer', status: 'Interview Scheduled' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', jobApplied: 'UI/UX Designer', status: 'Application Received' },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', jobApplied: 'Frontend Developer', status: 'Rejected' },
  { id: 4, name: 'Emily White', email: 'emily@example.com', jobApplied: 'Backend Developer', status: 'Interview Scheduled' },
];

const recruitersData = [
  { id: 1, name: 'TechCorp', jobPosted: 'Software Developer', applicants: 50, payment: 200 },
  { id: 2, name: 'InnovateX', jobPosted: 'UI/UX Designer', applicants: 20, payment: 150 },
  { id: 3, name: 'DevStudio', jobPosted: 'Frontend Developer', applicants: 35, payment: 180 },
  { id: 4, name: 'CreativeJobs', jobPosted: 'Backend Developer', applicants: 25, payment: 175 },
];

const AdminReports = () => {
  const [activeReport, setActiveReport] = useState('applicants');
  const [timeRange, setTimeRange] = useState('Last 30 Days'); // Added for filter options

  // Calculate data for charts
  const applicantsByStatus = applicantsData.reduce((acc, applicant) => {
    acc[applicant.status] = (acc[applicant.status] || 0) + 1;
    return acc;
  }, {});

  const jobStatuses = Object.keys(applicantsByStatus);
  const statusCounts = Object.values(applicantsByStatus);

  // Chart Data for Bar and Pie Charts
  const applicantsGrowthData = {
    labels: ['Previous Month', 'Current Month'],
    datasets: [
      {
        label: 'Applicants Growth',
        data: [120, applicantsData.length], // Example static data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const recruiterPaymentData = {
    labels: recruitersData.map((recruiter) => recruiter.name),
    datasets: [
      {
        label: 'Payment Received',
        data: recruitersData.map((recruiter) => recruiter.payment),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Export data to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Job Applied', 'Status'];
    const rows = applicantsData.map((applicant) => [
      applicant.name,
      applicant.email,
      applicant.jobApplied,
      applicant.status,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'applicants_report.csv');
  };

  return (
    <div className="admin-reports">
      <AdminNavbar />
      <div className="dashboard-content">
        <AdminSidenavbar />
        <div className="reports-content">
          <h1>Admin Reports</h1>

          {/* Report Type Navigation */}
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

          {/* Filter by Time Range */}
          <div className="time-range-filter">
            <label>Time Range:</label>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          {/* Show report based on the selected report type */}
          {activeReport === 'applicants' ? <ApplicantsReport /> : <RecruitersReport />}

          {/* Charts */}
          <div className="charts-container">
            <div className="chart">
              <h2>Applicants Growth</h2>
              <Bar data={applicantsGrowthData} />
            </div>
            <div className="chart">
              <h2>Job Application Status</h2>
              <Pie
                data={{
                  labels: jobStatuses,
                  datasets: [
                    {
                      data: statusCounts,
                      backgroundColor: ['green', 'orange', 'red', 'blue'],
                    },
                  ],
                }}
              />
            </div>
          </div>

          {/* Export Button */}
          <div className="export-btn">
            <button onClick={exportToCSV}>Export to CSV</button>
          </div>

          {/* Admin Earnings */}
          <div className="admin-earnings">
            <h2>Total Earnings for Admin</h2>
            <p>
              The total payment the admin has received from recruiters for job posts: <strong>${recruitersData.reduce((acc, recruiter) => acc + recruiter.payment, 0)}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Applicants Report Component
const ApplicantsReport = () => (
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

// Recruiters Report Component
const RecruitersReport = () => (
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

export default AdminReports;
