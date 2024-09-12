// src/LoginPage.jsx
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example validation
    if (email === '' || password === '') {
      setError('Both fields are required');
    } else {
      setError(''); // Clear error if inputs are valid
      // Handle form submission logic here
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Employee Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button
          type="submit"
          className="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
