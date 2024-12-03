import React, { useState } from 'react';
import './Jobs.css'; // Importing the CSS file

const Job = () => {
  const [activeOption, setActiveOption] = useState(null); // Track which option is active

  const handleClick = (option) => {
    setActiveOption(option); // Set the active option when clicked
  };

  const renderAdditionalOptions = () => {
    switch (activeOption) {
      case 'Top Locations':
        return (
          <ul>
            <li>Delhi</li>
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Hyderabad</li>
          </ul>
        );
      case 'Top Companies':
        return (
          <ul>
            <li>Google</li>
            <li>Microsoft</li>
            <li>Meta</li>
            <li>Amazon</li>
          </ul>
        );
      case 'Explore More Jobs':
        return (
          <ul>
            <li>Software Engineer</li>
            <li>Product Manager</li>
            <li>HR Manager</li>
            <li>Data Scientist</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="job-section">
      <div className="job-options">
        <div
          className="job-option"
          onMouseEnter={() => setActiveOption(null)} // Hide options on hover out
        >
          Jobs
          <div className="dropdown">
            <ul>
              <li onClick={() => handleClick('Top Locations')}>Top Locations</li>
              <li onClick={() => handleClick('Top Companies')}>Top Companies</li>
              <li onClick={() => handleClick('Explore More Jobs')}>Explore More Jobs</li>
            </ul>
          </div>
        </div>
      </div>
      {activeOption && (
        <div className="additional-options">
          <h4>{activeOption}</h4>
          {renderAdditionalOptions()}
        </div>
      )}
    </div>
  );
};

export default Job;
