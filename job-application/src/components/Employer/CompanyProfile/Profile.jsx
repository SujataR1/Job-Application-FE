import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [limitRange, setLimitRange] = useState(10);

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
  const flagCompany = async (event) => {
    event.preventDefault();

    if (!selectedCompany) {
      alert("Please select a company to flag.");
      return;
    }

    if (!flagTag || !flagReason) {
      alert("Please provide a flag type and a reason for flagging the company.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("User authentication token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/companies/create-flag', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: selectedCompany.id,
          flagTag: flagTag,
          reasonForFlag: flagReason,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Unable to flag the company.");
      }

      alert("Company flagged successfully.");

      // Store companyId in localStorage after flag creation
      localStorage.setItem('companyId', selectedCompany.id);

      fetchFlags(); // Refresh the flagged company list after flagging

    } catch (error) {
      console.error("Error flagging company:", error);
      alert(`Error: ${error.message}`);
    }
  };
  const fetchFlags = async () => {
    const token = localStorage.getItem('token');
    const companyId = localStorage.getItem('companyId'); // Get companyId from localStorage

    if (!token) {
      alert("User authentication token is missing. Please log in again.");
      return;
    }

    if (!companyId) {
      alert("Company ID is missing. Please flag a company first.");
      return;
    }

    try {
      // Ensure that you are sending the companyId and limitRange in the correct format
      const response = await fetch('http://localhost:7000/companies/flags/company', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: companyId, // Fetch flags for the specific company
          limitRange: "1-10", // Set the range as needed
        }),
      });

      const data = await response.json();
      console.log("Flags API Response:", data);

      if (!response.ok) {
        throw new Error(data.message?.join(", ") || "Unable to fetch flags.");
      }

      setFlags(data.flags); // Update state with flagged companies

    } catch (error) {
      console.error("Error fetching flags:", error);
      alert(`Error: ${error.message}`);
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
        const errorData = await response.json();
        console.error('Error verifying OTP:', errorData);
        setErrorMessage(errorData.message || 'Error verifying OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Network error, please try again later.');
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <EmployerNavbar />
      <div className="flex flex-1">
        <EmployerSidebar />
        <div className="flex-1 p-20 space-y-8 max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Company Profile Management</h1>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Company</label>
                <select
                  onChange={handleCompanySelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">-- Choose a company --</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleAddCompanyClick}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                + Add New Company
              </button>
            </div>
          </div>

          {/* Company Details Section */}
          {selectedCompany && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-start gap-8">
                {logo && (
                  <div className="flex-shrink-0">
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="w-32 h-32 object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="space-y-2 flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCompany.name}</h2>
                  <p className="text-gray-600 text-sm">{selectedCompany.description}</p>
                  <a
                    href={selectedCompany.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-block"
                  >
                    {selectedCompany.websiteLink}
                  </a>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCompany.tags?.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Admin Status:</span>
                  <span className={`px-2 py-1 rounded ${isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isAdmin ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Job Permissions:</span>
                  <span className={`px-2 py-1 rounded ${hasJobPermission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {hasJobPermission ? 'Granted' : 'Restricted'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Management Sections */}
          {selectedCompany && (
            <div className="space-y-6">
              {/* Invitation Section */}
              {isAdmin && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Management</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="Enter user's email"
                        value={emailToInvite}
                        onChange={(e) => setEmailToInvite(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => inviteUser(emailToInvite)}
                        className="sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Send Invitation
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Management Section */}
              {isAdmin && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Controls</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={addAdmin}
                          className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Add Admin
                        </button>
                        <button
                          onClick={removeAdmin}
                          className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Remove Admin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Industry Management Section */}
              {isAdmin && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Management</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Enter Industry Name"
                      value={industryName}
                      onChange={(e) => setIndustryName(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={addIndustry}
                        className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Add Industry
                      </button>
                      <button
                        onClick={removeIndustry}
                        className="flex-1 sm:flex-none bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Remove Industry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Flag Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Flag Company</h3>
                <form onSubmit={flagCompany} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flag Type</label>
                    <select
                      value={flagTag}
                      onChange={(e) => setFlagTag(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Spam">Spam</option>
                      <option value="Abusive">Abusive Content</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                    <textarea
                      value={flagReason}
                      onChange={(e) => setFlagReason(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Submit Flag
                  </button>
                </form>
              </div>

              {/* Flagged Companies Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Flagged Companies</h3>
                  <button
                    onClick={fetchFlags}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Refresh List
                  </button>
                </div>
                {flags.length > 0 ? (
                  <div className="space-y-4">
                    {flags.map((flag) => (
                      <div key={flag.id} className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-700 font-medium">{flag.flagTag}</span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-600 text-sm">
                            {new Date(flag.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{flag.reasonForFlag}</p>
                        <p className="text-gray-500 text-xs">
                          Flagged by: {flag.user.fullName} ({flag.user.email})
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No flagged companies found</p>
                )}
              </div>

              {/* Logo Upload Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Logo</h3>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {isLogoUploading && (
                    <div className="text-blue-600 text-sm">Uploading logo...</div>
                  )}
                  {isLogoUploaded && (
                    <div className="text-green-600 text-sm">Logo uploaded successfully!</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;