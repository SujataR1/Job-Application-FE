import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate to different routes after login

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend API
      const response = await fetch('http://localhost:7000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send email and password
      });

      // Check if the response is OK (status code 200)
      if (response.ok) {

        const token = response.headers.get('Authorization');
        const userType = response.headers.get('User_Type');

        // If token or userType is missing, display an error message
        if (!token || !userType) {
          setError('Token or User Type missing. Please try again.');
          return; // Stop further execution if missing
        }

        // Store the JWT token in localStorage for future use
        localStorage.setItem('token', token);

        // Handle userType and navigate accordingly
        if (userType === 'Applicant') {
          navigate('/home'); // Redirect to the applicant home page
        } else if (userType === 'Recruiter') {
          navigate('/employerdashboard'); // Redirect to the employer dashboard
        } else {
          setError('Invalid user type');
          return; // Prevent further actions if the user type is invalid
        }

        alert('Login successful'); // Optionally alert the user
      } else {
        // If the response is not OK, throw an error with a message from the backend
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error); // Log error to the console
      setError(error.message || 'Login failed. Please try again.'); // Show error message
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
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message if any */}
          <button
            type="submit"
            className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
          >
            Login
          </button>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-teal-600">Sign Up</a>
          </p>
          {/* Add the Forgot Password link */}
          <p className="text-gray-500 text-sm mt-4 text-center">
            <Link to="/forgot-password" className="text-teal-600">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


