import React from "react";
import "./PublicSector.css";

const PublicSector = () => {
  return (
    <div className="public-sector-container">
      <header className="public-sector-header">
        <h1>Public Sector Services</h1>
        <p>Shaping the nation's future through innovation and essential services.</p>
      </header>

      <section className="public-sector-overview">
        <h2>Overview</h2>
        <p>
          The Public Sector plays a pivotal role in shaping the country's economy, providing essential services to citizens, and improving quality of life. Discover how our initiatives drive public welfare and sustainable development.
        </p>
      </section>

      <section className="public-sector-services">
        <h2>Our Core Services</h2>
        <div className="services-grid">
          <div className="service-card card-hover">
            <h3>Infrastructure Development</h3>
            <p>
              We invest in critical infrastructure like roads, bridges, and utilities to promote sustainable growth and improve the quality of life.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Healthcare Services</h3>
            <p>
              Providing essential healthcare to all citizens, improving public health, and well-being with government-supported programs.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Public Education & Training</h3>
            <p>
              Ensuring quality education and training to build a skilled workforce for the future.
            </p>
          </div>
          <div className="service-card card-hover">
            <h3>Environmental Protection</h3>
            <p>
              Protecting natural resources and ensuring the sustainable use of land, water, and air for future generations.
            </p>
          </div>
        </div>
      </section>

      <section className="public-sector-initiatives">
        <h2>Key Initiatives</h2>
        <div className="initiatives-grid">
          <div className="initiative-card card-hover">
            <h3>Community Development</h3>
            <p>
              Promoting affordable housing, public spaces, and local engagement for vibrant, sustainable communities.
            </p>
          </div>
          <div className="initiative-card card-hover">
            <h3>Job Creation & Economic Development</h3>
            <p>
              Stimulating job creation through infrastructure projects, workforce development, and local business support.
            </p>
          </div>
          <div className="initiative-card card-hover">
            <h3>Social Welfare Programs</h3>
            <p>
              Providing food, housing, and essential services to individuals and families in need.
            </p>
          </div>
        </div>
      </section>

      <section className="public-sector-cta">
        <h2>Get Involved</h2>
        <p>
          Join our efforts to enhance quality of life and explore opportunities to contribute to public sector initiatives.
        </p>
        <button className="cta-button">Learn More</button>
      </section>

      <footer className="public-sector-footer">
        <p>© 2024 Public Sector Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicSector;
