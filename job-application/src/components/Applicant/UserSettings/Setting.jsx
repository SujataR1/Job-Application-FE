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
import './Setting.css';

const Setting = () => {
  const [settings, setSettings] = useState({
    privateProfile: false,
    searchableProfile: true,
    allowMessagesfromStrangers: true,
    twoFaEnabled: false,
    companyPageWriteAccess: false,
    lookingToApply: false,
    lookingToRecruit: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // Track email verification status

  // Fetch user settings on component mount
  useEffect(() => {
    if (settingsSaved) {
      return;
    }

    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token) {
        setError('You need to be logged in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/user-settings', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 401 && refreshToken) {
          const refreshResponse = await fetch('http://localhost:7000/auth/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          const refreshData = await refreshResponse.json();
          if (refreshResponse.ok) {
            localStorage.setItem('token', refreshData.token);
            const retryResponse = await fetch('http://localhost:7000/user-settings', {
              method: 'GET',
              headers: {
                Authorization: `${refreshData.token}`,
              },
            });

            const retryData = await retryResponse.json();
            setSettings(retryData);
            setEmailVerified(retryData.emailVerified); // Assuming the response contains email verification status
            setIsLoading(false);
          } else {
            setError('Failed to refresh token. Please log in again.');
            setIsLoading(false);
          }
        } else if (response.ok) {
          const data = await response.json();
          setSettings(data);
          setEmailVerified(data.emailVerified); // Assuming the response contains email verification status
          setIsLoading(false);
        } else {
          setError('Failed to fetch settings.');
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [settingsSaved]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You need to be logged in.');
      return;
    }

    // Check if Two-Factor Authentication is being enabled and email is not verified
    if (settings.twoFaEnabled && !emailVerified) {
      setError('Two-Factor Authentication can only be enabled if the email is verified.');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/user-settings', {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          privateProfile: settings.privateProfile,
          searchableProfile: settings.searchableProfile,
          allowMessagesfromStrangers: settings.allowMessagesfromStrangers,
          twoFaEnabled: settings.twoFaEnabled,
          companyPageWriteAccess: settings.companyPageWriteAccess,
          lookingToApply: settings.lookingToApply,
          lookingToRecruit: settings.lookingToRecruit,
        }),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
        setSettingsSaved(true);
      } else {
        setError('Failed to save settings');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="settings-options">
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="privateProfile"
                  checked={settings.privateProfile}
                  onChange={handleCheckboxChange}
                />
                Private Profile
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="searchableProfile"
                  checked={settings.searchableProfile}
                  onChange={handleCheckboxChange}
                />
                Searchable Profile
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="allowMessagesfromStrangers"
                  checked={settings.allowMessagesfromStrangers}
                  onChange={handleCheckboxChange}
                />
                Allow Messages from Strangers
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="twoFaEnabled"
                  checked={settings.twoFaEnabled}
                  onChange={handleCheckboxChange}
                />
                Two-Factor Authentication Enabled
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="companyPageWriteAccess"
                  checked={settings.companyPageWriteAccess}
                  onChange={handleCheckboxChange}
                />
                Company Page Write Access
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="lookingToApply"
                  checked={settings.lookingToApply}
                  onChange={handleCheckboxChange}
                />
                Looking to Apply
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  name="lookingToRecruit"
                  checked={settings.lookingToRecruit}
                  onChange={handleCheckboxChange}
                />
                Looking to Recruit
              </label>
            </div>
          </div>

          <button onClick={handleSave}>Save Settings</button>

          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Setting;
