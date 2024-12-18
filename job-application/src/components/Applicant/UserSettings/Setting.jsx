// import React, { useState, useEffect } from 'react';
// import './Setting.css';

// const Setting = () => {
//   const [settings, setSettings] = useState({
//     privateProfile: false,
//     searchableProfile: true,
//     allowMessagesfromStrangers: true,
//     twoFaEnabled: false,
//     companyPageWriteAccess: false,
//     lookingToApply: false,
//     lookingToRecruit: false,
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user settings on component mount
//   useEffect(() => {
//     const fetchSettings = async () => {
//       const token = localStorage.getItem('token');
//       const refreshToken = localStorage.getItem('refreshToken');

//       if (!token) {
//         setError('You need to be logged in.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         // Try fetching the settings
//         const response = await fetch('http://localhost:7000/user-settings', {
//           method: 'GET',
//           headers: {
//             Authorization: `${token}`,
//           },
//         });

//         if (response.status === 401 && refreshToken) {
//           // If the token is invalid (401), try refreshing the token
//           const refreshResponse = await fetch('http://localhost:7000/auth/refresh-token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refreshToken }),
//           });

//           const refreshData = await refreshResponse.json();
//           if (refreshResponse.ok) {
//             // If refresh is successful, update the token and retry the original request
//             localStorage.setItem('token', refreshData.token);
//             const retryResponse = await fetch('http://localhost:7000/user-settings', {
//               method: 'GET',
//               headers: {
//                 Authorization: `${refreshData.token}`,
//               },
//             });

//             const retryData = await retryResponse.json();
//             setSettings(retryData);  // Set the settings directly
//             setIsLoading(false);
//           } else {
//             setError('Failed to refresh token. Please log in again.');
//             setIsLoading(false);
//           }
//         } else if (response.ok) {
//           const data = await response.json();
//           setSettings(data);  // Set the settings directly
//           setIsLoading(false);
//         } else {
//           setError('Failed to fetch settings.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       [name]: checked,
//     }));
//   };

//   const handleSave = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('You need to be logged in.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:7000/user-settings', {
//         method: 'PATCH',
//         headers: {
//           Authorization: `${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           privateProfile: settings.privateProfile,
//           searchableProfile: settings.searchableProfile,
//           allowMessagesfromStrangers: settings.allowMessagesfromStrangers,
//           twoFaEnabled: settings.twoFaEnabled,
//           companyPageWriteAccess: settings.companyPageWriteAccess,
//           lookingToApply: settings.lookingToApply,
//           lookingToRecruit: settings.lookingToRecruit,
//         }),
//       });

//       if (response.ok) {
//         alert('Settings saved successfully!');
//       } else {
//         setError('Failed to save settings');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h2>User Settings</h2>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="settings-options">
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="privateProfile"
//                   checked={settings.privateProfile}
//                   onChange={handleCheckboxChange}
//                 />
//                 Private Profile
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="searchableProfile"
//                   checked={settings.searchableProfile}
//                   onChange={handleCheckboxChange}
//                 />
//                 Searchable Profile
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="allowMessagesfromStrangers"
//                   checked={settings.allowMessagesfromStrangers}
//                   onChange={handleCheckboxChange}
//                 />
//                 Allow Messages from Strangers
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="twoFaEnabled"
//                   checked={settings.twoFaEnabled}
//                   onChange={handleCheckboxChange}
//                 />
//                 Two-Factor Authentication Enabled
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="companyPageWriteAccess"
//                   checked={settings.companyPageWriteAccess}
//                   onChange={handleCheckboxChange}
//                 />
//                 Company Page Write Access
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="lookingToApply"
//                   checked={settings.lookingToApply}
//                   onChange={handleCheckboxChange}
//                 />
//                 Looking to Apply
//               </label>
//             </div>
//             <div className="setting-item">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="lookingToRecruit"
//                   checked={settings.lookingToRecruit}
//                   onChange={handleCheckboxChange}
//                 />
//                 Looking to Recruit
//               </label>
//             </div>
//           </div>

//           <button onClick={handleSave}>Save Settings</button>

//           {error && <p className="error-message">{error}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Setting;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setting.css';

const Setting = () => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    searchableProfile: true,
    allowMessagesfromStrangers: true,
    twoFaEnabled: false,
    resumeUploadAccess: true,
    lookingForJob: true,
    jobRecommendations: true,
  });

  const [profilePhoto, setProfilePhoto] = useState(null); // State to store the profile photo
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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

  // Handle profile photo change
  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:7000/user-photo', {
          method: 'PATCH',
          headers: {
            Authorization: ` ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setProfilePhoto(URL.createObjectURL(file)); // Display the new photo locally
          setSuccessMessage('Profile photo updated successfully!');
        } else {
          setError(data.message || 'Failed to update profile photo');
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
        setError('An error occurred while uploading the photo.');
      }
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-content flex justify-center items-center min-h-screen bg-gray-100">
        <div className="settings-form-container">
          <h2>Account Settings</h2>
          {/* Profile Photo Section */}
          <div className="profile-photo">
            <h3>Profile Photo</h3>
            <div className="profile-photo-preview">
              <img
                src={profilePhoto || 'default-profile-photo.jpg'} // Display the current photo or a default
                alt="Profile"
                className="profile-photo-img"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="profile-photo-upload"
            />
          </div>

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
              <label>Resume Upload Access</label>
              <input
                type="checkbox"
                name="resumeUploadAccess"
                checked={settings.resumeUploadAccess}
                onChange={handleToggleChange}
              />
            </div>

            <div className="settings-item">
              <label>Looking for Job</label>
              <input
                type="checkbox"
                name="lookingForJob"
                checked={settings.lookingForJob}
                onChange={handleToggleChange}
              />
            </div>

            <div className="settings-item">
              <label>Job Recommendations</label>
              <input
                type="checkbox"
                name="jobRecommendations"
                checked={settings.jobRecommendations}
                onChange={handleToggleChange}
              />
            </div>

            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </form>

          {/* Display success or error message */}
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Change Password Modal */}
          <button
            className="change-password-button"
            onClick={() => setShowChangePasswordModal(true)}
          >
            Change Password
          </button>

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
  );
};

export default Setting;
