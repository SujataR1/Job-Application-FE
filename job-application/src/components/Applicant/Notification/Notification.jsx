// import React, { useState, useEffect } from 'react';
// import './Notification.css';


// // Dummy Data for notifications (for applicant)
// const dummyData = {
//   jobApplications: [
//     { id: 1, company: 'Tech Innovations', jobTitle: 'Frontend Developer' },
//     { id: 2, company: 'Creative Solutions', jobTitle: 'UI/UX Designer' }
//   ],
//   statusUpdates: [
//     { id: 1, jobTitle: 'Frontend Developer', company: 'Tech Innovations', status: 'Interview Scheduled' },
//     { id: 2, jobTitle: 'UI/UX Designer', company: 'Creative Solutions', status: 'Application Rejected' }
//   ],
//   connectionRequests: [
//     { id: 1, name: 'Alice Cooper', jobTitle: 'Software Engineer' },
//     { id: 2, name: 'Mark Lee', jobTitle: 'Product Manager' }
//   ],
//   companyUpdates: [
//     { id: 1, company: 'Tech Innovations', update: 'New job posting for Frontend Developer' },
//     { id: 2, company: 'Creative Solutions', update: 'New job posting for UI/UX Designer' }
//   ]
// };

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Simulate notifications from dummy data
//     const newNotifications = [
//       ...dummyData.jobApplications.map((app) => `You applied for ${app.jobTitle} at ${app.company}`),
//       ...dummyData.statusUpdates.map((update) => `Your application for ${update.jobTitle} at ${update.company} changed status: ${update.status}`),
//       ...dummyData.connectionRequests.map((req) => `Connection request from ${req.name}, ${req.jobTitle}`),
//       ...dummyData.companyUpdates.map((update) => `New update from ${update.company}: ${update.update}`)
//     ];
//     setNotifications(newNotifications);
//   }, []);

//   return (
//     <div className="notifications-container">
//       <h3>Notifications</h3>
//       {notifications.length === 0 ? (
//         <p>No new notifications</p>
//       ) : (
//         <div className="notifications-list">
//           {notifications.map((notification, index) => (
//             <div key={index} className="notification-item">
//               <div className="notification-icon">
//                 <i className="fa fa-bell" aria-hidden="true"></i>
//               </div>
//               <div className="notification-message">
//                 <p>{notification}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// export default Notification;

import React, { useState, useEffect } from 'react';
import './Notification.css';

// Function to get the auth token
const getAuthToken = () => localStorage.getItem('authToken'); // Or use sessionStorage

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = getAuthToken();  // Get token from storage

      if (!token) {
        setError('Authentication token is missing');
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/notifications', {
          method: 'GET',
          headers: {
            'Authorization': ` ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h3>Notifications</h3>
      {error && <p className="error">{error}</p>}
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
                <p>{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
