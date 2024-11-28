import React from 'react';
import './Network.css';

const Invitations = () => {
  const invitations = [
    { name: 'Tom Hanks', message: 'Invites you to connect' },
    { name: 'Julia Roberts', message: 'Invites you to join the Data Science Group' },
    { name: 'Denzel Washington', message: 'Invites you to join the Developers Group' },
  ];

  return (
    <div className="invitations">
      <h3>Invitations</h3>
      <ul>
        {invitations.map((invitation, index) => (
          <li key={index} className="invitation-item">
            <div className="invitation-info">
              <span className="invitation-name">{invitation.name}</span>
              <span className="invitation-message">{invitation.message}</span>
            </div>
            <button className="accept-button">Accept</button>
            <button className="decline-button">Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invitations;
