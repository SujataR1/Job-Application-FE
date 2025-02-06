import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new uploaded image
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [error, setError] = useState(''); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(''); // For displaying success message
  const [formData, setFormData] = useState({
    fullName: '',
    about: '',
    email: '',
    phoneNumber: '',
    isEmailVerified: false // To track email verification status
  });
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
        const response = await fetch('http://localhost:7000/auth/user-details', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          setFormData(data);
          setSuccessMessage('');
          setError('');
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

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
        setIsUpdated(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update user details (with optional new image)
  const handleUpdateDetails = async () => {
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('about', formData.about);
    formDataObj.append('email', formData.email);
    formDataObj.append('phoneNumber', formData.phoneNumber);

    if (newImage) {
      const imageBlob = dataURItoBlob(newImage);
      formDataObj.append('profileImage', imageBlob, 'profileImage.jpg');
    }

    try {
      const response = await fetch('http://localhost:7000/auth/update', {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
        },
        body: formDataObj,
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
        setIsUpdated(false);
        setSuccessMessage('User details updated successfully!');
        setError('');
      } else {
        console.error(data.message || 'Failed to update user details');
        setError(data.message || 'Failed to update user details');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      setError('An error occurred while updating details.');
      setSuccessMessage('');
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
    setIsUpdated(true);
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
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPopup(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError('An error occurred while sending OTP.');
    }
  };

  // Verify OTP for email confirmation
  const handleVerifyOtp = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:7000/auth/verify-email-otp', {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          isEmailVerified: true,
        }));
        setShowOtpPopup(false);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <EmployerNavbar />
      <div
        className="flex flex-1"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <EmployerSidebar />
        <main className="flex flex-col items-center justify-center flex-1 p-6">
          {/* Profile Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 py-2 px-6 rounded-full shadow-lg">
              My Profile
            </h2>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
            <div className="flex flex-col items-center relative">
              {/* Profile Image */}
              <div
                className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 cursor-pointer transition-transform transform hover:scale-105 hover:border-indigo-500"
                style={{
                  backgroundImage: `url(${newImage || user?.profilePicture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => setIsImageEditing(true)}
              ></div>

              {/* Edit Image Modal */}
              {isImageEditing && (
                <div className="absolute top-full mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-lg w-72 z-10">
                  <input type="file" onChange={handleImageChange} className="w-full mb-3" />
                  <button
                    onClick={() => setIsImageEditing(false)}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">About:</label>
                <input
                  type="text"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Email:</label>
                <div className="mt-2 sm:mt-0 flex items-center w-full">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  />
                  {!formData.isEmailVerified ? (
                    <button
                      onClick={handleVerifyEmail}
                      className="ml-3 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors whitespace-nowrap"
                    >
                      Verify Email
                    </button>
                  ) : (
                    <span className="ml-3 text-green-600 font-bold">Verified</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center">
                <label className="w-full sm:w-32 font-semibold text-gray-700">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 sm:mt-0 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={isEditing ? handleUpdateDetails : () => setIsEditing(true)}
                className="mt-6 py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full transition-colors"
              >
                {isEditing ? 'Update Details' : 'Edit'}
              </button>
            </div>

            {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">{error}</div>}
            {successMessage && <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">{successMessage}</div>}
          </div>
        </main>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 max-w-md shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-800 text-center">Enter OTP</h3>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {otpError && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">{otpError}</div>}
            <button onClick={handleVerifyOtp} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors mb-3">
              Verify OTP
            </button>
            <button onClick={() => setShowOtpPopup(false)} className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
