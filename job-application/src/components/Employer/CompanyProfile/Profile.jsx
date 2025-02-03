import React, { useState } from "react";
import "./Profile.css";
import EmployerNavbar from "../Navbar/Navbar";
import EmployerSidebar from '../Sidebar/Sidebar';
import axios from "axios";

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
  const [companyLogo, setCompanyLogo] = useState(companyData.logo);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAbout, setCompanyAbout] = useState("");
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

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
    document.getElementById("logo-input").click(); // Trigger file input click when logo is clicked
  };

  // Function to handle form submission for creating a company
  const handleCreateCompany = async (event) => {
    event.preventDefault();

    if (!companyName || !companyDescription || !companyWebsite || !companyAbout) {
      setFormError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:7000/companies/create",
        {
          name: companyName,
          description: companyDescription,
          websiteLink: companyWebsite,
          about: companyAbout,
        },
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFormSuccess("Company created successfully!");
        setIsCreatingCompany(false); // Close the form after successful submission
      }
    } catch (error) {
      setFormError("Failed to create company. Please try again.");
      console.error(error);
    }
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
            style={{ display: "none" }} // Hide the file input
            accept="image/*" // Only allow image files
            onChange={handleLogoChange} // Handle image file change
          />

          {/* Option to create a new company */}
          <button
            className="create-company-button"
            onClick={() => setIsCreatingCompany(true)}
          >
            Create New Company
          </button>

          {/* Create Company Form */}
          {isCreatingCompany && (
            <form onSubmit={handleCreateCompany} className="create-company-form">
              <h2>Create Company</h2>

              {formError && <p className="error">{formError}</p>}
              {formSuccess && <p className="success">{formSuccess}</p>}

              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder="Enter company description"
                />
              </div>

              <div>
                <label>Website Link</label>
                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="Enter website URL"
                />
              </div>

              <div>
                <label>About</label>
                <textarea
                  value={companyAbout}
                  onChange={(e) => setCompanyAbout(e.target.value)}
                  placeholder="About the company"
                />
              </div>

              <button type="submit" className="submit-button">
                Create Company
              </button>
            </form>
          )}

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
            <p>
              Website:{" "}
              <a href={companyData.website} target="_blank" rel="noopener noreferrer">
                {companyData.website}
              </a>
            </p>
            <div className="social-links">
              <a href={companyData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={companyData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href={companyData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </section>

          {/* Job Listings */}
          <section className="job-listings">
            <h2>Job Listings</h2>
            <ul>
              {companyData.jobs.map((job, index) => (
                <li key={index}>
                  <h3>{job.title}</h3>
                  <p>{job.location}</p>
                  <p>{job.description}</p>
                  <p>
                    <em>Posted on {job.postedDate}</em>
                  </p>
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
