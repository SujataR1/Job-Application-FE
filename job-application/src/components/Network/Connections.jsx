import React, { useState } from 'react';
import './connections.css'; // Import the CSS file for styling

const Connections = () => {
    // Sample data for connections (you can fetch this data from an API in a real-world app)
    const connectionsList = [
        { id: 1, name: 'John Doe', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg'},
        { id: 2, name: 'Jane Smith' , imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 3, name: 'Robert Brown' , imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'},
        { id: 4, name: 'Emily Johnson', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 5, name: 'Michael Williams' , imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    ];

    const [activeConnection, setActiveConnection] = useState(null);

    // Function to handle clicking the "Message" button
    const handleMessageClick = (connection) => {
        setActiveConnection(connection);
    };

    return (
        <div className="connections-container">
            {/* Header displaying the total number of connections */}
            <div className="connections-header">
                <h2>My Connections</h2>
                <p>Total Connections: {connectionsList.length}</p>
            </div>

            {/* List of Connections */}
            <div className="connections-list">
                {connectionsList.map((connection) => (
                    <div key={connection.id} className="connection-item">
                        <img 
                            src={connection.imgUrl} 
                            alt={connection.name} 
                            className="connection-image" // Class for styling the image
                        />
                        <span>{connection.name}</span>
                        <button 
                            className="message-button"
                            onClick={() => handleMessageClick(connection)}
                        >
                            Message
                        </button>
                    </div>
                ))}
            </div>

            {/* Chat Window for the active connection */}
            {activeConnection && (
                <div className="chat-window">
                    <h3>Chat with {activeConnection.name}</h3>
                    <div className="chat-box">
                        <p>Chat feature is under construction.</p>
                    </div>
                    <button 
                        className="close-chat"
                        onClick={() => setActiveConnection(null)}
                    >
                        Close Chat
                    </button>
                </div>
            )}
        </div>
    );
};

export default Connections;
