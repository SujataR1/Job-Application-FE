import React from 'react';
import './Network.css';

const Connections = () => {
  const connections = [
    { name: 'John Doe', position: 'Software Engineer' },
    { name: 'Jane Smith', position: 'Product Manager' },
    { name: 'Mark Johnson', position: 'Data Scientist' },
  ];

  return (
    <div className="connections">
      <h3>Your Connections</h3>
      <ul>
        {connections.map((connection, index) => (
          <li key={index} className="connection-item">
            <div className="connection-info">
              <span className="connection-name">{connection.name}</span>
              <span className="connection-position">{connection.position}</span>
            </div>
            <button className="message-button">Message</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
