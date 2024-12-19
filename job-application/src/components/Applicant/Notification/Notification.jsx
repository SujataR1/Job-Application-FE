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
import React, { useState, useEffect, useRef } from "react";
import "./Notification.css";
import { io } from "socket.io-client";

// Dummy Data for Notifications
const dummyData = {
  connectionRequests: [
    { id: 1, name: "Alice Cooper", jobTitle: "Software Engineer" },
    { id: 2, name: "Mark Lee", jobTitle: "Product Manager" },
  ],
  jobPosts: [
    { id: 1, company: "Tech Innovations", jobTitle: "Frontend Developer" },
    { id: 2, company: "Creative Solutions", jobTitle: "UI/UX Designer" },
  ],
  jobApplications: [
    { id: 1, candidateName: "John Doe", jobTitle: "Frontend Developer", company: "Tech Innovations" },
    { id: 2, candidateName: "Jane Smith", jobTitle: "Backend Developer", company: "Creative Solutions" },
  ],
  statusUpdates: [
    { id: 1, candidateName: "John Doe", status: "Interview Scheduled" },
    { id: 2, candidateName: "Jane Smith", status: "Application Rejected" },
  ],
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]); // Stores all notifications
  const [newNotification, setNewNotification] = useState(null); // Stores the latest notification
  const [isConnected, setIsConnected] = useState(false); // WebSocket connection status
  const socketRef = useRef(null); // Persistent socket reference
  

  const fetchNotifications = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:7000", { query: { token } });

      socketRef.current.on("connect", () => {
        console.log("Connected to WebSocket server");
        setIsConnected(true);
        socketRef.current.emit("fetchPreviousNotifications");
      });

      socketRef.current.on("notifications", (data) => {
        console.log("Received previous notifications:", data);
        setNotifications(data);
      });

      socketRef.current.on("notification", (data) => {
        console.log("New notification received:", data);
        setNewNotification(data);
        setNotifications((prev) => [data, ...prev]);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
        setIsConnected(false);
      });

      socketRef.current.on("error", (error) => {
        console.error("WebSocket error:", error.message);
      });
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Page is visible. Fetching notifications.");
        fetchNotifications();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const dummyNotifications = [
      ...dummyData.connectionRequests.map((req) => `Connection request from ${req.name}, ${req.jobTitle}`),
      ...dummyData.jobPosts.map((post) => `New job post at ${post.company} for ${post.jobTitle}`),
      ...dummyData.jobApplications.map(
        (app) => `${app.candidateName} applied for ${app.jobTitle} at ${app.company}`
      ),
      ...dummyData.statusUpdates.map((update) => `${update.candidateName}'s application status: ${update.status}`),
    ];
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="notifications-container">
      <h3>Notifications</h3>
      {isConnected ? (
        <p style={{ color: "green", textAlign: "center" }}>Connected to WebSocket</p>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>Disconnected</p>
      )}

      {newNotification && (
        <div className="new-notification">
          <strong>New Notification:</strong> {newNotification.title || "No Title"} -{" "}
          {newNotification.content || "No Content"}
        </div>
      )}

      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <h4>{notification.title}</h4>
            <p>{notification.content}</p>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;
