import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

import './Analytics.css';

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

const companyAnalyticsData = {
  totalJobsPosted: 25,
  totalApplicants: initialApplicants.length,
  totalHired: 10,
  totalRejected: 5,
  totalUnderCustomAssesment: 8,
  totalInterviewsScheduled: 12,
  employees: 50,
  averageSalary: 75000, // Just a sample average salary
};

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
    <div className="company-analytics-container">
      {/* Navbar/Header */}
      <EmployerNavbar />

      {/* Sidebar */}
      <EmployerSidebar />

      <div className="analytics-main-content">
        <div className="company-analytics-header">
          <h1>Company Analytics</h1>
        </div>

        <div className="overview-container">
          <div className="overview-card">
            <h2>Total Applications</h2>
            <p>{applicants.length}</p>
          </div>
          <div className="overview-card">
            <h2>Shortlisted</h2>
            <p>{applicants.filter(applicant => applicant.status === 'Shortlisted').length}</p>
          </div>
          <div className="overview-card">
            <h2>Pending</h2>
            <p>{applicants.filter(applicant => applicant.status === 'Pending').length}</p>
          </div>
          <div className="overview-card">
            <h2>Rejected</h2>
            <p>{applicants.filter(applicant => applicant.status === 'Rejected').length}</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="charts-container">
            <div className="chart-item">
              <h3>Applicant Status Distribution</h3>
              <Pie data={applicantStatusData} />
            </div>
            <div className="chart-item">
              <h3>Interview Mode Distribution</h3>
              <Bar data={interviewModeData} />
            </div>
          </div>
        </div>

        <div className="company-analytics-section">
          <h2>Company Analytics Overview</h2>

          <div className="analytics-cards-container">
            <div className="analytics-card">
              <h3>Total Jobs Posted</h3>
              <p>{companyAnalyticsData.totalJobsPosted}</p>
            </div>
            <div className="analytics-card">
              <h3>Total Applicants</h3>
              <p>{companyAnalyticsData.totalApplicants}</p>
            </div>
            <div className="analytics-card">
              <h3>Total Hired</h3>
              <p>{companyAnalyticsData.totalHired}</p>
            </div>
            <div className="analytics-card">
              <h3>Total Rejected</h3>
              <p>{companyAnalyticsData.totalRejected}</p>
            </div>
            <div className="analytics-card">
              <h3>Total Under Custom Assessment</h3>
              <p>{companyAnalyticsData.totalUnderCustomAssesment}</p>
            </div>
            <div className="analytics-card">
              <h3>Total Interviews Scheduled</h3>
              <p>{companyAnalyticsData.totalInterviewsScheduled}</p>
            </div>
            <div className="analytics-card">
              <h3>Employees</h3>
              <p>{companyAnalyticsData.employees}</p>
            </div>
            <div className="analytics-card">
              <h3>Average Salary</h3>
              <p>{companyAnalyticsData.averageSalary} USD</p>
            </div>
          </div>
        </div>

        <div className="applicant-lists">
          <div className="list-section">
            <h3>Shortlisted Candidates</h3>
            {applicants.filter(applicant => applicant.status === 'Shortlisted').map((applicant) => (
              <div className="applicant-card" key={applicant.id}>
                <h4>{applicant.name}</h4>
                <p>{applicant.domain}</p>
                <p>{applicant.designation}</p>
                <p>{applicant.interviewStatus}</p>
              </div>
            ))}
          </div>

          <div className="list-section">
            <h3>Pending Candidates</h3>
            {applicants.filter(applicant => applicant.status === 'Pending').map((applicant) => (
              <div className="applicant-card" key={applicant.id}>
                <h4>{applicant.name}</h4>
                <p>{applicant.domain}</p>
                <p>Status: Pending</p>
              </div>
            ))}
          </div>

          <div className="list-section">
            <h3>Rejected Candidates</h3>
            {applicants.filter(applicant => applicant.status === 'Rejected').map((applicant) => (
              <div className="applicant-card" key={applicant.id}>
                <h4>{applicant.name}</h4>
                <p>{applicant.domain}</p>
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
