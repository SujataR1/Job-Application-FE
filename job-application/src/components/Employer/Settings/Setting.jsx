import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setting.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const EmployerSettings = () => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    searchableProfile: true,
    allowMessagesfromStrangers: true,
    twoFaEnabled: false,
    companyPageWriteAccess: false,
    lookingToApply: true,
    lookingToRecruit: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);  // Show password modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); // Show delete confirmation modal
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
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
        const response = await fetch('http://localhost:7000/user-settings', {
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

  // Handle toggle switch changes
  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    // Disable "Looking to Recruit" if "Looking to Apply" is checked, and vice versa
    if (name === 'lookingToApply' && checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        lookingToApply: true,
        lookingToRecruit: false, // Disable "Looking to Recruit"
      }));
    } else if (name === 'lookingToRecruit' && checked) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        lookingToRecruit: true,
        lookingToApply: false, // Disable "Looking to Apply"
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
    }
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
      const response = await fetch('http://localhost:7000/user-settings', {
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

  // Handle password change form submission
  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:7000/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
        setError('');
        setShowChangePasswordModal(false);
      } else {
        setError(data.message || 'Failed to change password');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing password.');
      setSuccessMessage('');
    }
  };

  // Handle account deletion form submission
  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to delete your account.');
      return;
    }

    if (!deletePassword) {
      setError('Please enter your password to confirm account deletion.');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/auth/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account deleted successfully!');
        setError('');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(data.message || 'Failed to delete account');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('An error occurred while deleting your account.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="settings-page">
      <EmployerNavbar />
      <div className="settings-content flex justify-center items-center min-h-screen bg-gray-100">
        <div className="settings-container flex flex-row">
          <EmployerSidebar />
          <div className="settings-form-container">
            <h2>Account Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
              {/* Toggle Switches for settings */}
              <div className="settings-item">
                <label>Private Profile</label>
                <input
                  type="checkbox"
                  name="privateProfile"
                  checked={settings.privateProfile}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Searchable Profile</label>
                <input
                  type="checkbox"
                  name="searchableProfile"
                  checked={settings.searchableProfile}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Allow Messages from Strangers</label>
                <input
                  type="checkbox"
                  name="allowMessagesfromStrangers"
                  checked={settings.allowMessagesfromStrangers}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Two Factor Authentication (2FA)</label>
                <input
                  type="checkbox"
                  name="twoFaEnabled"
                  checked={settings.twoFaEnabled}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Company Page Write Access</label>
                <input
                  type="checkbox"
                  name="companyPageWriteAccess"
                  checked={settings.companyPageWriteAccess}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Looking to Apply</label>
                <input
                  type="checkbox"
                  name="lookingToApply"
                  checked={settings.lookingToApply}
                  onChange={handleToggleChange}
                />
              </div>

              <div className="settings-item">
                <label>Looking to Recruit</label>
                <input
                  type="checkbox"
                  name="lookingToRecruit"
                  checked={settings.lookingToRecruit}
                  onChange={handleToggleChange}
                  disabled={settings.lookingToApply}
                />
              </div>

              <button type="submit" className="submit-button">
                Save Changes
              </button>
            </form>

            {/* Display success or error message */}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Delete Account Form */}
            <button
              className="delete-account-button"
              onClick={() => setShowDeleteConfirmModal(true)}
            >
              Delete Account
            </button>

            {/* Change Password Button */}
            <button
              className="change-password-button"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </button>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmModal && (
              <div className="delete-confirm-modal">
                <div className="delete-confirm-modal-content">
                  <h3>Are you sure you want to delete your account?</h3>
                  <form onSubmit={handleDeleteAccount}>
                    <div className="form-group">
                      <label>Enter Password to Confirm</label>
                      <input
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="confirm-delete-button">
                      Confirm Deletion
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowDeleteConfirmModal(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Change Password Modal */}
            {showChangePasswordModal && (
              <div className="change-password-modal">
                <div className="change-password-modal-content">
                  <h3>Change Your Password</h3>
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="change-button">
                        Change Password
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setShowChangePasswordModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  {error && <div className="error-message">{error}</div>}
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSettings;
