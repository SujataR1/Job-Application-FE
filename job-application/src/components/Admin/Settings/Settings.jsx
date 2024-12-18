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

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [passwordForDeletion, setPasswordForDeletion] = useState('');
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
  }, [navigate]);

  // Handle toggle switch changes for Admin settings
  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
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

    // Ensure password for deletion is entered
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
            Authorization: ` ${token}`, // Include the Authorization token
          },
          body: JSON.stringify({ password: passwordForDeletion }), // Pass password in the body
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('Account deleted successfully.');
          localStorage.removeItem('token'); // Log the user out
          navigate('/login'); // Redirect to login page
        } else {
          setError(data.message || 'Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('An error occurred while deleting your account.');
      }
    }
  };

  return (
    <div className="admin-settings-page">
      <AdminNavbar />
      <div className="admin-settings-content flex justify-center items-center min-h-screen bg-gray-100">
        <div className="admin-settings-container flex flex-row">
          <AdminSidenavbar />
          <div className="admin-settings-form-container">
            <h2>Admin Settings</h2>
            <form onSubmit={handleSubmit} className="admin-settings-form">
              <div className="settings-item">
                <label>Allow User Registration</label>
                <input
                  type="checkbox"
                  name="allowUserRegistration"
                  checked={settings.allowUserRegistration}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Enable Job Post Approval</label>
                <input
                  type="checkbox"
                  name="enableJobPostApproval"
                  checked={settings.enableJobPostApproval}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Restrict Inactive Accounts</label>
                <input
                  type="checkbox"
                  name="restrictInactiveAccounts"
                  checked={settings.restrictInactiveAccounts}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Allow Job Posting Without Verification</label>
                <input
                  type="checkbox"
                  name="allowJobPostingWithoutVerification"
                  checked={settings.allowJobPostingWithoutVerification}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Admin Panel Access</label>
                <input
                  type="checkbox"
                  name="adminPanelAccess"
                  checked={settings.adminPanelAccess}
                  onChange={handleToggleChange}
                />
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
