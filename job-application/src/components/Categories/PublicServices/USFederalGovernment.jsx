import React from "react";
import "./USFederalGovernment.css";

const USFederalGovernment = () => {
  return (
    <div className="usgov-container">
      {/* Header Section */}
      <header className="usgov-header">
        <h1>U.S. Federal Government Services</h1>
        <p>Your guide to federal government programs, services, and resources</p>
      </header>

      {/* Overview Section */}
      <section className="usgov-overview">
        <div className="content-container">
          <h2>Overview of Federal Services</h2>
          <p>
            The U.S. Federal Government offers a wide range of services designed to improve the lives of all citizens. Whether it's healthcare, education, public safety, or infrastructure, our goal is to ensure access to essential services while fostering growth and innovation across the country.
          </p>
        </div>
      </section>

      {/* Federal Services Section */}
      <section className="usgov-services">
        <div className="content-container">
          <h2>Key Federal Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Healthcare Programs</h3>
              <p>Access to Medicare, Medicaid, and other vital health services ensuring medical care for all citizens.</p>
            </div>
            <div className="service-card">
              <h3>Public Safety</h3>
              <p>Programs and agencies dedicated to safeguarding our nation from natural and man-made threats.</p>
            </div>
            <div className="service-card">
              <h3>Federal Grants</h3>
              <p>Support for education, research, and community projects through federal grants and funding opportunities.</p>
            </div>
            <div className="service-card">
              <h3>National Security</h3>
              <p>Strengthening national defense, disaster response, and cyber security to keep America safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* State and Local Government Support Section */}
      <section className="usgov-local-support">
        <div className="content-container">
          <h2>State & Local Government Collaboration</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Infrastructure Development</h3>
              <p>Collaboration on roadways, bridges, and public transportation to enhance the nation’s infrastructure.</p>
            </div>
            <div className="service-card">
              <h3>Education & Workforce</h3>
              <p>Support for workforce development, educational funding, and job training programs for a brighter future.</p>
            </div>
            <div className="service-card">
              <h3>Affordable Housing</h3>
              <p>Partnerships to provide affordable housing and improve urban living conditions across the country.</p>
            </div>
            <div className="service-card">
              <h3>Community Initiatives</h3>
              <p>Programs aimed at improving quality of life, including health, housing, and safety within local communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section className="usgov-research">
        <div className="content-container">
          <h2>Research & Innovation</h2>
          <p>
            Federal investments in scientific research drive technological innovation. Through agencies such as NASA, NIH, and NSF, we lead global efforts in space exploration, medical research, and technology development.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="usgov-footer">
        <p>© 2024 U.S. Federal Government | All rights reserved</p>
        <p>For more information, visit <a href="https://www.usa.gov" target="_blank" rel="noopener noreferrer">USA.gov</a></p>
      </footer>
    </div>
  );
};

export default USFederalGovernment;
