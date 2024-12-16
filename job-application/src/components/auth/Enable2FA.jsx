// src/pages/Enable2FA.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Enable2FA = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle enabling 2FA
  const handleEnable2FA = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:7000/auth/toggle-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Two-Factor Authentication enabled successfully!');
        navigate('/verify-otp'); // Redirect to OTP verification page
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to enable 2FA');
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message || 'Something went wrong while enabling 2FA');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Enable Two-Factor Authentication</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handleEnable2FA}
          className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Enabling 2FA...' : 'Enable 2FA'}
        </button>
      </div>
    </div>
  );
};

export default Enable2FA;

