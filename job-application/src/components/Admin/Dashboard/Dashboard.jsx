import React, { useState } from 'react';
import './Dashboard.css';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';
import axios from 'axios';

const Dashboard = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]);
  
  // Fetch companies the admin is involved in
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:7000/companies/involved');
      setCompanies(response.data.companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Handle adding a company
  const handleAddCompany = async () => {
    try {
      const response = await axios.post('http://localhost:7000/companies', {
        name: companyName,
        description: companyDescription,
        email: companyEmail,
      });
      alert(response.data.message);
      setCompanyName('');
      setCompanyDescription('');
      setCompanyEmail('');
      fetchCompanies(); // Refresh the companies list after adding
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  // Handle sending an invitation
  const handleSendInvitation = async () => {
    try {
      const response = await axios.post('http://localhost:7000/companies/invite', { email });
      alert(response.data.message);
      setEmail('');
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  // Fetch companies on initial render
  React.useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="home-page">
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2>Admin Dashboard</h2>
          </div>

          {/* Add Company Section */}
          <div className="add-company-section">
            <h3>Add New Company</h3>
            <form>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company Description</label>
                <textarea
                  placeholder="Enter company description"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Company Email</label>
                <input
                  type="email"
                  placeholder="Enter company email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={handleAddCompany}>
                Add Company
              </button>
            </form>
          </div>

          {/* Send Invitation Section */}
          <div className="send-invitation-section">
            <h3>Send Invitation to User</h3>
            <form>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={handleSendInvitation}>
                Send Invitation
              </button>
            </form>
          </div>

          {/* Companies Management Section */}
          <div className="companies-section">
            <h3>Companies You Are Involved In</h3>
            {companies.length === 0 ? (
              <p>No companies found.</p>
            ) : (
              <ul>
                {companies.map((company, index) => (
                  <li key={index}>
                    <strong>{company.name}</strong> - {company.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
