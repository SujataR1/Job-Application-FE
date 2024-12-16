import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = location.state?.email;  // Get the email from the previous page

  // If email is missing, redirect to login page
  useEffect(() => {
    if (!email) {
      navigate('/login'); // Redirect to login if no email is provided
    }
  }, [email, navigate]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:7000/auth/verify-2fa-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        // If OTP is verified successfully, navigate to home
        navigate('/home');
      } else {
        const data = await response.json();
        setError(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;