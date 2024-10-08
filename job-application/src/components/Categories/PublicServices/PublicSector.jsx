import React from "react";
import "./PublicSector.css";

const PublicSector = () => {
  return (
    <div className="public-sector-container">
      <header className="public-sector-header">
        <h1>Public Sector Services</h1>
      </header>

      <section className="public-sector-overview">
        <h2>Overview</h2>
        <p>
          The Public Sector plays a pivotal role in shaping the country's economy, providing essential services to citizens, and improving quality of life. This page provides an overview of the various services and initiatives aimed at promoting public welfare, sustainable development, and economic growth.
        </p>
      </section>

      <section className="public-sector-services">
        <h2>Public Sector Services</h2>
        <div className="service">
          <h3>Infrastructure Development</h3>
          <p>
            Public sector organizations invest in and maintain critical infrastructure such as roads, bridges, airports, and utilities, fostering sustainable growth and improving quality of life.
          </p>
        </div>
        <div className="service">
          <h3>Healthcare Services</h3>
          <p>
            Access to healthcare is a fundamental right. Government healthcare programs ensure that all citizens receive essential medical services, improving public health and well-being.
          </p>
        </div>
        <div className="service">
          <h3>Public Education & Training</h3>
          <p>
            A strong education system forms the foundation of a prosperous society. Public sector initiatives provide quality education and training programs to build a skilled workforce for the future.
          </p>
        </div>
        <div className="service">
          <h3>Environmental Protection</h3>
          <p>
            Public sector efforts are focused on protecting natural resources, reducing pollution, and ensuring the sustainable use of land, water, and air for future generations.
          </p>
        </div>
      </section>

      <section className="public-sector-initiatives">
        <h2>Public Sector Initiatives</h2>
        <div className="initiative">
          <h3>Community Development</h3>
          <p>
            Public sector initiatives promote community development through affordable housing, public spaces, and local engagement, helping create vibrant, sustainable communities.
          </p>
        </div>
        <div className="initiative">
          <h3>Job Creation & Economic Development</h3>
          <p>
            The public sector helps stimulate job creation through infrastructure projects, workforce development, and support for local businesses and entrepreneurs.
          </p>
        </div>
        <div className="initiative">
          <h3>Social Welfare Programs</h3>
          <p>
            Government initiatives provide support to individuals and families in need, ensuring access to food, housing, and basic services through social welfare programs.
          </p>
        </div>
      </section>

      <section className="public-sector-cta">
        <h2>Get Involved</h2>
        <p>
          Join the public sector efforts to enhance quality of life. Explore various opportunities to contribute to community development and government programs.
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
