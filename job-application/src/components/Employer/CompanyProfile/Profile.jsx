import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import EmployerNavbar from "../Navbar/Navbar";
import EmployerSidebar from '../Sidebar/Sidebar';

const CompanyProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasJobPermission, setHasJobPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoUploadError, setLogoUploadError] = useState("");
  const [isLogoUploaded, setIsLogoUploaded] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState(""); // State for email to invite
  const [otp, setOtp] = useState(""); // State for OTP input
  const navigate = useNavigate();

  // Fetch all companies
  const fetchCompanies = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/companies/all', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: "1-10" }) // Adjust the limit as per your needs
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        console.error("Error fetching companies:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Check if the user is an admin of the selected company
  const checkAdminStatus = async (companyId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/companies/admin', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const isAdmin = data.companies.some((company) => company.id === companyId);
        setIsAdmin(isAdmin);
      } else {
        console.error("Error checking admin status:", await response.json());
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  // Check if the user has job posting permissions for the selected company
  const checkJobPermissions = async (companyId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/companies/job-permissions', {
        method: 'GET',
        headers: {
          'Authorization': ` ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const hasPermission = data.companies.some((company) => company.id === companyId);
        setHasJobPermission(hasPermission);
      } else {
        console.error("Error checking job posting permissions:", await response.json());
      }
    } catch (error) {
      console.error("Error checking job posting permissions:", error);
    }
  };

  // Handle company selection
  const handleCompanySelect = async (e) => {
    const companyId = e.target.value;
    const selected = companies.find(company => company.id === companyId);
    setSelectedCompany(selected);
    setErrorMessage(""); // Clear previous errors

    // Show description immediately after selection
    await checkAdminStatus(companyId);
    await checkJobPermissions(companyId);

    // Fetch the logo for the selected company
    fetchLogo(companyId);
  };

  // Fetch logo of a specific company
  const fetchLogo = async (companyId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/logo`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.blob();
        const logoUrl = URL.createObjectURL(data);
        setLogo(logoUrl);
      } else {
        console.error("Error fetching logo:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  // Handle logo upload
  const handleLogoUpload = async (event) => {
    if (!isAdmin) {
      setLogoUploadError("You must be an admin to upload a logo.");
      return;
    }

    const companyId = selectedCompany.id;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      setIsLogoUploading(true);
      const response = await fetch(`http://localhost:7000/companies/${companyId}/logo`, {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsLogoUploaded(true);
        setIsLogoUploading(false);
        // Re-fetch the logo after uploading
        fetchLogo(companyId);
      } else {
        console.error("Error uploading logo:", await response.json());
        setIsLogoUploading(false);
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      setIsLogoUploading(false);
    }
  };

  // Navigate to the Add Company page
  const handleAddCompanyClick = () => {
    navigate('/add-company');
  };

  // Invite user via email
  const inviteUser = async (email) => {
    if (!selectedCompany) {
      setErrorMessage('Please select a company first.');
      return;
    }

    const token = localStorage.getItem('token');
    const companyId = selectedCompany.id; // Get the selected company ID from the state
    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/invite`, { // Use the correct endpoint
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send only the email
      });

      if (response.ok) {
        alert('Invitation sent successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error sending invitation:', errorData);
        setErrorMessage(errorData.message || 'Error sending invitation');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      setErrorMessage('Network error, please try again later.');
    }
  };

  // Verify OTP after user accepts invitation
  const verifyInvitationOTP = async (otp) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:7000/companies/verify-invitation', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        alert('OTP verified successfully! You are now acting on behalf of the admin.');
      } else {
        console.error('Error verifying OTP:', await response.json());
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="company-profile-container">
      <EmployerNavbar />
      <div className="main-content">
        <EmployerSidebar />
        <div className="company-profile">
          <header className="company-header">
            <div className="company-header-content">
              <h1>Select a Company</h1>
              {/* Dropdown for selecting company */}
              <select onChange={handleCompanySelect}>
                <option value="">-- Select a Company --</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </header>

          {/* Add Company Button */}
          <div className="add-company-button">
            <button onClick={handleAddCompanyClick}>Add a Company</button>
          </div>

          {/* Show error messages */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {logoUploadError && <div className="error-message">{logoUploadError}</div>}

          {/* Admin invitation UI */}
          {isAdmin && (
            <div className="invite-user">
              <h3>Invite User to Act on Behalf of Admin</h3>
              <input
                type="email"
                placeholder="Enter user's email"
                value={emailToInvite}
                onChange={(e) => setEmailToInvite(e.target.value)}
              />
              <button onClick={() => inviteUser(emailToInvite)}>Send Invitation</button>
            </div>
          )}

          {/* OTP verification UI for user */}
          {!isAdmin && (
            <div className="verify-invitation">
              <h3>Enter OTP to Verify Invitation</h3>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={() => verifyInvitationOTP(otp)}>Verify OTP</button>
            </div>
          )}

          {/* Show selected company details immediately */}
          {selectedCompany && (
            <div className="company-description">
              {/* Display the logo if uploaded */}
              {logo && (
                <div className="company-logo">
                  <h3>Company Logo</h3>
                  <img src={logo} alt="Company Logo" />
                </div>
              )}

              <h2>Company Details</h2>
              <p><strong>Name:</strong> {selectedCompany.name}</p>
              <p><strong>Description:</strong> {selectedCompany.description}</p>
              <p><strong>Website:</strong> <a href={selectedCompany.websiteLink} target="_blank" rel="noopener noreferrer">{selectedCompany.websiteLink}</a></p>
              <p><strong>About:</strong> {selectedCompany.about}</p>
            </div>
          )}

          {/* Show admin status and job posting permissions */}
          {selectedCompany && (
            <div className="admin-job-permission-status">
              <p><strong>Admin:</strong> {isAdmin ? "Yes" : "No"}</p>
              <p><strong>Job Posting Permission:</strong> {hasJobPermission ? "Yes" : "No"}</p>
            </div>
          )}

          {/* Show logo upload if the user is an admin */}
          {isAdmin && (
            <div className="logo-upload">
              <h3>Upload Logo</h3>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>
          )}

          {/* Show logo upload button */}
          {isLogoUploading && <div>Uploading...</div>}

          {/* Show Save button after logo upload */}
          {isLogoUploaded && (
            <button className="save-logo-button" onClick={() => alert('Logo saved successfully!')}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
