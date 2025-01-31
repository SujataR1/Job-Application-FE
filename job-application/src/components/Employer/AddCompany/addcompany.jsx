import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './addcompany.css'; // Ensure you have a CSS file for styling.

const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [companies, setCompanies] = useState([]); // To hold the list of companies
  const navigate = useNavigate();

  // Fetch the list of companies that the recruiter has added
  const fetchCompanies = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:7000/companies/all', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: "1-10" })
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        const error = await response.json();
        if (error.statusCode === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          console.error("Error fetching companies:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch companies when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !companyDescription || !companyWebsite || !companyAbout) {
      setErrorMessage('All fields are required.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = {
      name: companyName,
      description: companyDescription,
      websiteLink: companyWebsite,
      about: companyAbout,
    };

    try {
      const response = await fetch('http://localhost:7000/companies/create', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Company "${result.company.name}" created successfully!`);
        setCompanyName('');
        setCompanyDescription('');
        setCompanyWebsite('');
        setCompanyAbout('');
        setErrorMessage('');
        fetchCompanies();
        navigate('/employerdashboard');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to add company. Please try again.');
      }
    } catch (error) {
      console.error('Error adding company:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-company-container">
      <div className="form-container">
        <h2 className="form-heading">Add a New Company</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit} className="company-form">
          <div className="input-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="companyDescription">Company Description</label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="companyWebsite">Company Website</label>
            <input
              type="url"
              id="companyWebsite"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="companyAbout">About the Company</label>
            <textarea
              id="companyAbout"
              value={companyAbout}
              onChange={(e) => setCompanyAbout(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">Add Company</button>
        </form>
      </div>

      <div className="companies-list-container">
        <h3 className="companies-list-heading">Your Companies</h3>
        <div className="companies-list">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div key={company.id} className="company-item">
                <h4 className="company-name">{company.name}</h4>
                <p className="company-description">{company.description}</p>
                <p className="company-website">
                  Website: <a href={company.websiteLink} target="_blank" rel="noopener noreferrer">{company.websiteLink}</a>
                </p>
                <p className="company-about">About: {company.about}</p>
              </div>
            ))
          ) : (
            <p>No companies added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
