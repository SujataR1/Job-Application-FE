import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import './addcompany.css'; // Ensure you have a CSS file for styling.

const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');
  const [tags, setTags] = useState([]); // New state to handle tags
  const [errorMessage, setErrorMessage] = useState('');
  const [companies, setCompanies] = useState([]); // To hold the list of companies
  const [selectedCompany, setSelectedCompany] = useState(null); // To store selected company for update
  const [showDeletePopup, setShowDeletePopup] = useState(false); // To manage delete popup visibility
  const [companyToDelete, setCompanyToDelete] = useState(null); // To store company info for deletion
  const [showEditPopup, setShowEditPopup] = useState(false); // To manage edit popup visibility
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

  // Handle company deletion
  const handleDeleteCompany = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:7000/companies/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId: companyToDelete.id }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Show success message
        setCompanies(companies.filter((company) => company.id !== companyToDelete.id));
        setShowDeletePopup(false); // Close the delete popup
      } else {
        const errorData = await response.json();
        console.error("Error deleting company:", errorData);
        setErrorMessage(errorData.message || 'Failed to delete company. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      setErrorMessage('An error occurred while deleting the company.');
    }
  };

  // Handle creating a company
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
      tags: tags,
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
        setTags([]);
        fetchCompanies();
        navigate('/add-company');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to add company. Please try again.');
      }
    } catch (error) {
      console.error('Error adding company:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Handle updating a company
  const handleUpdateCompany = async (e) => {
    e.preventDefault();

    if (!companyName || !companyDescription || !companyWebsite || !companyAbout) {
      setErrorMessage('All fields are required.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = {
      companyId: selectedCompany.id,
      updateData: {
        name: companyName,
        description: companyDescription,
        websiteLink: companyWebsite,
        about: companyAbout,
        tags: tags,
      }
    };

    try {
      const response = await fetch('http://localhost:7000/companies/update', {
        method: 'PATCH',  // Changed from 'POST' to 'PATCH'
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Company "${result.company.name}" updated successfully!`);
        setCompanyName('');
        setCompanyDescription('');
        setCompanyWebsite('');
        setCompanyAbout('');
        setTags([]);
        setSelectedCompany(null); // Reset selected company after update
        setShowEditPopup(false); // Close the edit popup
        fetchCompanies();
        navigate('/add-company');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to update company. Please try again.');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      setErrorMessage('An error occurred while updating the company.');
    }
  };

  // Handle form inputs when editing a company
  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setCompanyName(company.name);
    setCompanyDescription(company.description);
    setCompanyWebsite(company.websiteLink);
    setCompanyAbout(company.about);
    setTags(company.tags || []);
    setShowEditPopup(true); // Show the edit popup
  };

  return (
    <div className="add-company-container">
      <div className="form-container">
        <h2 className="form-heading">{selectedCompany ? "Update Company" : "Add a New Company"}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={selectedCompany ? handleUpdateCompany : handleSubmit} className="company-form">
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

          <div className="input-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={tags.join(", ")}
              onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
              placeholder="Enter tags separated by commas"
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">{selectedCompany ? "Update Company" : "Add Company"}</button>
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
                <p className="company-tags">
                  Tags: {company.tags && company.tags.length > 0 ? company.tags.join(", ") : "No tags"}
                </p>
                <button
                  className="delete-button"
                  onClick={() => {
                    setCompanyToDelete(company);
                    setShowDeletePopup(true);
                  }}
                >
                  Delete
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditCompany(company)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No companies added yet.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Are you sure you want to delete this company?</h3>
            <div className="popup-buttons">
              <button onClick={handleDeleteCompany}>Yes, Delete</button>
              <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Company Popup */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Edit Company</h3>
            <form onSubmit={handleUpdateCompany}>
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

              <div className="input-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  value={tags.join(", ")}
                  onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
                  placeholder="Enter tags separated by commas"
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" className="submit-button">Update Company</button>
              <button type="button" className="cancel-button" onClick={() => setShowEditPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCompany;

