import React, { useState } from "react";
import "./Profile.css";
import EmployerNavbar from "../Navbar/Navbar";
import EmployerSidebar from '../Sidebar/Sidebar';

// Sample company data (could be fetched dynamically from an API)
const companyData = {
  name: "Tech Innovators",
  industry: "Software Development",
  founded: "2010",
  location: "San Francisco, CA",
  companySize: "500+ employees",
  overview:
    "Tech Innovators is a leading software development company focused on creating cutting-edge solutions for businesses around the world.",
  culture: "Innovation, Collaboration, Growth",
  website: "https://www.techinnovators.com",
  logo: "https://randomuser.me/api/portraits/men/1.jpg", // Company logo (sample)
  socialMedia: {
    linkedin: "https://linkedin.com/company/tech-innovators",
    twitter: "https://twitter.com/tech_innovators",
    facebook: "https://facebook.com/techinnovators"
  },
  jobs: [
    {
      title: "Software Engineer",
      location: "San Francisco, CA",
      description:
        "Join our team and help build innovative software solutions for global clients.",
      postedDate: "December 1, 2024",
    },
    {
      title: "Product Manager",
      location: "Remote",
      description:
        "Lead product development teams and drive product strategies for our flagship products.",
      postedDate: "November 25, 2024",
    },
  ],
  employees: [
    {
      name: "John Doe",
      position: "Software Engineer",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg", // Employee profile image
    },
    {
      name: "Jane Smith",
      position: "Product Manager",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg", // Employee profile image
    },
  ],
};

const CompanyProfile = () => {
  // State for company logo
  const [companyLogo, setCompanyLogo] = useState(companyData.logo);

  // Function to handle image change (file upload)
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result); // Update company logo with the selected file
      };
      reader.readAsDataURL(file); // Convert the selected file to data URL
    }
  };

  // Function to handle company logo click
  const handleLogoClick = () => {
    document.getElementById('logo-input').click(); // Trigger file input click when logo is clicked
  };

  return (
    <div className="home-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="company-profile">
          {/* Header Section */}
          <header className="company-header">
            <div className="header-content">
              <div className="company-logo" onClick={handleLogoClick}>
                <img src={companyLogo} alt={`${companyData.name} Logo`} />
              </div>
              <h1>{companyData.name}</h1>
              <p>{companyData.industry} | Founded: {companyData.founded}</p>
              <p>{companyData.location} | {companyData.companySize}</p>
            </div>
          </header>

          {/* Hidden file input to select a new logo */}
          <input
            type="file"
            id="logo-input"
            style={{ display: 'none' }} // Hide the file input
            accept="image/*" // Only allow image files
            onChange={handleLogoChange} // Handle image file change
          />

          {/* Company Overview */}
          <section className="company-overview">
            <h2>Company Overview</h2>
            <p>{companyData.overview}</p>
          </section>

          {/* Company Culture */}
          <section className="company-culture">
            <h2>Company Culture</h2>
            <p>{companyData.culture}</p>
          </section>

          {/* Company Website & Social Links */}
          <section className="company-links">
            <h2>Company Links</h2>
            <p>Website: <a href={companyData.website} target="_blank" rel="noopener noreferrer">{companyData.website}</a></p>
            <div className="social-links">
              <a href={companyData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={companyData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href={companyData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </section>

          {/* Job Listings */}
          <section className="job-listings">
            <h2>Job Listings</h2>
            <ul>
              {companyData.jobs.map((job, index) => (
                <li key={index} className="job-listing">
                  <h3>{job.title}</h3>
                  <p>{job.location}</p>
                  <p>{job.description}</p>
                  <p><em>Posted on {job.postedDate}</em></p>
                  <button className="apply-button">Apply Now</button>
                </li>
              ))}
            </ul>
          </section>

          {/* Employees Section */}
          <section className="employees">
            <h2>Our Team</h2>
            <div className="employee-list">
              {companyData.employees.map((employee, index) => (
                <div key={index} className="employee-card">
                  <div className="profile-image">
                    <img src={employee.profilePicture} alt={employee.name} />
                  </div>
                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
