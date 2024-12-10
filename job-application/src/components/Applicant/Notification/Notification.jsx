import React, { useState, useEffect } from 'react';
import './Notification.css';


// Dummy Data for notifications (for applicant)
const dummyData = {
  jobApplications: [
    { id: 1, company: 'Tech Innovations', jobTitle: 'Frontend Developer' },
    { id: 2, company: 'Creative Solutions', jobTitle: 'UI/UX Designer' }
  ],
  statusUpdates: [
    { id: 1, jobTitle: 'Frontend Developer', company: 'Tech Innovations', status: 'Interview Scheduled' },
    { id: 2, jobTitle: 'UI/UX Designer', company: 'Creative Solutions', status: 'Application Rejected' }
  ],
  connectionRequests: [
    { id: 1, name: 'Alice Cooper', jobTitle: 'Software Engineer' },
    { id: 2, name: 'Mark Lee', jobTitle: 'Product Manager' }
  ],
  companyUpdates: [
    { id: 1, company: 'Tech Innovations', update: 'New job posting for Frontend Developer' },
    { id: 2, company: 'Creative Solutions', update: 'New job posting for UI/UX Designer' }
  ]
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate notifications from dummy data
    const newNotifications = [
      ...dummyData.jobApplications.map((app) => `You applied for ${app.jobTitle} at ${app.company}`),
      ...dummyData.statusUpdates.map((update) => `Your application for ${update.jobTitle} at ${update.company} changed status: ${update.status}`),
      ...dummyData.connectionRequests.map((req) => `Connection request from ${req.name}, ${req.jobTitle}`),
      ...dummyData.companyUpdates.map((update) => `New update from ${update.company}: ${update.update}`)
    ];
    setNotifications(newNotifications);
  }, []);

  return (
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
  );
};

export default Notification;
