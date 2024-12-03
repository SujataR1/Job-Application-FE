// import React from 'react';
// import './Network.css';

// const Connections = () => {
//   // Add image property to each connection
//   const connections = [
//     { name: 'John Doe', position: 'Software Engineer', image: 'https://via.placeholder.com/' },
//     { name: 'Jane Smith', position: 'Product Manager', image: 'https://via.placeholder.com/' },
//     { name: 'Mark Johnson', position: 'Data Scientist', image: 'https://via.placeholder.com/' },
//     { name: 'Mark Jukerbarg', position: 'Owner', image: 'https://via.placeholder.com/' },
//   ];

//   return (
//     <div className="connections">
//       <h3>Your Connections</h3>
//       <ul>
//         {connections.map((connection, index) => (
//           <li key={index} className="connection-item">
//             <div className="connection-info">
//               {/* Add image with name and position */}
//               <div className="connection-img">
//                 <img src={connection.image} alt={connection.name} />
//               </div>
//               <div className="connection-details">
//                 <span className="connection-name">{connection.name}</span>
//                 <span className="connection-position">{connection.position}</span>
//               </div>
//             </div>
//             <button className="message-button">Message</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


import React from 'react';
// Sample data for people you may know (you can replace this with real data)
const peopleYouMayKnow = [
  { id: 1, name: 'Alice Johnson', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob Smith', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 3, name: 'Charlie Brown', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'David Lee', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 5, name: 'Eve Taylor', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
];

const Connections = () => {
  return (
    <div>
      <h2>Connections</h2>
      <p></p>

      {/* People you may know from your college */}
      <section>
        <h3>People you may know from your college</h3>
        <div className="people-list">
          {peopleYouMayKnow.map(person => (
            <div key={person.id} className="person-card">
              <img src={person.image} alt={person.name} className="person-image" />
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Connections;