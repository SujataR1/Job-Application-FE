// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // To navigate to different routes after login

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send login request to the backend API
//       const response = await fetch('http://localhost:7000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Send email and password
//       });

//       // Check if the response is OK (status code 200)
//       if (response.ok) {

//         const token = response.headers.get('Authorization');
//         const userType = response.headers.get('User_Type');

//         // If token or userType is missing, display an error message
//         if (!token || !userType) {
//           setError('Token or User Type missing. Please try again.');
//           return; // Stop further execution if missing
//         }

//         // Store the JWT token in localStorage for future use
//         localStorage.setItem('token', token);

//         // Handle userType and navigate accordingly
//         if (userType === 'Applicant') {
//           navigate('/home'); // Redirect to the applicant home page
//         } else if (userType === 'Recruiter') {
//           navigate('/employerdashboard'); // Redirect to the employer dashboard
//         } else {
//           setError('Invalid user type');
//           return; // Prevent further actions if the user type is invalid
//         }

//         alert('Login successful'); // Optionally alert the user
//       } else {
//         // If the response is not OK, throw an error with a message from the backend
//         const data = await response.json();
//         setError(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error); // Log error to the console
//       setError(error.message || 'Login failed. Please try again.'); // Show error message
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//           </div>
//           {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message if any */}
//           <button
//             type="submit"
//             className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
//           >
//             Login
//           </button>
//           <p className="text-gray-500 text-sm mt-4 text-center">
//             Don't have an account? <a href="/signup" className="text-teal-600">Sign Up</a>
//           </p>
//           {/* Add the Forgot Password link */}
//           <p className="text-gray-500 text-sm mt-4 text-center">
//             <Link to="/forgot-password" className="text-teal-600">Forgot Password?</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for email and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send login request to the backend API
      const response = await fetch('http://localhost:7000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get('Authorization');
        const userType = response.headers.get('User_Type');
        const is2FAEnabled = response.headers.get('Is_2FA_Enabled'); // Get 2FA status

        // If no token is returned, show an error
        if (!token) {
          setError('Authentication token missing');
          setIsLoading(false);
          return;
        }

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Handle 2FA based on the response
        if (is2FAEnabled === 'true') {
          // Send OTP request after successful login
          const otpRequestPayload = {
            email: formData.email,  // Pass the email from formData
            otpType: 'TwoFa',       // Specify OTP type as "TwoFa" for 2FA
          };

          const otpResponse = await fetch('http://localhost:7000/auth/request-otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`, // Send the token for authentication
            },
            body: JSON.stringify(otpRequestPayload), // Send the email and otpType
          });

          if (otpResponse.ok) {
            const otpData = await otpResponse.json();
            console.log(otpData.message);  // Optional: Log the success message

            // Redirect to OTP verification page
            navigate('/verify-otp');  // Navigate to the OTP verification page
          } else {
            const otpError = await otpResponse.json();
            setError(otpError.message || 'Failed to send OTP. Please try again.');
            setIsLoading(false);
          }
        } else {
          // Continue with normal login flow if 2FA is not enabled
          if (userType === 'Applicant') {
            navigate('/home'); // Navigate to the applicant home page
          } else if (userType === 'Recruiter') {
            navigate('/employerdashboard'); // Navigate to the recruiter dashboard
          } else {
            setError('Invalid user type');
            setIsLoading(false);
          }
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-teal-600">Sign Up</a>
          </p>
          <p className="text-gray-500 text-sm mt-4 text-center">
            <a href="/forgot-password" className="text-teal-600">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
