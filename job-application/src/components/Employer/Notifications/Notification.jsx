import React, { useState, useEffect } from 'react';
import './Notifications.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

// Dummy Data for notifications
const dummyData = {
  connectionRequests: [
    { id: 1, name: 'Alice Cooper', jobTitle: 'Software Engineer' },
    { id: 2, name: 'Mark Lee', jobTitle: 'Product Manager' }
  ],
  jobPosts: [
    { id: 1, company: 'Tech Innovations', jobTitle: 'Frontend Developer' },
    { id: 2, company: 'Creative Solutions', jobTitle: 'UI/UX Designer' }
  ],
  jobApplications: [
    { id: 1, candidateName: 'John Doe', jobTitle: 'Frontend Developer', company: 'Tech Innovations' },
    { id: 2, candidateName: 'Jane Smith', jobTitle: 'Backend Developer', company: 'Creative Solutions' }
  ],
  statusUpdates: [
    { id: 1, candidateName: 'John Doe', status: 'Interview Scheduled' },
    { id: 2, candidateName: 'Jane Smith', status: 'Application Rejected' }
  ]
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate notifications from dummy data
    const newNotifications = [
      ...dummyData.connectionRequests.map((req) => `Connection request from ${req.name}, ${req.jobTitle}`),
      ...dummyData.jobPosts.map((post) => `New job post at ${post.company} for ${post.jobTitle}`),
      ...dummyData.jobApplications.map((app) => `${app.candidateName} applied for ${app.jobTitle} at ${app.company}`),
      ...dummyData.statusUpdates.map((update) => `${update.candidateName}'s application status changed to: ${update.status}`)
    ];
    setNotifications(newNotifications);
  }, []);

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />
    <div className="notifications-container">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-icon">
                <i className="fa fa-bell" aria-hidden="true"></i>
              </div>
              <div className="notification-message">
                <p>{notification}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Notifications;

