// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem('token'); // Get token from localStorage
//       if (!token) {
//         setError('Authentication token missing. Please log in again.');
//         setIsLoading(false);
//         return;
//       }

//       // Send OTP verification request to the backend API
//       const response = await fetch('http://localhost:7000/auth/verify-email-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${token}`, // Send token for authentication
//         },
//         body: JSON.stringify({ otp }), // Send the OTP for verification
//       });

//       if (response.ok) {
//         const userType = response.headers.get('User_Type');
//         if (userType === 'Applicant') {
//           navigate('/home'); // Navigate to the applicant home page
//         } else if (userType === 'Recruiter') {
//           navigate('/employerdashboard'); // Navigate to the recruiter dashboard
//         } else {
//           setError('Invalid user type');
//           setIsLoading(false);
//         }
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Invalid OTP. Please try again.');
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Error during OTP verification:', error);
//       setError(error.message || 'OTP verification failed. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//         <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
//         <form onSubmit={handleOtpSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Enter OTP</label>
//             <input
//               type="text"
//               name="otp"
//               value={otp}
//               onChange={handleOtpChange}
//               placeholder="Enter OTP"
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <button
//             type="submit"
//             className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token missing. Please log in again.');
        setIsLoading(false);
        return;
      }
  
      const response = await fetch('http://localhost:7000/auth/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Send token for authentication
        },
        body: JSON.stringify({ otp }), // Send the OTP for verification
      });
  
      if (response.ok) {
        const userType = response.headers.get('User_Type');
        if (userType === 'Applicant') {
          navigate('/home');
        } else if (userType === 'Recruiter') {
          navigate('/employerdashboard');
        } else {
          setError('Invalid user type');
          setIsLoading(false);
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid OTP. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError(error.message || 'OTP verification failed. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
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
