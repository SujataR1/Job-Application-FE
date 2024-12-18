
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';
import './JobApplication.css';

const AdminJobApplicationPage = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobStats, setJobStats] = useState({
    totalApplicants: 0,
    shortlisted: 0,
    rejected: 0,
    interviewScheduled: 0,
  });

  // Dummy Data for Job Postings
  const dummyJobPostings = [
    { id: 1, title: 'Software Engineer' },
    { id: 2, title: 'UI/UX Designer' },
    { id: 3, title: 'Product Manager' },
  ];

  // Dummy Data for Applicants
  const dummyApplicants = {
    1: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Shortlisted' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Rejected' },
      { id: 3, name: 'Mark Johnson', email: 'mark@example.com', status: 'Interview Scheduled' },
    ],
    2: [
      { id: 4, name: 'Anna Lee', email: 'anna@example.com', status: 'Shortlisted' },
      { id: 5, name: 'Chris Brown', email: 'chris@example.com', status: 'Rejected' },
    ],
    3: [
      { id: 6, name: 'Sophie Green', email: 'sophie@example.com', status: 'Interview Scheduled' },
      { id: 7, name: 'Luke Wilson', email: 'luke@example.com', status: 'Shortlisted' },
      { id: 3, name: 'Hena Sharma', email: 'hena@example.com', status: 'Rejected' },
    ],
  };

  useEffect(() => {
    setJobPostings(dummyJobPostings);
  }, [dummyJobPostings]); // Add dummyJobPostings to the dependency array

  // Update job stats (total applicants, shortlisted, rejected, interview scheduled)
  const updateJobStats = () => {
    const stats = {
      totalApplicants: applicants.length,
      shortlisted: applicants.filter((applicant) => applicant.status === 'Shortlisted').length,
      rejected: applicants.filter((applicant) => applicant.status === 'Rejected').length,
      interviewScheduled: applicants.filter((applicant) => applicant.status === 'Interview Scheduled').length,
    };
    setJobStats(stats);
  };

  useEffect(() => {
    updateJobStats(); // This depends on the applicants array, so include it in the dependencies.
  }, [applicants]); // Add applicants to the dependency array

  // Handle job selection
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setApplicants(dummyApplicants[job.id] || []);
  };

  // Filter applicants by status and search query
  const filteredApplicants = applicants
    .filter((applicant) => statusFilter === 'All' || applicant.status === statusFilter)
    .filter((applicant) => applicant.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="manage-companies-page">
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="admin-job-application-page">
          <h1>Job Applications</h1>

          {/* Job Postings Section */}
          <div className="job-postings">
            <h2>Job Postings</h2>
            <ul>
              {jobPostings.map((job) => (
                <li key={job.id} onClick={() => handleJobSelect(job)}>
                  {job.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Stats Section */}
          {selectedJob && (
            <div className="job-stats">
              <h3>Job Stats for {selectedJob.title}</h3>
              <p>Total Applicants: {jobStats.totalApplicants}</p>
              <p>Shortlisted: {jobStats.shortlisted}</p>
              <p>Rejected: {jobStats.rejected}</p>
              <p>Interview Scheduled: {jobStats.interviewScheduled}</p>
            </div>
          )}

          {/* Applicants Section */}
          {selectedJob && (
            <div className="applicants">
              <h2>Applicants for {selectedJob.title}</h2>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Status Filter */}
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
              </select>

              {/* Applicants Table */}
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} style={{ backgroundColor: '#f4f7fc' }}>
                      <td>{applicant.name}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobApplicationPage;
