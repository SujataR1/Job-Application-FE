import React, { useState } from 'react';
import './Setting.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const CompanySettings = () => {
  // Dummy company data
  const [companyName, setCompanyName] = useState('Tech Solutions');
  const [companyEmail, setCompanyEmail] = useState('contact@techsolutions.com');
  const [companyWebsite, setCompanyWebsite] = useState('https://www.techsolutions.com');
  
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [allowJobPosting, setAllowJobPosting] = useState(true);
  
  // Handler functions
  const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
  const handleCompanyEmailChange = (e) => setCompanyEmail(e.target.value);
  const handleCompanyWebsiteChange = (e) => setCompanyWebsite(e.target.value);

  const handleNotificationToggle = () => setReceiveNotifications(!receiveNotifications);
  const handleJobPostingToggle = () => setAllowJobPosting(!allowJobPosting);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to a database or API
    alert('Settings saved successfully!');
  };

  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />

    <div className="settings-container">
      <h2>Company Settings</h2>
      <form className="settings-form" onSubmit={handleSaveSettings}>
        
        {/* Profile Settings */}
        <div className="settings-section">
          <h3>Company Profile</h3>
          <div className="form-group">
            <label>Company Name</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={handleCompanyNameChange} 
              placeholder="Enter company name" 
              required
            />
          </div>
          <div className="form-group">
            <label>Company Email</label>
            <input 
              type="email" 
              value={companyEmail} 
              onChange={handleCompanyEmailChange} 
              placeholder="Enter company email" 
              required
            />
          </div>
          <div className="form-group">
            <label>Company Website</label>
            <input 
              type="url" 
              value={companyWebsite} 
              onChange={handleCompanyWebsiteChange} 
              placeholder="Enter company website" 
              required
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="form-group">
            <label>Receive Application Notifications</label>
            <input 
              type="checkbox" 
              checked={receiveNotifications} 
              onChange={handleNotificationToggle} 
            />
          </div>
        </div>

        {/* Job Posting Preferences */}
        <div className="settings-section">
          <h3>Job Posting Preferences</h3>
          <div className="form-group">
            <label>Allow Job Posting</label>
            <input 
              type="checkbox" 
              checked={allowJobPosting} 
              onChange={handleJobPostingToggle} 
            />
          </div>
        </div>

        <button type="submit" className="save-button">Save Settings</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CompanySettings;
