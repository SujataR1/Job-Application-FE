// import React from 'react';
// import './Network.css';

// const Groups = () => {
//   // Add image property to each group
//   const groups = [
//     { groupName: 'Frontend Developers', members: '500 members', image: 'https://via.placeholder.com/' },
//     { groupName: 'Product Managers', members: '200 members', image: 'https://via.placeholder.com/' },
//     { groupName: 'Data Science Enthusiasts', members: '800 members', image: 'https://via.placeholder.com/' },
//   ];

//   return (
//     <div className="groups">
//       <h3>Your Groups</h3>
//       <ul>
//         {groups.map((group, index) => (
//           <li key={index} className="group-item">
//             <div className="group-info">
//               {/* Add group image with name */}
//               <div className="group-img">
//                 <img src={group.image} alt={group.groupName} />
//               </div>
//               <div className="group-details">
//                 <span className="group-name">{group.groupName}</span>
//                 <span className="group-members">{group.members}</span>
//               </div>
//             </div>
//             <button className="view-group-button">View Group</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Groups;


import React from 'react';

const Groups = () => {
  return (
    <div>
      <h2>Groups</h2>
      <p>This is the Groups page content.</p>
    </div>
  );
};

export default Groups;
