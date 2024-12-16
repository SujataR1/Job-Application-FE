import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // Stores all notifications
  const [newNotification, setNewNotification] = useState(null); // Stores the latest notification
  const [isConnected, setIsConnected] = useState(false); // WebSocket connection status
  let socket;

  // Function to fetch previous notifications
  const fetchPreviousNotifications = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage.');
      return;
    }

    // Create a new Socket.IO connection to request previous notifications
    socket = io('http://localhost:7000', { query: { token } });

    // Fetch the most recent notifications
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);

      socket.emit('fetchPreviousNotifications'); // Request previous notifications
    });

    // Listen for previous notifications
    socket.on('notifications', (data) => {
      console.log('Received previous notifications:', data);
      setNotifications(data); // Set the initial notifications list
    });

    // Listen for real-time notifications
    socket.on('notification', (data) => {
      console.log('New notification received:', data);
      setNewNotification(data);
      setNotifications((prev) => [data, ...prev]); // Add new notification to the top
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('WebSocket error:', error.message);
    });
  };

  useEffect(() => {
    // Fetch notifications on initial load
    fetchPreviousNotifications();

    // Fetch notifications when the page regains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page is visible. Fetching previous notifications.');
        fetchPreviousNotifications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
        {/* Navbar/Header */}
        <EmployerNavbar/>
    
         <div className="home-content flex flex-row">
           {/* Sidebar */}
           <EmployerSidebar />
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Notifications</h2>

      {isConnected ? (
        <p style={{ color: 'green', textAlign: 'center' }}>Connected to WebSocket</p>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Disconnected</p>
      )}

      {newNotification && (
        <div
          style={{
            backgroundColor: '#d4edda',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #c3e6cb',
          }}
        >
          <strong>New Notification:</strong> {newNotification.title} - {newNotification.content}
        </div>
      )}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notifications.map((notification, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '5px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
            }}
          >
            <strong>{notification.title}</strong>: {notification.content}
          </li>
        ))}
      </ul>

      {!notifications.length && (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No notifications available.</p>
      )}
    </div>
    </div>
    </div>
  );
};

export default Notifications;