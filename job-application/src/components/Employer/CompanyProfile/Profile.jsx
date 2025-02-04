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
  //const [logoUrl, setLogoUrl] = useState(null);
  const [emailToInvite, setEmailToInvite] = useState("");
  const [otp, setOtp] = useState("");
  const [industryName, setIndustryName] = useState(""); // State for industry name
  const [userId, setUserId] = useState(""); // State for user ID
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  // Track total pages
  const [flagReason, setFlagReason] = useState("");
  const [flags, setFlags] = useState([]);
  const [flagTag, setFlagTag] = useState("");  // Initialize flagTag state
  const [companyId, setCompanyId] = useState('');  // Company ID state
  const [limitRange, setLimitRange] = useState('');  // Limit Range state
 


  const navigate = useNavigate();

  // Fetch all companies with pagination
  const fetchCompanies = async (page = 1) => {
    const token = localStorage.getItem('token');
    const limit = 10; // Number of companies per page
    const start = (page - 1) * limit + 1; // Calculate the starting point
    const end = page * limit; // Calculate the endpoint

    try {
      const response = await fetch('http://localhost:7000/companies/all', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: `${start}-${end}` }), // Send limit as a range in "start-end" format
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Companies Data: ", data); // Log to check response
        setCompanies(data);
        setTotalPages(Math.ceil(data.length / limit)); // Calculate total pages based on response length
      } else {
        console.error("Error fetching companies:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };


  // Pagination handler
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchCompanies(newPage);
    }
  };

  // Fetch companies on mount and when the page changes
  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  // Handle company selection
  const handleCompanySelect = async (e) => {
    const companyId = e.target.value;
    const selected = companies.find(company => company.id === companyId);
    setSelectedCompany(selected);
    setErrorMessage(""); // Clear previous errors

    // Show description immediately after selection
    await checkAdminStatus(companyId);
    await checkJobPermissions(companyId);
  };

  const flagCompany = async () => {
    if (!selectedCompany) {
      alert("Please select a company to flag.");
      return;
    }
 
    // const token = localStorage.getItem('token');
 
    // Ensure that flagReason is provided and valid
    const flagCompany = async () => {
      // Ensure the company is selected
      if (!selectedCompany) {
        alert("Please select a company to flag.");
        return;
      }
   
      // Ensure that both flagTag and flagReason are provided
      if (!flagTag || !flagReason) {
        alert("Please provide a flag type and a reason for flagging the company.");
        return;
      }
   
      const token = localStorage.getItem('token');
   
      try {
        // Making the POST request to the backend API
        const response = await fetch('http://localhost:7000/companies/create-flag', {
          method: 'POST',
          headers: {
            'Authorization': `${token}`, // Use Bearer token for authorization
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: selectedCompany.id,  // The ID of the selected company
            flagTag: flagTag,                // The type of flag (e.g., Spam, Abusive)
            reasonForFlag: flagReason,       // The reason provided by the user
          }),
        });
   
        // Handle response from the backend
        if (response.ok) {
          alert("Company flagged successfully.");
        } else {
          const data = await response.json();
          alert(`Error: ${data.message || "Unable to flag the company."}`);
        }
      } catch (error) {
        console.error("Error flagging company:", error);
      }
    };
    const fetchFlags = async () => {
      const token = localStorage.getItem('token');
     
      try {
        const response = await fetch('http://localhost:7000/companies/flags/company', {
          method: 'POST',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: companyId,
            limitRange: limitRange,
          }),
        });
 
        if (response.ok) {
          const data = await response.json();
          setFlags(data); // Assuming setFlags is a state update function
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || "Unable to fetch flags"}`);
        }
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };
 
    useEffect(() => {
      fetchFlags(); // Call fetchFlags when the component mounts
    }, []);
  }

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

  // Fetch company logo
  const fetchCompanyLogo = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:7000/companies/${companyId}/logo`, {
        method: 'GET',
        headers: {
          'Authorization': ` ${token}`, // Ensure 'Bearer ' is required
        },
      });

      if (response.ok) {
        const data = await response.json(); // Assuming API returns { companyLogo: "URL_HERE" }
        setLogo(data.companyLogo); // Update the logo state
      } else {
        console.error("Error fetching logo:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching company logo:", error);
    }
  };

  // Handle logo upload
  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLogoUploading(true);
    setLogoUploadError(""); // Reset previous errors

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:7000/companies/${selectedCompany.id}/logo`, {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`, // Fix formatting
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLogo(data.companyLogo); // Set uploaded logo URL
        setIsLogoUploaded(true);
      } else {
        const errorData = await response.json();
        setLogoUploadError(errorData.message || "Failed to upload logo.");
      }
    } catch (error) {
      setLogoUploadError("An error occurred while uploading the logo.");
      console.error("Logo upload error:", error);
    } finally {
      setIsLogoUploading(false);
    }
  };

  // Fetch logo when a company is selected
  useEffect(() => {
    if (selectedCompany?.id) {
      fetchCompanyLogo(selectedCompany.id);
    }
  }, [selectedCompany]); // Remove logoUrl dependency



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
    const companyId = selectedCompany.id;
    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/invite`, {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
        alert('OTP verified successfully!');
      } else {
        console.error('Error verifying OTP:', await response.json());
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Add Industry to Company
  const addIndustry = async () => {
    if (!industryName) {
      setErrorMessage("Please provide an industry name.");
      return;
    }

    if (!selectedCompany) {
      setErrorMessage("Please select a company first.");
      return;
    }

    const token = localStorage.getItem('token');
    const companyId = selectedCompany.id;

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/industries`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ industryName }),
      });

      if (response.ok) {
        alert("Industry added successfully!");
        setIndustryName("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error adding industry.");
      }
    } catch (error) {
      console.error("Error adding industry:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };

  // Remove Industry from Company
  const removeIndustry = async () => {
    if (!industryName) {
      setErrorMessage("Please provide an industry name.");
      return;
    }

    if (!selectedCompany) {
      setErrorMessage("Please select a company first.");
      return;
    }

    const token = localStorage.getItem('token');
    const companyId = selectedCompany.id;

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/industries`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ industryName }),
      });

      if (response.ok) {
        alert("Industry removed successfully!");
        setIndustryName("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error removing industry.");
      }
    } catch (error) {
      console.error("Error removing industry:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };

  // Add User as Admin
  const addAdmin = async () => {
    if (!userId) {
      setErrorMessage("Please provide a user ID.");
      return;
    }

    if (!selectedCompany) {
      setErrorMessage("Please select a company first.");
      return;
    }

    const token = localStorage.getItem('token');
    const companyId = selectedCompany.id;

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/admins`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        alert("User added as admin successfully!");
        setUserId("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error adding user as admin.");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };

  // Remove User from Admin
  const removeAdmin = async () => {
    if (!userId) {
      setErrorMessage("Please provide a user ID.");
      return;
    }

    if (!selectedCompany) {
      setErrorMessage("Please select a company first.");
      return;
    }

    const token = localStorage.getItem('token');
    const companyId = selectedCompany.id;

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/admins`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        alert("User removed as admin successfully!");
        setUserId("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error removing user as admin.");
      }
    } catch (error) {
      console.error("Error removing admin:", error);
      setErrorMessage("Network error, please try again later.");
    }
  };
  const grantRecruitmentPermission = async (companyId, userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/recruitment-permissions`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'User granted recruitment permissions successfully');
      } else {
        console.error('Error granting recruitment permission:', await response.json());
      }
    } catch (error) {
      console.error('Error granting recruitment permission:', error);
    }
  };

  const revokeRecruitmentPermission = async (companyId, userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/recruitment-permissions`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'User recruitment permissions revoked successfully');
      } else {
        console.error('Error revoking recruitment permission:', await response.json());
      }
    } catch (error) {
      console.error('Error revoking recruitment permission:', error);
    }
  };

  const removeUserFromInvolved = async (companyId, userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:7000/companies/${companyId}/involved-users`, {
        method: 'DELETE',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'User removed as involved successfully');
      } else {
        console.error('Error removing user from involved:', await response.json());
      }
    } catch (error) {
      console.error('Error removing user from involved:', error);
    }
  };

  // Render pagination controls
  const renderPagination = () => (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );

  return (
    <div className="company-profile-container">
      <EmployerNavbar />
      <div className="main-content">
        <EmployerSidebar />
        <div className="company-profile">
          <header className="company-header">
            <div className="company-header-content">
              <h1>Select a Company</h1>
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
              <p><strong>Admin Status:</strong> {isAdmin ? "Yes" : "No"}</p>
              <p><strong>Job Posting Permission:</strong> {hasJobPermission ? "Yes" : "No"}</p>
            </div>
          )}

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

          {/* Add/Remove Admin */}
          {isAdmin && (
            <div className="admin-management">
              <h3>Manage Admins</h3>
              <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button onClick={addAdmin}>Add Admin</button>
              <button onClick={removeAdmin}>Remove Admin</button>
            </div>
          )}

          {/* Move Manage Recruitment Permissions Below Manage Admins */}
          {isAdmin && (
            <div className="recruitment-management">
              <h3>Manage Recruitment Permissions</h3>
              <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button onClick={() => grantRecruitmentPermission(selectedCompany?.id, userId)}>
                Add Recruitment Permission
              </button>
              <button onClick={() => revokeRecruitmentPermission(selectedCompany?.id, userId)}>
                Remove Recruitment Permission
              </button>

              {/* User ID Input for Removing a User */}
              <h3>Remove User from Company</h3>
              <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button onClick={() => removeUserFromInvolved(selectedCompany?.id, { userId })}>
                Remove User from Company
              </button>
            </div>
          )}

          {/* Add/Remove Industry */}
          {isAdmin && (
            <div className="industry-management">
              <h3>Manage Industries</h3>
              <input
                type="text"
                placeholder="Enter Industry Name"
                value={industryName}
                onChange={(e) => setIndustryName(e.target.value)}
              />
              <button onClick={addIndustry}>Add Industry</button>
              <button onClick={removeIndustry}>Remove Industry</button>
            </div>
          )}
          <select onChange={(e) => setSelectedCompany(companies.find(c => c.id === e.target.value))}>
            <option value="">Select a Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          <form onSubmit={flagCompany}>
  <label for="flagTag">Select Flag Type:</label>
  <select id="flagTag" value={flagTag} onChange={(e) => setFlagTag(e.target.value)}>
    <option value="Spam">Spam</option>
    <option value="Abusive">Abusive Content</option>
    <option value="Other">Other</option>
  </select>

  <label for="flagReason">Provide Reason:</label>
  <textarea id="flagReason" value={flagReason} onChange={(e) => setFlagReason(e.target.value)}></textarea>

  <button type="submit">Flag Company</button>
</form>

<div>
      <h3>Fetch Flags for Company</h3>
      <input
        type="text"
        placeholder="Enter Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}  // Update companyId state
      />
      <input
        type="text"
        placeholder="Enter Limit Range (e.g., 1-10)"
        value={limitRange}
        onChange={(e) => setLimitRange(e.target.value)}  // Update limitRange state
      />
      <button onClick={fetchFlags}>Fetch Flags</button>

      <div>
        <h4>Flags</h4>
        <ul>
          {flags.length === 0 ? (
            <li>No flags available</li>
          ) : (
            flags.map((flag, index) => (
              <li key={index}>{flag.reasonForFlag}</li>  // Display the reason for the flag
            ))
          )}
        </ul>
      </div>
    </div>

          <div>
            <label htmlFor="company-logo">Upload Company Logo:</label>
            <input
              type="file"
              id="company-logo"
              accept="image/*"
              onChange={handleLogoUpload}
            />
            {isLogoUploading && <p>Uploading...</p>}
            {isLogoUploaded && <p>Logo uploaded successfully!</p>}
          </div>


          {/* Pagination */}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};


export default CompanyProfile;