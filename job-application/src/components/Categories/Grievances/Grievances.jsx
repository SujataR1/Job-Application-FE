import React from "react";
import "./Grievances.css"; // Ensure you create this CSS file
import { Link } from "react-router-dom";

const Grievances = () => {
  return (
    <div className="grievances-container">
      <div className="grievance-overview">
        <h2>Grievance Redressal Portal</h2>
        <p>
          We value your feedback and are committed to resolving your grievances efficiently. 
          Please use this portal to raise your concerns and we will address them promptly.
        </p>
        <Link to="/submit-grievance">
          <button className="submit-grievance">SUBMIT A GRIEVANCE</button>
        </Link>
      </div>
      
      {/* Section 1: Introduction */}
      <div className="grievances-section">
        <div className="grievances-text">
          <h2>Welcome to the Grievance Redressal System</h2>
          <p>
            Our mission is to ensure a smooth and fair resolution process for your grievances. 
            Your concerns are important to us, and we are here to listen and act.
          </p>
        </div>
      </div>

      {/* Section 2: How to Submit a Grievance */}
      <div className="grievances-section reverse">
        <div className="grievances-text">
          <h2>How to Submit a Grievance</h2>
          <p>
            1. Click on the "Submit a Grievance" button above.<br />
            2. Fill in the required details and provide a clear description of your grievance.<br />
            3. Submit the form and await our response.
          </p>
        </div>
      </div>

      {/* Section 3: Contact Us */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you need further assistance, feel free to reach out to our support team:</p>
        <p>Email: support@transmogrify.com</p>
        <p>Phone: +91 6294159764</p>
      </div>
    </div>
  );
};

export default Grievances;
