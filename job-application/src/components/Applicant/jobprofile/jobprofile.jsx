import React, { useState } from 'react';
import './jobprofile.css';

const JobProfile = () => {
  const [jobPreferences, setJobPreferences] = useState({
    jobTitle: '',
    industry: '',
    location: '',
    employmentType: '',
  });

  const [desiredSalary, setDesiredSalary] = useState('');
  const [jobInterests, setJobInterests] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [jobAlerts, setJobAlerts] = useState(true); // Default to receiving job alerts

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to handle form submission, like sending data to a server
    alert('Job Profile updated successfully!');
  };

  return (
    <div className="job-profile-container">
      <h2>My Job Profile</h2>
      
      <form onSubmit={handleSubmit} className="job-profile-form">
        
        {/* Job Preferences */}
        <div className="section">
          <h3>Job Preferences</h3>
          <label>
            Preferred Job Title:
            <input
              type="text"
              value={jobPreferences.jobTitle}
              onChange={(e) => setJobPreferences({ ...jobPreferences, jobTitle: e.target.value })}
            />
          </label>
          
          <label>
            Industry:
            <input
              type="text"
              value={jobPreferences.industry}
              onChange={(e) => setJobPreferences({ ...jobPreferences, industry: e.target.value })}
            />
          </label>

          <label>
            Preferred Location:
            <input
              type="text"
              value={jobPreferences.location}
              onChange={(e) => setJobPreferences({ ...jobPreferences, location: e.target.value })}
            />
          </label>

          <label>
            Employment Type:
            <select
              value={jobPreferences.employmentType}
              onChange={(e) => setJobPreferences({ ...jobPreferences, employmentType: e.target.value })}
            >
              <option value="">Select</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
            </select>
          </label>
        </div>

        {/* Desired Salary */}
        <div className="section">
          <h3>Desired Salary</h3>
          <label>
            Expected Salary (per annum):
            <input
              type="number"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
            />
          </label>
        </div>

        {/* Job Interests */}
        <div className="section">
          <h3>Job Interests</h3>
          <label>
            Specific Roles of Interest:
            <textarea
              value={jobInterests}
              onChange={(e) => setJobInterests(e.target.value)}
              placeholder="e.g., Software Engineer, Data Scientist, Marketing Manager"
            />
          </label>
        </div>

        {/* Career Goals */}
        <div className="section">
          <h3>Career Goals</h3>
          <label>
            Describe your Career Goals:
            <textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="e.g., I want to work in a challenging environment, develop my leadership skills, etc."
            />
          </label>
        </div>

        {/* Job Alerts */}
        <div className="section">
          <h3>Job Alerts</h3>
          <label>
            Receive Job Alerts:
            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={() => setJobAlerts(!jobAlerts)}
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit">Save Profile</button>
        </div>
      </form>
    </div>
  );
};

export default JobProfile;
