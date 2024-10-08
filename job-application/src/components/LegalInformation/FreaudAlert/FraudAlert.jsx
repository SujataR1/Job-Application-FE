import React from 'react';
import { Link } from 'react-router-dom';
import './FraudAlert.css'; // Ensure you have the CSS file for styling

const FraudAlert = () => {
    return (
        <div className="fraud-alert-container">
            <h1 className="fraud-alert-title">Fraud Alert</h1>
            <p className="fraud-alert-message">
                We have detected suspicious activity related to your application. 
                Please do not share your personal information with anyone claiming 
                to be associated with our job application process unless verified. 
                For any concerns, please contact our support team.
            </p>
            
            <h2 className="fraud-alert-tips-title">Tips to Stay Safe</h2>
            <ul className="fraud-alert-tips-list">
                <li>Always verify the identity of the person or organization contacting you.</li>
                <li>Never share sensitive personal information via email or over the phone.</li>
                <li>Look for official communication channels, such as company websites.</li>
                <li>Be cautious of unsolicited job offers or interviews.</li>
                <li>Report any suspicious activity to our support team immediately.</li>
            </ul>
            
            <Link to="/" className="fraud-alert-button">
                Return to Home
            </Link>
        </div>
    );
};

export default FraudAlert;
