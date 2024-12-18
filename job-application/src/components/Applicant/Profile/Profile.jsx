// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css'; // Assuming you will have a separate CSS file for applicant profile

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [newImage, setNewImage] = useState(null); // To handle new image
//   const [isEditing, setIsEditing] = useState(false); // To toggle image editing mode
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

//       if (!token) {
//         navigate('/login'); // Redirect if no token is found
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:7000/auth/user-details', {
//           method: 'GET',
//           headers: {
//             Authorization: ` ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data); // Set user data if response is OK
//         } else {
//           setError(data.message || 'Failed to fetch user details');
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setError('An error occurred while fetching user details.');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewImage(reader.result); // Set new image base64
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageSave = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch('http://localhost:7000/auth/update', {
//         method: 'POST',
//         headers: {
//           'Authorization': ` ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           image: newImage, // Send base64 image
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUser(prevUser => ({ ...prevUser, image: data.image })); // Assuming 'data.image' contains the image URL
//         setIsEditing(false); // Close the image editing mode
//       } else {
//         setError(data.message || 'Failed to update image');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setError('An error occurred while updating the profile image.');
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <h2>Your Profile</h2>
//       </div>

//       <div className="profile-card">
//         <div className="profile-image-container">
//           {/* Display image */}
//           <div
//             className="profile-image"
//             style={{
//               backgroundImage: `url(${newImage || user?.profilePicture || 'default-profile-image-url'})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//             onClick={() => setIsEditing(true)} // Trigger edit mode when clicked
//           ></div>

//           {/* Edit image modal */}
//           {isEditing && (
//             <div className="edit-image-modal">
//               <input type="file" onChange={handleImageChange} />
//               <button onClick={handleImageSave}>Save</button>
//               <button onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           )}
//         </div>

//         <div className="profile-details">
//           {user ? (
//             <>
//               <p><strong>Name:</strong> {user.fullName}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p><strong>About:</strong> {user.about}</p>
//             </>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>

//         {error && <div className="error-message">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [newImage, setNewImage] = useState(null); // Store the new uploaded image
//   const [isEditing, setIsEditing] = useState(false); // Toggle image editing mode
//   const [error, setError] = useState(''); // For displaying errors
//   const [successMessage, setSuccessMessage] = useState(''); // For displaying success message
//   const [formData, setFormData] = useState({
//     fullName: '',
//     about: '',
//     email: '',
//     phoneNumber: '',
//     isEmailVerified: false // To track email verification status
//   }); // For editing user details
//   const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
//   const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
//   const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
//   const [otp, setOtp] = useState(''); // Store OTP input by user
//   const [otpError, setOtpError] = useState(''); // For OTP validation errors
//   const navigate = useNavigate();

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token'); // Retrieve the token

//       if (!token) {
//         navigate('/login'); // Redirect if no token
//         return;
//       }

//       try {
//         // Fetch the user data from the API
//         const response = await fetch('http://localhost:7000/auth/user-details', {
//           method: 'GET',
//           headers: {
//             Authorization: `${token}`, // Add token to Authorization header
//           },
//         });

//         const data = await response.json(); // Parse the response

//         if (response.ok) {
//           setUser(data); // Set user data if successful
//           setFormData(data); // Set initial form values
//           setSuccessMessage(''); // Reset success message
//           setError(''); // Reset error message
//         } else {
//           setError(data.message || 'Failed to fetch user details');
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setError('An error occurred while fetching user details.');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   // Handle image change (user selects a new image)
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewImage(reader.result); // Set the selected image as base64
//         setIsUpdated(true); // Mark as updated
//       };
//       reader.readAsDataURL(file); // Convert image to base64
//     }
//   };

//   // Handle user details update (submit the form and the profile image together)
//   const handleUpdateDetails = async () => {
//     const token = localStorage.getItem('token');
//     const formDataObj = new FormData();
//     formDataObj.append('fullName', formData.fullName);
//     formDataObj.append('about', formData.about);
//     formDataObj.append('email', formData.email);
//     formDataObj.append('phoneNumber', formData.phoneNumber);
  
//     // If a new image is selected, append it to FormData
//     if (newImage) {
//       const imageBlob = dataURItoBlob(newImage); // Convert base64 to Blob
//       formDataObj.append('profileImage', imageBlob, 'profileImage.jpg');
//     }

//     try {
//       const response = await fetch('http://localhost:7000/auth/update', {
//         method: 'PATCH',
//         headers: {
//           'Authorization': ` ${token}`, // Include the token for authentication
//         },
//         body: formDataObj, // Send the form data with the image
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUser(data); // Update user data with new details
//         setIsEditing(false); // Close the editing mode
//         setIsUpdated(false); // Reset the update flag
//         setSuccessMessage('User details updated successfully!'); // Display success message
//         setError(''); // Clear any previous errors
//       } else {
//         console.error(data.message || 'Failed to update user details');
//         setError(data.message || 'Failed to update user details');
//         setSuccessMessage(''); // Clear any previous success message
//       }
//     } catch (error) {
//       console.error('Error updating details:', error);
//       setError('An error occurred while updating details.');
//       setSuccessMessage(''); // Clear any previous success message
//     }
//   };

//   // Helper function to convert base64 to Blob
//   function dataURItoBlob(dataURI) {
//     const byteString = atob(dataURI.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([uintArray], { type: 'image/jpeg' });
//   }

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setIsUpdated(true); // Mark as updated whenever form changes
//   };

//   // Send OTP for email verification
//   const handleVerifyEmail = async () => {
//     const token = localStorage.getItem('token');
//     const requestData = {
//       email: formData.email,
//       otpType: 'EmailVerification',
//     };

//     try {
//       const response = await fetch('http://localhost:7000/auth/request-otp', {
//         method: 'POST',
//         headers: {
//           'Authorization': ` ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setShowOtpPopup(true); // Show OTP input modal
//         setOtpError(''); // Reset OTP error
//       } else {
//         setOtpError(data.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setOtpError('An error occurred while sending OTP.');
//     }
//   };

//   // Verify the OTP and confirm email
//   const handleVerifyOtp = async () => {
//     const token = localStorage.getItem('token');

//     try {
//       const response = await fetch('http://localhost:7000/auth/verify-email-otp', {
//         method: 'POST',
//         headers: {
//           'Authorization': ` ${token}`, // Authorization header with Bearer token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           otp: otp, // OTP input by the user
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setFormData((prevData) => ({
//           ...prevData,
//           isEmailVerified: true,
//         }));
//         setShowOtpPopup(false); // Close OTP modal
//         setSuccessMessage('Email verified successfully!');
//         setError('');
//       } else {
//         setOtpError(data.message || 'Invalid OTP');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setOtpError('An error occurred while verifying OTP.');
//     }
//   };

//   return (
//     <div className="home-page">
//       <div className="profile-container">
//         <div className="profile-header">
//           <h2>User Profile</h2>
//         </div>

//         <div className="profile-card">
//           <div className="profile-image-container">
//             {/* Display the profile image */}
//             <div
//               className="profile-image"
//               style={{
//                 backgroundImage: `url(${newImage || user?.profilePicture})`, // Display new or fetched image
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//               onClick={() => setIsImageEditing(true)} // Click on the image to start editing
//             ></div>

//             {/* Edit image modal */}
//             {isImageEditing && (
//               <div className="edit-image-modal">
//                 <input type="file" onChange={handleImageChange} />
//                 <button onClick={() => setIsImageEditing(false)}>Cancel</button>
//               </div>
//             )}
//           </div>

//           <div className="profile-details">
//             {user ? (
//               <>
//                 <div className="profile-detail-row">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     disabled={!isEditing} // Disable input when not editing
//                   />
//                 </div>
//                 <div className="profile-detail-row">
//                   <label>About:</label>
//                   <input
//                     type="text"
//                     name="about"
//                     value={formData.about}
//                     onChange={handleChange}
//                     disabled={!isEditing} // Disable input when not editing
//                   />
//                 </div>
//                 <div className="profile-detail-row">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={!isEditing} // Disable input when not editing
//                   />
//                   {!formData.isEmailVerified ? (
//                     <button className="verify-email-button" onClick={handleVerifyEmail}>
//                       Verify Email
//                     </button>
//                   ) : (
//                     <span className="verified">Verified</span>
//                   )}
//                 </div>
//                 <div className="profile-detail-row">
//                   <label>Phone Number:</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     disabled={!isEditing} // Disable input when not editing
//                   />
//                 </div>
//                 {isEditing ? (
//                   <button onClick={handleUpdateDetails}>Save Changes</button> // Save button when editing
//                 ) : (
//                   <button onClick={() => setIsEditing(true)}>Edit Profile</button> // Edit button when not editing
//                 )}
//               </>
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>
//         </div>
//         {successMessage && <div className="success-message">{successMessage}</div>}
//         {error && <div className="error-message">{error}</div>}
//         {showOtpPopup && (
//           <div className="otp-popup">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//             />
//             <button onClick={handleVerifyOtp}>Verify OTP</button>
//             <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
//             {otpError && <div className="error-message">{otpError}</div>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new uploaded image
  const [isEditing, setIsEditing] = useState(false); // Toggle image editing mode
  const [error, setError] = useState(''); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(''); // For displaying success message
  const [formData, setFormData] = useState({
    fullName: '',
    about: '',
    email: '',
    phoneNumber: '',
    isEmailVerified: false // To track email verification status
  }); // For editing user details
  const [isUpdated, setIsUpdated] = useState(false); // To track if the data has been modified
  const [isImageEditing, setIsImageEditing] = useState(false); // For controlling image editing modal visibility
  const [showOtpPopup, setShowOtpPopup] = useState(false); // To show the OTP input popup
  const [otp, setOtp] = useState(''); // Store OTP input by user
  const [otpError, setOtpError] = useState(''); // For OTP validation errors
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token

      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        // Fetch the user data from the API
        const response = await fetch('http://localhost:7000/auth/user-details', {
          method: 'GET',
          headers: {
            Authorization: `${token}`, // Add token to Authorization header
          },
        });

        const data = await response.json(); // Parse the response

        if (response.ok) {
          setUser(data); // Set user data if successful
          setFormData(data); // Set initial form values
          setSuccessMessage(''); // Reset success message
          setError(''); // Reset error message
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('An error occurred while fetching user details.');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle image change (user selects a new image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Set the selected image as base64
        setIsUpdated(true); // Mark as updated
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  // Handle user details update (submit the form and the profile image together)
  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('about', formData.about);
    formDataObj.append('email', formData.email);
    formDataObj.append('phoneNumber', formData.phoneNumber);

    // If a new image is selected, append it to FormData
    if (newImage) {
      const imageBlob = dataURItoBlob(newImage); // Convert base64 to Blob
      formDataObj.append('profileImage', imageBlob, 'profileImage.jpg');
    }

    try {
      const response = await fetch('http://localhost:7000/auth/update', {
        method: 'PATCH',
        headers: {
          'Authorization': ` ${token}`, // Include the token for authentication
        },
        body: formDataObj, // Send the form data with the image
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data); // Update user data with new details
        setIsEditing(false); // Close the editing mode
        setIsUpdated(false); // Reset the update flag
        setSuccessMessage('User details updated successfully!'); // Display success message
        setError(''); // Clear any previous errors
      } else {
        console.error(data.message || 'Failed to update user details');
        setError(data.message || 'Failed to update user details');
        setSuccessMessage(''); // Clear any previous success message
      }
    } catch (error) {
      console.error('Error updating details:', error);
      setError('An error occurred while updating details.');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  // Helper function to convert base64 to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([uintArray], { type: 'image/jpeg' });
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsUpdated(true); // Mark as updated whenever form changes
  };

  // Send OTP for email verification
  const handleVerifyEmail = async () => {
    const token = localStorage.getItem('token');
    const requestData = {
      email: formData.email,
      otpType: 'EmailVerification',
    };

    try {
      const response = await fetch('http://localhost:7000/auth/request-otp', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPopup(true); // Show OTP input modal
        setOtpError(''); // Reset OTP error
      } else {
        setOtpError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('An error occurred while sending OTP.');
    }
  };

  // Verify the OTP and confirm email
  const handleVerifyOtp = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:7000/auth/verify-email-otp', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`, // Authorization header with Bearer token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp, // OTP input by the user
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          isEmailVerified: true,
        }));
        setShowOtpPopup(false); // Close OTP modal
        setSuccessMessage('Email verified successfully!');
        setError('');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('An error occurred while verifying OTP.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
      <div className="profile-container">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>

        <div className="profile-card">
          <div className="profile-image-container">
            {/* Display the profile image */}
            <div
              className="profile-image"
              style={{
                backgroundImage: `url(${newImage || user?.profilePicture})`, // Display new or fetched image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => setIsImageEditing(true)} // Click on the image to start editing
            ></div>

            {/* Edit image modal */}
            {isImageEditing && (
              <div className="edit-image-modal">
                <input type="file" onChange={handleImageChange} />
                <button onClick={() => setIsImageEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="profile-details">
            {user ? (
              <>
                <div className="profile-detail-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>
                <div className="profile-detail-row">
                  <label>About:</label>
                  <input
                    type="text"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>
                <div className="profile-detail-row">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                  {!formData.isEmailVerified ? (
                    <button className="verify-email-button" onClick={handleVerifyEmail}>
                      Verify Email
                    </button>
                  ) : (
                    <span className="verified">Verified</span>
                  )}
                </div>
                <div className="profile-detail-row">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>

                <button
                  className="update-button"
                  onClick={isEditing ? handleUpdateDetails : () => setIsEditing(true)}
                  style={{
                    padding: '6px 12px', // Smaller padding
                    fontSize: '14px', // Smaller font size
                    backgroundColor: isEditing ? '#28a745' : '#007bff', // Green for 'Update', Blue for 'Edit'
                    color: 'white', // White text color
                    border: 'none', // No border
                    borderRadius: '5px', // Rounded corners
                    cursor: 'pointer', // Pointer cursor on hover
                    transition: 'background-color 0.3s ease',
                    width: '100px', // Button width
                  }}
                >
                  {isEditing ? 'Update Details' : 'Edit'}
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <h3>Enter OTP sent to your email</h3>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <div className="error-message">{otpError}</div>}
            <button onClick={handleVerifyOtp}>Verify OTP</button>
            <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
