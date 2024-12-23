import React, { useState } from 'react'; // Add this line at the top
import './Companies.css'; // Ensure you have appropriate styling for this page
import AdminNavbar from '../Navbar/Navbar'; // Admin Navbar Component
import AdminSidenavbar from '../Sidenavbar/Sidenavbar'; // Admin Sidebar Component

// Company Form Component - For adding new company
const CompanyForm = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [jobOpenings, setJobOpenings] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = {
      id: Date.now(), // Create a unique ID for the new company
      name,
      location,
      industry,
      jobOpenings, // Save job openings count
    };

    // Save the new company and reset the form
    onSave(newCompany);
    setName('');
    setLocation('');
    setIndustry('');
    setJobOpenings(0);
  };

  return (
    <div className="form-container">
      <h2>Add New Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobOpenings">Job Openings</label>
          <input
            type="number"
            id="jobOpenings"
            value={jobOpenings}
            onChange={(e) => setJobOpenings(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">
            Add Company
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Manage Companies Page - Admin Panel
const ManageCompanies = () => {
  // Dummy data for companies with job openings count
  const [companies, setCompanies] = useState([
    { id: 1, name: 'ABC Corp', location: 'New York', industry: 'Software', jobOpenings: 3 },
    { id: 2, name: 'XYZ Inc', location: 'San Francisco', industry: 'Finance', jobOpenings: 5 },
    { id: 3, name: 'Tech Solutions', location: 'Austin', industry: 'IT Services', jobOpenings: 2 },
    { id: 4, name: 'Creative Studios', location: 'Los Angeles', industry: 'Design', jobOpenings: 0 },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  // Handle adding a new company
  const handleAddCompany = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]); // Add the new company to the list
    setIsFormVisible(false); // Close the form after saving the new company
  };

  // Handle closing the company form
  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  // Handle deleting a company
  const handleDeleteCompany = (companyId) => {
    setCompanies((prevCompanies) => prevCompanies.filter(company => company.id !== companyId));
  };

  return (
    <div className="manage-companies-page">
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="content-area">
          <h1>Manage Companies</h1>
          
          {/* Button to trigger the form to add a new company */}
          <button onClick={() => setIsFormVisible(true)} className="add-company-btn">
            Add New Company
          </button>

          {/* Display the company form if the form is visible */}
          {isFormVisible && (
            <CompanyForm onSave={handleAddCompany} onClose={handleCloseForm} />
          )}

          {/* Display the list of companies in a table */}
          <div className="company-list">
            <h2>Company List</h2>
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Industry</th>
                  <th>Job Openings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.location}</td>
                    <td>{company.industry}</td>
                    <td>{company.jobOpenings}</td>
                    <td>
                      {/* Delete button to remove the company */}
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
