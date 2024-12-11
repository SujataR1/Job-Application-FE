import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Assuming you will have a separate CSS file for applicant profile

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // To handle new image
  const [isEditing, setIsEditing] = useState(false); // To toggle image editing mode
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

      if (!token) {
        navigate('/login'); // Redirect if no token is found
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/auth/user-details', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data); // Set user data if response is OK
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Set new image base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:7000/auth/update', {
        method: 'POST',
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: newImage, // Send base64 image
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prevUser => ({ ...prevUser, image: data.image })); // Assuming 'data.image' contains the image URL
        setIsEditing(false); // Close the image editing mode
      } else {
        setError(data.message || 'Failed to update image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('An error occurred while updating the profile image.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
      </div>

      <div className="profile-card">
        <div className="profile-image-container">
          {/* Display image */}
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${newImage || user?.profilePicture || 'default-profile-image-url'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={() => setIsEditing(true)} // Trigger edit mode when clicked
          ></div>

          {/* Edit image modal */}
          {isEditing && (
            <div className="edit-image-modal">
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleImageSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>

        <div className="profile-details">
          {user ? (
            <>
              <p><strong>Name:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p><strong>About:</strong> {user.about}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Profile;



