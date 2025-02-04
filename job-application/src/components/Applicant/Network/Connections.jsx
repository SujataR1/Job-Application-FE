// import React, { useState } from 'react';
// import './connections.css'; // Import the CSS file for styling

// const Connections = () => {
//     // Sample data for connections (you can fetch this data from an API in a real-world app)
//     const connectionsList = [
//         { id: 1, name: 'John Doe', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg'},
//         { id: 2, name: 'Jane Smith' , imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
//         { id: 3, name: 'Robert Brown' , imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg'},
//         { id: 4, name: 'Emily Johnson', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
//         { id: 5, name: 'Michael Williams' , imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
//     ];

    
//     const [activeConnection, setActiveConnection] = useState(null);

//     // Function to handle clicking the "Message" button
//     const handleMessageClick = (connection) => {
//         setActiveConnection(connection);
//     };

//     return (
//         <div className="connections-container">
//             {/* Header displaying the total number of connections */}
//             <div className="connections-header">
//                 <h2>My Connections</h2>
//                 <p>Total Connections: {connectionsList.length}</p>
//             </div>

//             {/* List of Connections */}
//             <div className="connections-list">
//                 {connectionsList.map((connection) => (
//                     <div key={connection.id} className="connection-items">
//                         <img 
//                             src={connection.imgUrl} 
//                             alt={connection.name} 
//                             className="connection-image" // Class for styling the image
//                         />
//                         <span>{connection.name}</span>
//                         <button 
//                             className="message-button"
//                             onClick={() => handleMessageClick(connection)}
//                         >
//                             Message
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Chat Window for the active connection */}
//             {activeConnection && (
//                 <div className="chat-window">
//                     <h3>Chat with {activeConnection.name}</h3>
//                     <div className="chat-box">
//                         <p>Chat feature is under construction.</p>
//                     </div>
//                     <button 
//                         className="close-chat"
//                         onClick={() => setActiveConnection(null)}
//                     >
//                         Close Chat
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Connections;
import React, { useState } from 'react';
import './connections.css'; // Import the CSS file for styling

const Connections = () => {
    // Sample data for connections
    const connectionsList = [
        { id: 1, name: 'John Doe', imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 3, name: 'Robert Brown', imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 4, name: 'Emily Johnson', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 5, name: 'Michael Williams', imgUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    ];

    const [activeConnection, setActiveConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    // Handle clicking the "Message" button
    const handleMessageClick = (connection) => {
        if (activeConnection && activeConnection.id === connection.id) {
            // If the same connection is clicked again, close the chat
            setActiveConnection(null);
        } else {
            // Open the chat with the selected connection
            setActiveConnection(connection);
            setMessages([]); // Reset messages when a new chat is opened
        }
    };

    // Handle typing a message
    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (messageInput.trim()) {
            setMessages([...messages, { text: messageInput, sender: 'You' }]);
            setMessageInput(''); // Clear input after sending message
        }
    };

    return (
        <div className="connections-container">
            {/* Connections List */}
            <div className="connections-list">
                {connectionsList.map((connection) => (
                    <div key={connection.id} className="connection-items">
                        <img
                            src={connection.imgUrl}
                            alt={connection.name}
                            className="connection-image"
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

            {/* Chat Window for Active Connection */}
            {activeConnection && (
                <div className="chat-window">
                    <div className="chat-header">
                        {/* Displaying the profile of the person you're chatting with */}
                        <img
                            src={activeConnection.imgUrl}
                            alt={activeConnection.name}
                            className="chat-profile-image"
                        />
                        <h3>Chat with {activeConnection.name}</h3>
                    </div>
                    <div className="chat-box">
                        {/* Displaying the chat messages */}
                        {messages.length === 0 ? (
                            <p>No messages yet.</p>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                    <p>{msg.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Message input section */}
                    <div className="chat-input">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Connections;
