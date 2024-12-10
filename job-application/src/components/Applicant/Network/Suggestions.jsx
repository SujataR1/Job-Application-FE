import React from 'react';
import './Network.css';

const Suggestions = () => {
  const suggestions = [
    { name: 'Alice Cooper', position: 'UI/UX Designer' },
    { name: 'Michael Smith', position: 'Full-stack Developer' },
    { name: 'Sara Lee', position: 'Marketing Specialist' },
  ];

  return (
    <div className="suggestions">
      <h3>People You May Know</h3>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-itemm">
            <div className="suggestion-info">
              <span className="suggestion-name">{suggestion.name}</span>
              <span className="suggestion-position">{suggestion.position}</span>
            </div>
            <button className="connect-button">Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
