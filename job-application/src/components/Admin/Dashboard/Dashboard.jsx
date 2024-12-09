import React from 'react';
import './Dashboard.css';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Data for the bar chart
  const chartData = {
    labels: ['Job Applications', 'New Job Listings', 'Pending Approvals', 'Users'],
    datasets: [
      {
        label: 'Statistics',
        data: [123, 5, 10, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Platform Statistics',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="home-page">
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>Admin Dashboard</h2>
          </div>

          {/* Job Application Overview Section */}
          <div className="overview-section">
            <div className="overview-card">
              <h3>Total Applications</h3>
              <p>123</p>
            </div>
            <div className="overview-card">
              <h3>Applications in Review</h3>
              <p>25</p>
            </div>
            <div className="overview-card">
              <h3>Applications Approved</h3>
              <p>50</p>
            </div>
            <div className="overview-card">
              <h3>Applications Rejected</h3>
              <p>48</p>
            </div>
          </div>

          {/* Job Listings Overview Section */}
          <div className="job-listings-section">
            <div className="overview-card">
              <h3>Total Job Listings</h3>
              <p>15</p>
            </div>
            <div className="overview-card">
              <h3>Active Listings</h3>
              <p>10</p>
            </div>
            <div className="overview-card">
              <h3>Closed Listings</h3>
              <p>5</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-section">
            <h3>Platform Statistics</h3>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Latest Applications Section */}
          <div className="latest-applications">
            <h3>Latest Applications</h3>
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Job Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Software Developer</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Product Manager</td>
                  <td>Approved</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Latest Activities Section */}
          <div className="latest-activities">
            <h3>Latest Activities</h3>
            <ul>
              <li>John Doe applied for Software Developer - Pending</li>
              <li>Jane Smith applied for Product Manager - Approved</li>
              <li>New job listing created for UI/UX Designer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
