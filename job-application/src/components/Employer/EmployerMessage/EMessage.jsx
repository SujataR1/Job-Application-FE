import React, { useState } from 'react';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

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
    setSelectedConnection(connection);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() === '') return;

    const newMessage = {
      from: 1, // Dummy logged-in user
      to: selectedConnection.id,
      text: messageText,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const getMessages = () => {
    return messages.filter(
      (msg) =>
        (msg.from === 1 && msg.to === selectedConnection.id) ||
        (msg.to === 1 && msg.from === selectedConnection.id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar/Header */}
      <EmployerNavbar />

      <div className="flex">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-36">
          {selectedConnection ? (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-blue-600 px-6 py-4 flex items-center">
                <img
                  src={selectedConnection.profilePicture}
                  alt={`${selectedConnection.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <h3 className="text-2xl font-semibold text-white">
                  Chat with {selectedConnection.name}
                </h3>
              </div>

              {/* Chat History */}
              <div className="px-6 py-4 max-h-96 overflow-y-auto space-y-4 bg-gray-50">
                {getMessages().map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.from === 1 ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-center ${msg.from === 1 ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={
                          msg.from === 1
                            ? 'https://randomuser.me/api/portraits/men/5.jpg'
                            : selectedConnection.profilePicture
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full mx-2 object-cover"
                      />
                      <div
                        className={`px-4 py-3 rounded-lg max-w-xs ${
                          msg.from === 1
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-base">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="px-6 py-4 border-t border-gray-200">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows="3"
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            // Added extra margin-top (mt-16) here to create space between Navbar and the Connections card.
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Connections</h2>
              <ul className="space-y-4">
                {connections.map((connection) => (
                  <li
                    key={connection.id}
                    onClick={() => handleConnectionClick(connection)}
                    className="flex items-center p-4 bg-blue-600 text-white rounded-xl cursor-pointer transition-colors hover:bg-blue-700"
                  >
                    <img
                      src={connection.profilePicture}
                      alt={`${connection.name}'s profile`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <span className="text-xl">{connection.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMessage;
