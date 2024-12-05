import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'; 
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

import './CompanyAnalytics.css';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement, // Register ArcElement for Pie chart
  Title, 
  Tooltip, 
  Legend
);

const initialApplicants = [
  { id: 1, name: 'John Doe', status: 'Shortlisted', domain: 'Software Development', interviewMode: 'Online', interviewStatus: 'In Progress', designation: 'Software Developer' },
  { id: 2, name: 'Jane Smith', status: 'Shortlisted', domain: 'Product Management', interviewMode: 'Physical', interviewStatus: 'Scheduled', designation: 'Product Manager' },
  { id: 3, name: 'Emma Watson', status: 'Pending', domain: 'UI/UX Design', interviewMode: '', interviewStatus: '', designation: 'UI/UX Designer' },
  { id: 4, name: 'Chris Brown', status: 'Rejected', domain: 'Marketing', interviewMode: '', interviewStatus: '', designation: 'Marketing Executive' },
];

const CompanyAnalyticsPage = () => {
  const [applicants, setApplicants] = useState(initialApplicants);

  // Data for charts
  const applicantStatusData = {
    labels: ['Shortlisted', 'Pending', 'Rejected'],
    datasets: [{
      label: 'Applicant Status Distribution',
      data: [
        applicants.filter(applicant => applicant.status === 'Shortlisted').length,
        applicants.filter(applicant => applicant.status === 'Pending').length,
        applicants.filter(applicant => applicant.status === 'Rejected').length
      ],
      backgroundColor: ['#FFB6C1', '#FF6347', '#3CB371'],
    }],
  };

  const interviewModeData = {
    labels: ['Online', 'Physical'],
    datasets: [{
      label: 'Interview Mode Distribution',
      data: [
        applicants.filter(applicant => applicant.interviewMode === 'Online').length,
        applicants.filter(applicant => applicant.interviewMode === 'Physical').length
      ],
      backgroundColor: ['#4CAF50', '#FF9800'],
    }],
  };

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />
    <div className="company-analytics-page">
      <h1>Company Analytics</h1>

      {/* Total Applications Overview */}
      <div className="overview">
        <div className="overview-item">
          <h2>Total Applications</h2>
          <p>{applicants.length}</p>
        </div>
        <div className="overview-item">
          <h2>Shortlisted</h2>
          <p>{applicants.filter(applicant => applicant.status === 'Shortlisted').length}</p>
        </div>
        <div className="overview-item">
          <h2>Pending</h2>
          <p>{applicants.filter(applicant => applicant.status === 'Pending').length}</p>
        </div>
        <div className="overview-item">
          <h2>Rejected</h2>
          <p>{applicants.filter(applicant => applicant.status === 'Rejected').length}</p>
        </div>
      </div>

      {/* Applicant Status Chart */}
      <div className="chart-container">
        <h2>Applicant Status Distribution</h2>
        <Pie data={applicantStatusData} />
      </div>

      {/* Interview Mode Chart */}
      <div className="chart-container">
        <h2>Interview Mode Distribution</h2>
        <Bar data={interviewModeData} />
      </div>

      {/* Shortlisted Candidates List */}
      <div className="applicant-list">
        <h2>Shortlisted Candidates</h2>
        {applicants.filter(applicant => applicant.status === 'Shortlisted').map((applicant) => (
          <div className="applicant-card" key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>Domain: {applicant.domain}</p>
            <p>Designation: {applicant.designation}</p>
            <p>Status: {applicant.interviewStatus}</p>
            <p>Interview Mode: {applicant.interviewMode}</p>
          </div>
        ))}
      </div>

      {/* Pending Candidates List */}
      <div className="applicant-list">
        <h2>Pending Candidates</h2>
        {applicants.filter(applicant => applicant.status === 'Pending').map((applicant) => (
          <div className="applicant-card" key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>Domain: {applicant.domain}</p>
            <p>Status: Pending</p>
          </div>
        ))}
      </div>

      {/* Rejected Candidates List */}
      <div className="applicant-list">
        <h2>Rejected Candidates</h2>
        {applicants.filter(applicant => applicant.status === 'Rejected').map((applicant) => (
          <div className="applicant-card" key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>Domain: {applicant.domain}</p>
            <p>Status: Rejected</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default CompanyAnalyticsPage;
