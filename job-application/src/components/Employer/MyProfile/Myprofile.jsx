import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Myprofile.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

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
  }); // For editing user details
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
            Authorization: ` ${token}`, // Add token to Authorization header
          },
        });

        const data = await response.json(); // Parse the response

        if (response.ok) {
          setUser(data); // Set user data if successful
          setFormData(data); // Set initial form values
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}
      <EmployerNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
        <div className="home-content flex flex-row">
          {/* Sidebar */}
          <EmployerSidebar />
          <div className="profile-container">
            <div className="profile-header">
              <h2>Your Profile</h2>
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
                  onClick={() => setIsEditing(true)} // Open the file input when clicking on the profile image
                ></div>

                {/* Edit image modal */}
                {isEditing && (
                  <div className="edit-image-modal">
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
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
                      />
                    </div>
                    <div className="profile-detail-row">
                      <label>About:</label>
                      <input
                        type="text"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="profile-detail-row">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="profile-detail-row">
                      <label>Phone Number:</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <button className="update-button" onClick={handleUpdateDetails}>
                      Update Details
                    </button>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
