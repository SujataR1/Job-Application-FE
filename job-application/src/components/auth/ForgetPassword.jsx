import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP and New Password input
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router v6, useNavigate instead of useHistory

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // API request to send OTP for password reset
    try {
      const response = await fetch('http://localhost:7000/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otpType: 'PasswordReset', // Type for password reset
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);  // Move to OTP and New Password input step
        setMessage('An OTP has been sent to your email.');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while requesting OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // API request to verify OTP and reset password
    try {
      const response = await fetch('http://localhost:7000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully.');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful password reset
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while resetting the password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
      <div style={styles.card}>
        {/* Forgot Password Heading */}
        <h2 style={styles.heading}>Forgot Password</h2>

        {/* Step 1: Enter email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div style={styles.inputField}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Send OTP</button>
          </form>
        )}

        {/* Step 2: Enter OTP and New Password */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div style={styles.inputField}>
              <label style={styles.label}>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputField}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Reset Password</button>
          </form>
        )}

        {/* Error or success messages */}
        {error && <p style={styles.errorMessage}>{error}</p>}
        {message && <p style={styles.successMessage}>{message}</p>}

        {/* Back to login link */}
        <p style={styles.backToLogin}>
          <a href="/login" style={styles.backToLoginLink}>Back to Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '420px',
    width: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#white',
    padding: '1rem',
    margin: '0 0 1rem 0',
    borderRadius: '10px 10px 0 0',
  },
  inputField: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.9rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#white',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
  successMessage: {
    color: '#2ecc71',
    fontSize: '0.9rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
  backToLogin: {
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  backToLoginLink: {
    color: '#white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default ForgotPassword;


