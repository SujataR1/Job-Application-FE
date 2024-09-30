import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [visibleQuestion, setVisibleQuestion] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  const toggleQuestion = (index) => {
    setVisibleQuestion(visibleQuestion === index ? null : index);
  };

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  return (
    <div className="help-center-container">
      <h1>Help Center</h1>

      <div className="help-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or need further assistance, please reach out to us:</p>
        <ul>
          <li><strong>Phone:</strong> +91 6294159764</li>
          <li><strong>Email:</strong> help@transmogrify.com</li>
          <li><strong>Office Address:</strong> NewTown</li>
        </ul>
      </div>

      <div className="help-section">
        <h2>Support</h2>
        <p>For technical support or account-related queries, feel free to contact our support team:</p>
        <ul>
          <li><strong>Support Email:</strong> support@transmogrify.com</li>
          <li><strong>Working Hours:</strong> Mon-Fri, 9 AM - 6 PM</li>
        </ul>
      </div>

      <div className="help-section">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          <li>
            <div onClick={() => toggleQuestion(1)} className="faq-question">
              How can I reset my password?
            </div>
            {visibleQuestion === 1 && (
              <div className="faq-answer">
                To reset your password, go to the login page and click on "Forgot Password". Enter your registered email, and you'll receive an OTP to reset your password.
              </div>
            )}
          </li>
          <li>
            <div onClick={() => toggleQuestion(2)} className="faq-question">
              Where can I find my account details?
            </div>
            {visibleQuestion === 2 && (
              <div className="faq-answer">
                You can find your account details by navigating to the "My Account" section once you're logged in.
              </div>
            )}
          </li>
          <li>
            <div onClick={() => toggleQuestion(3)} className="faq-question">
              How do I apply for a job on the platform?
            </div>
            {visibleQuestion === 3 && (
              <div className="faq-answer">
                Browse the available job listings, click on the job you're interested in, and hit the "Apply" button. Fill in the required details and submit your application.
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="help-section">
        <h2>Additional Resources</h2>
        <p>Explore our resources for detailed guides and tutorials:</p>
        <ul>
          <li>
            <button onClick={() => handleSectionClick('user-guide')} className="link-button">
              User Guide
            </button>
          </li>
          <li>
            <button onClick={() => handleSectionClick('faq')} className="link-button">
              FAQ
            </button>
          </li>
          <li>
            <button onClick={() => handleSectionClick('support-portal')} className="link-button">
              Support Portal
            </button>
          </li>
        </ul>
        {activeSection && (
          <div className="section-content">
            <h3>{activeSection.replace('-', ' ').toUpperCase()}</h3>
            <p>This is the {activeSection} content. Here you can explore detailed information about {activeSection.replace('-', ' ')}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
