import React from "react";
import "./ReportIssue.css"; // Ensure you create this CSS file
import issueReportImage from '../../components/images/issue-report.jpg';
import reportValuesImage from '../../components/images/report-values.jpg';
import teamMember1 from '../../components/images/team-member1.png';
import teamMember2 from '../../components/images/team-member2.png';
import teamMember3 from '../../components/images/team-member3.png';

const ReportIssue = () => {
  return (
    <div className="report-issue-container">
      <div className="issue-overview">
        <h2>Report an Issue</h2>
        <p>
          If you encounter any problems or have concerns, please let us know.
          We are here to assist you and ensure a smooth experience.
        </p>
      </div>

      {/* Section 1: Introduction */}
      <div className="issue-section">
        <img src={issueReportImage} alt="Report Issue" className="issue-image" />
        <div className="issue-text">
          <h2>Welcome to Our Issue Reporting Portal</h2>
          <p>
            We take your concerns seriously. Use the form below to report any
            issues you might be facing with our services. Our team is ready to help you.
          </p>
        </div>
      </div>

      {/* Section 2: Our Values */}
      <div className="issue-section reverse">
        <img src={reportValuesImage} alt="Our Values" className="issue-image" />
        <div className="issue-text">
          <h2>Our Commitment</h2>
          <p>
            <i className="fas fa-users"></i> Responsiveness: We respond to issues promptly.
          </p>
          <p>
            <i className="fas fa-briefcase"></i> Accountability: We take responsibility for resolving issues.
          </p>
          <p>
            <i className="fas fa-info-circle"></i> Transparency: We keep you informed throughout the process.
          </p>
        </div>
      </div>

      {/* Section 3: Our Team */}
      <div className="team-members">
        <h2>Meet Our Support Team</h2>
        <div className="team-images">
          <div className="circle">
            <img src={teamMember1} alt="Team Member 1" />
          </div>
          <div className="circle">
            <img src={teamMember2} alt="Team Member 2" />
          </div>
          <div className="circle">
            <img src={teamMember3} alt="Team Member 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
