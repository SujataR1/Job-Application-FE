import React from 'react';
import './Network.css';

const Groups = () => {
  const groups = [
    { groupName: 'Frontend Developers', members: '500 members' },
    { groupName: 'Product Managers', members: '200 members' },
    { groupName: 'Data Science Enthusiasts', members: '800 members' },
  ];

  return (
    <div className="groups">
      <h3>Your Groups</h3>
      <ul>
        {groups.map((group, index) => (
          <li key={index} className="group-item">
            <div className="group-info">
              <span className="group-name">{group.groupName}</span>
              <span className="group-members">{group.members}</span>
            </div>
            <button className="view-group-button">View Group</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
