import React from "react";
import "./SummonsNotices.css"; // Ensure you create this CSS file
import summonsImage from '../../components/images/summons.jpg';
import noticesImage from '../../components/images/notices.jpg';

const SummonsNotices = () => {
  return (
    <div className="summons-notices-container">
      <div className="office-contact-info">
        <h2>Contact Us</h2>
        <p>Phone: (+91) 6294159764 </p>
        <p>Email: info@transmogrify.com</p>
      </div>

      {/* Section 1: Summons */}
      <div className="summons-section">
        <h2>Summons</h2>
        <img src={summonsImage} alt="Summons" className="summons-image" />
        <p>
          This section contains all the official summons issued by our office. Please check regularly for updates.
        </p>
      </div>

      {/* Section 2: Notices */}
      <div className="notices-section">
        <h2>Notices</h2>
        <img src={noticesImage} alt="Notices" className="notices-image" />
        <p>
          Here, you will find important notices related to our office operations, events, and announcements.
        </p>
      </div>
    </div>
  );
};

export default SummonsNotices;
