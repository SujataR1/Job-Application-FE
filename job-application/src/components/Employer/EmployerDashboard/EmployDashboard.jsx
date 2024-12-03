// import React from 'react';
// // Static data
// const companyProfile = {
//   name: 'TechCorp',
//   logo: 'https://randomuser.me/api/portraits/men/1.jpg',
//   description: 'Leading tech company in software development.',
// };

// const jobs = [
//   { id: 1, title: 'Software Engineer', status: 'Open', location: 'New York', salary: '$100,000', applicants: 3 },
//   { id: 2, title: 'Marketing Manager', status: 'Closed', location: 'San Francisco', salary: '$80,000', applicants: 5 },
//   { id: 3, title: 'UI/UX Designer', status: 'Open', location: 'Remote', salary: '$70,000', applicants: 2 },
// ];

// const applications = [
//   { jobId: 1, applicant: 'John Doe', status: 'Applied', interviewDate: '', resume: 'resume1.pdf' },
//   { jobId: 1, applicant: 'Jane Smith', status: 'Interview Scheduled', interviewDate: '2024-12-10', resume: 'resume2.pdf' },
//   { jobId: 2, applicant: 'Mark Lee', status: 'Rejected', interviewDate: '', resume: 'resume3.pdf' },
//   { jobId: 3, applicant: 'Emily Davis', status: 'Applied', interviewDate: '', resume: 'resume4.pdf' },
// ];

// const notifications = [
//   'New application for Software Engineer.',
//   'Interview scheduled for Jane Smith for Software Engineer position.',
//   'Marketing Manager position is closed.',
// ];

// // Static components for Dashboard sections
// const ProfileManagement = ({ companyProfile }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
//     <h2>Company Profile</h2>
//     <img src={companyProfile.logo} alt="Company Logo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
//     <h3>{companyProfile.name}</h3>
//     <p>{companyProfile.description}</p>
//   </div>
// );

// const NotificationsComponent = ({ notifications }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
//     <h2>Notifications</h2>
//     <ul>
//       {notifications.map((notification, index) => (
//         <li key={index}>{notification}</li>
//       ))}
//     </ul>
//   </div>
// );

// const AnalyticsComponent = ({ applications, jobs }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
//     <h2>Analytics</h2>
//     <div>
//       <h3>Total Applications: {applications.length}</h3>
//       <h3>Jobs Posted: {jobs.length}</h3>
//       <h3>Open Jobs: {jobs.filter(job => job.status === 'Open').length}</h3>
//       <h3>Closed Jobs: {jobs.filter(job => job.status === 'Closed').length}</h3>
//     </div>
//   </div>
// );

// const JobPostingsComponent = ({ jobs }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
//     <h2>Job Postings</h2>
//     <ul>
//       {jobs.map((job) => (
//         <li key={job.id}>
//           <h3>{job.title}</h3>
//           <p>Status: {job.status}</p>
//           <p>Location: {job.location}</p>
//           <p>Salary: {job.salary}</p>
//           <p>Applicants: {job.applicants}</p>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const JobApplicationsComponent = ({ applications }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', marginBottom: '20px' }}>
//     <h2>Job Applications</h2>
//     <ul>
//       {applications.map((application, index) => (
//         <li key={index}>
//           <h3>Applicant: {application.applicant}</h3>
//           <p>Status: {application.status}</p>
//           {application.interviewDate && <p>Interview Date: {application.interviewDate}</p>}
//           <p>Resume: {application.resume}</p>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const EmployerDashboard = () => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Employer Dashboard</h1>
//       <ProfileManagement companyProfile={companyProfile} />
//       <NotificationsComponent notifications={notifications} />
//       <AnalyticsComponent applications={applications} jobs={jobs} />
//       <JobPostingsComponent jobs={jobs} />
//       <JobApplicationsComponent applications={applications} />
//     </div>
//   );
// };

// export default EmployerDashboard;
import React, { useState } from 'react';

import EmployerSidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
import Efeed from '../Efeed/Efeed';  // Create Feed Component
import './EmployDashboard.css';
import EmployerNavbar from '../Navbar/Navbar';

const HomePage = () => {
  const [postText, setPostText] = useState('');
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() !== '') {
      alert(`Post Created: ${postText}`);
      setPostText(''); // Clear the text after post submission
    }
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}
     <EmployerNavbar/>

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content Area */}
        

          {/* Feed Section */}
          <Efeed />
        </div>
      </div>

  );
};

export default HomePage;
