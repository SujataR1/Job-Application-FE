import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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
        const response = await fetch('http://localhost:7000/user-settings', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setSettings(data);
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

    if (name === 'lookingToApply' && checked) {
      setSettings((prev) => ({
        ...prev,
        lookingToApply: true,
        lookingToRecruit: false,
      }));
    } else if (name === 'lookingToRecruit' && checked) {
      setSettings((prev) => ({
        ...prev,
        lookingToRecruit: true,
        lookingToApply: false,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
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

  // Toggle Two-Factor Authentication (2FA)
  const handleToggle2FA = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to toggle 2FA.');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/auth/toggle-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSettings((prev) => ({
          ...prev,
          twoFaEnabled: !prev.twoFaEnabled,
        }));
        setSuccessMessage(data.message || '2FA status updated successfully.');
        setError('');
      } else {
        setError(data.message || 'Failed to update 2FA status.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      setError('An error occurred while toggling 2FA.');
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <EmployerNavbar />
      <div className="flex flex-1 p-5 flex-col md:flex-row">
        {/* Sidebar */}
        <EmployerSidebar />
        {/* Settings Form Container */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-10 ml-80 md:ml-96 max-w-3xl w-full mt-20 md:mt-20">
          <h2 className="text-3xl text-white font-medium uppercase tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg shadow-md text-center mx-auto max-w-lg">
            Account Settings
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            {/* Private Profile */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Private Profile</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="privateProfile"
                  checked={settings.privateProfile}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Searchable Profile */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Searchable Profile</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="searchableProfile"
                  checked={settings.searchableProfile}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Allow Messages from Strangers */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Allow Messages from Strangers</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="allowMessagesfromStrangers"
                  checked={settings.allowMessagesfromStrangers}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Two Factor Authentication (2FA) */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Two Factor Authentication (2FA)</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="twoFaEnabled"
                  checked={settings.twoFaEnabled}
                  onChange={handleToggle2FA}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Company Page Write Access */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Company Page Write Access</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="companyPageWriteAccess"
                  checked={settings.companyPageWriteAccess}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Looking to Apply */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Looking to Apply</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="lookingToApply"
                  checked={settings.lookingToApply}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            {/* Looking to Recruit */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-gray-600 font-bold">Looking to Recruit</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="lookingToRecruit"
                  checked={settings.lookingToRecruit}
                  onChange={handleToggleChange}
                  disabled={settings.lookingToApply}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-1/2 mx-auto">
              Save Changes
            </button>
          </form>
          {error && (
            <div className="bg-red-500 text-white text-center py-2 mt-4 rounded">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-500 text-white text-center py-2 mt-4 rounded">
              {successMessage}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowDeleteAccountModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Account
            </button>
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Are you sure you want to delete your account?
            </h3>
            <p className="mb-4 text-center">
              This action is permanent and cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                value={passwordForDeletion}
                onChange={(e) => setPasswordForDeletion(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Change Your Password</h3>
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && (
              <div className="bg-red-500 text-white text-center py-2 mt-4 rounded">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500 text-white text-center py-2 mt-4 rounded">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerSettings;
