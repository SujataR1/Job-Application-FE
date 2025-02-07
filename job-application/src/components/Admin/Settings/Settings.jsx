import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    allowUserRegistration: true,
    enableJobPostApproval: true,
    restrictInactiveAccounts: false,
    allowJobPostingWithoutVerification: false,
    adminPanelAccess: true,
  });

  const [darkMode, setDarkMode] = useState(false);  // State to manage dark mode
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [passwordForDeletion, setPasswordForDeletion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch settings from API on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/admin-settings', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setSettings(data); // Set fetched settings
        } else {
          setError(data.message || 'Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('An error occurred while fetching settings.');
      }
    };

    fetchSettings();

    // Check for dark mode preference in localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Apply dark mode class to body based on stored preference
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [navigate]);

  // Handle toggle switch changes for Admin settings
  const handleToggleChange = (event) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  // Dark mode toggle handler
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Store the user's dark mode preference in localStorage
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newMode;
    });
  };

  // Handle form submit (update settings)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to update settings.');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/admin-settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Settings updated successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to update settings');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('An error occurred while updating settings.');
      setSuccessMessage('');
    }
  };

  // Delete Account API Call
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to delete your account.');
      return;
    }

    if (!passwordForDeletion) {
      setError('Please enter your password to confirm deletion.');
      return;
    }

    if (window.confirm('Are you sure you want to delete your account? This action is permanent.')) {
      try {
        const response = await fetch('http://localhost:7000/auth/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
          body: JSON.stringify({ password: passwordForDeletion }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('Account deleted successfully.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(data.message || 'Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('An error occurred while deleting your account.');
      }
    }
  };

  // Filter settings based on search term
  const filteredSettings = Object.keys(settings).filter((key) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-settings-page">
      <AdminNavbar />
      <div className="admin-settings-content flex justify-center items-center min-h-screen bg-gray-100">
        <div className="admin-settings-container flex flex-row">
          <AdminSidenavbar />
          <div className="admin-settings-form-container">
            <h2>Admin Settings</h2>

            <div className="settings-search-bar">
              <input
                type="text"
                placeholder="Search Settings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <form onSubmit={handleSubmit} className="admin-settings-form">
              <div className="settings-category">
                <h3>Account Settings</h3>
                <div className="settings-item">
                  <label>Allow User Registration</label>
                  <input
                    type="checkbox"
                    name="allowUserRegistration"
                    checked={settings.allowUserRegistration}
                    onChange={handleToggleChange}
                  />
                  <p>Allow new users to register on the platform.</p>
                </div>

                <div className="settings-item">
                  <label>Restrict Inactive Accounts</label>
                  <input
                    type="checkbox"
                    name="restrictInactiveAccounts"
                    checked={settings.restrictInactiveAccounts}
                    onChange={handleToggleChange}
                  />
                  <p>Automatically disable accounts that have been inactive for a long period.</p>
                </div>
              </div>

              <div className="settings-category">
                <h3>Job Post Settings</h3>
                <div className="settings-item">
                  <label>Enable Job Post Approval</label>
                  <input
                    type="checkbox"
                    name="enableJobPostApproval"
                    checked={settings.enableJobPostApproval}
                    onChange={handleToggleChange}
                  />
                  <p>Require admin approval for job posts before they go live.</p>
                </div>

                <div className="settings-item">
                  <label>Allow Job Posting Without Verification</label>
                  <input
                    type="checkbox"
                    name="allowJobPostingWithoutVerification"
                    checked={settings.allowJobPostingWithoutVerification}
                    onChange={handleToggleChange}
                  />
                  <p>Allow recruiters to post jobs without verifying their account.</p>
                </div>
              </div>

              <div className="settings-category">
                <h3>Admin Settings</h3>
                <div className="settings-item">
                  <label>Admin Panel Access</label>
                  <input
                    type="checkbox"
                    name="adminPanelAccess"
                    checked={settings.adminPanelAccess}
                    onChange={handleToggleChange}
                  />
                  <p>Give admin access to manage platform settings and user accounts.</p>
                </div>
              </div>

              <div className="settings-category">
                <h3>Theme Settings</h3>
                <div className="settings-item">
                  <label>Enable Dark Mode</label>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                  />
                  <p>Switch between light and dark mode for the admin panel interface.</p>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Save Changes
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button
              className="delete-account-button"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete Account
            </button>

            {showDeleteAccountModal && (
              <div className="delete-account-modal">
                <div className="delete-account-modal-content">
                  <h3>Are you sure you want to delete your account?</h3>
                  <p>This action is permanent and cannot be undone.</p>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={passwordForDeletion}
                      onChange={(e) => setPasswordForDeletion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowDeleteAccountModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
