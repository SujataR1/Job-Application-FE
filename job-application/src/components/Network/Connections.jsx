// import React from 'react';
// import './Network.css';

// const Connections = () => {
//   const connections = [
//     { name: 'John Doe', position: 'Software Engineer' },
//     { name: 'Jane Smith', position: 'Product Manager' },
//     { name: 'Mark Johnson', position: 'Data Scientist' },
//     { name: 'Mark Jukerbarg', position: 'Owner' },
//   ];

//   return (
//     <div className="connections">
//       <h3>Your Connections</h3>
//       <ul>
//         {connections.map((connection, index) => (
//           <li key={index} className="connection-item">
//             <div className="connection-info">
//               <span className="connection-name">{connection.name}</span>
//               <span className="connection-position">{connection.position}</span>
//             </div>
//             <button className="message-button">Message</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Connections;

import React from 'react';
import './Network.css';

const Connections = () => {
  // Add image property to each connection
  const connections = [
    { name: 'John Doe', position: 'Software Engineer', image: 'https://via.placeholder.com/' },
    { name: 'Jane Smith', position: 'Product Manager', image: 'https://via.placeholder.com/' },
    { name: 'Mark Johnson', position: 'Data Scientist', image: 'https://via.placeholder.com/' },
    { name: 'Mark Jukerbarg', position: 'Owner', image: 'https://via.placeholder.com/' },
  ];

  return (
    <div className="connections">
      <h3>Your Connections</h3>
      <ul>
        {connections.map((connection, index) => (
          <li key={index} className="connection-item">
            <div className="connection-info">
              {/* Add image with name and position */}
              <div className="connection-img">
                <img src={connection.image} alt={connection.name} />
              </div>
              <div className="connection-details">
                <span className="connection-name">{connection.name}</span>
                <span className="connection-position">{connection.position}</span>
              </div>
            </div>
            <button className="message-button">Message</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
