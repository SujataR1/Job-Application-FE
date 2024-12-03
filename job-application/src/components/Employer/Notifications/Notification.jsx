// Notifications.js
import React, { useState, useEffect } from 'react';

const Notifications = ({ newApplicants, interviews, statusUpdates }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating new notifications based on incoming data
    const newNotifications = [
      ...newApplicants.map((app) => `New Application from ${app.name} for ${app.jobTitle}`),
      ...interviews.map((intv) => `Interview Scheduled for ${intv.candidateName}`),
      ...statusUpdates.map((update) => `${update.candidateName}'s application status changed to ${update.status}`),
    ];
    setNotifications(newNotifications);
  }, [newApplicants, interviews, statusUpdates]);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
