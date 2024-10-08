import React, { useState } from 'react';
import './Trust.css'; // Ensure you create this CSS file

const TrustAndSafety = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleVerify = () => {
        // You can implement your verification logic here
        alert(`Verifying phone number: ${phoneNumber}`);
    };

    return (
        <div className="trust-safety-container">
            <h1 className="trust-safety-title">Trust and Safety</h1>
            <p className="trust-safety-message">
                At Transmogrify, your safety and trust are our top priorities. We are committed to creating a secure and supportive environment for all users of our job portal. Here’s how we ensure your safety:
            </p>

            <h2>Our Commitment</h2>
            <ul className="trust-safety-list">
                <li><strong>Data Protection:</strong> We use advanced encryption techniques to protect your personal information.</li>
                <li><strong>Verification Processes:</strong> All job postings are thoroughly vetted to ensure authenticity.</li>
                <li><strong>Reporting Mechanism:</strong> We have a user-friendly reporting system in place for any suspicious activities.</li>
                <li><strong>Continuous Monitoring:</strong> Our team continuously monitors the platform for fraudulent activities.</li>
                <li><strong>User Education:</strong> We provide resources and tips to help users recognize and avoid scams.</li>
            </ul>

            <h2>How You Can Help</h2>
            <p>
                We encourage our users to be vigilant and proactive. Here are a few tips to help keep your job search safe:
            </p>
            <ul className="trust-safety-tips">
                <li>Never share personal information, such as your social security number, until you are sure of the employer's legitimacy.</li>
                <li>Be cautious of job offers that seem too good to be true.</li>
                <li>Always verify the email address of the recruiter and ensure it matches the company domain.</li>
                <li>Trust your instincts—if something feels off, report it.</li>
            </ul>

            <h2>Phone Number Verification</h2>
            <p>Please enter your phone number with STD code for verification:</p>
            <input
                type="tel"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="e.g., +1 234 567 8900"
                className="phone-input"
            />
            <button onClick={handleVerify} className="verify-button">Verify Number</button>

            <p className="trust-safety-contact">
                If you have any concerns, please contact our support team at: <strong>support@transmogrify.com</strong>
            </p>
        </div>
    );
};

export default TrustAndSafety;
