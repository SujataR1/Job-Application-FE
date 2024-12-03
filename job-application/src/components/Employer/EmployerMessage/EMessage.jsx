import React, { useState } from 'react';
import './EMessage.css';

// Dummy connection data (users you're connected with)
const connections = [
  { id: 1, name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Mark Lee', profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'Emily Davis', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Alice Cooper', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 6, name: 'Bob Harris', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 7, name: 'Olivia Brown', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 8, name: 'Michael Johnson', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg' },
];

// Dummy message data for chat
const initialMessages = [
  { from: 1, to: 2, text: "Hey, how's it going?" },
  { from: 2, to: 1, text: "I'm good, thanks for asking!" },
  { from: 3, to: 1, text: "Are you coming to the meetup tomorrow?" },
  { from: 1, to: 3, text: "Yes, looking forward to it!" },
  { from: 4, to: 1, text: "What are you working on?" },
  { from: 1, to: 4, text: "Just working on a new project, it's exciting!" },
  { from: 2, to: 1, text: "Let me know if you need any help." },
];

const EMessage = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState('');

  const handleConnectionClick = (connection) => {
    setSelectedConnection(connection); // Set the selected connection
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() === '') return;

    // Add new message to the chat
    const newMessage = {
      from: 1, // Current logged-in user (dummy)
      to: selectedConnection.id,
      text: messageText,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  // Get messages for the current chat
  const getMessages = () => {
    return messages.filter(
      (msg) => (msg.from === 1 && msg.to === selectedConnection.id) || (msg.to === 1 && msg.from === selectedConnection.id)
    );
  };

  return (
    <div className="app">
      {selectedConnection ? (
        <div className="chat-page">
          <div className="chat-header">
            <div className="chat-header-info">
              <img
                src={selectedConnection.profilePicture}
                alt={`${selectedConnection.name}'s profile`}
                className="profile-picture"
              />
              <h3>Chat with {selectedConnection.name}</h3>
            </div>
          </div>

          <div className="chat-history">
            {getMessages().map((msg, idx) => (
              <div key={idx} className={`message ${msg.from === 1 ? 'sent' : 'received'}`}>
                <div className="message-info">
                  {msg.from === 1 ? (
                    <img
                      src='https://randomuser.me/api/portraits/men/5.jpg'  // Use logged-in user's profile image
                      alt="User's profile"
                      className="message-profile-picture"
                    />
                  ) : (
                    <img
                      src={selectedConnection.profilePicture}
                      alt={`${selectedConnection.name}'s profile`}
                      className="message-profile-picture"
                    />
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="message-input">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              rows="3"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div className="connections-list">
          <h2>Your Connections</h2>
          <ul>
            {connections.map((connection) => (
              <li
                key={connection.id}
                className="connection-item"
                onClick={() => handleConnectionClick(connection)}
              >
                <img
                  src={connection.profilePicture}
                  alt={`${connection.name}'s profile`}
                  className="profile-picture"
                />
                {connection.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EMessage;
