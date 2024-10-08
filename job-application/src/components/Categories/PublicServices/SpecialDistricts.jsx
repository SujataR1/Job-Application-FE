import React from "react";
import "./SpecialDistricts.css";

const SpecialDistricts = () => {
    return (
        <div className="special-districts-container">
            <header className="special-districts-header">
                <h1>Special Districts</h1>
            </header>
            
            <section className="special-districts-overview">
                <h2>Overview</h2>
                <p>
                    Special districts are government units created to address specific needs within a defined area, such as public safety, education, transportation, and water management. These districts operate autonomously to fulfill specific functions that benefit the local community.
                </p>
            </section>

            <section className="special-districts-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Public Safety</h3>
                    <p>We provide specialized law enforcement, fire protection, and emergency medical services to ensure the safety and well-being of the community.</p>
                </div>
                <div className="service">
                    <h3>Education and Libraries</h3>
                    <p>Our special districts enhance educational access and provide well-maintained public libraries to foster lifelong learning.</p>
                </div>
                <div className="service">
                    <h3>Transportation</h3>
                    <p>We manage and maintain roads, transit systems, and bike paths to improve connectivity and reduce congestion.</p>
                </div>
                <div className="service">
                    <h3>Water Management</h3>
                    <p>Our water districts ensure clean water supply and efficient management of water resources, promoting sustainability and conservation.</p>
                </div>
            </section>

            <section className="special-districts-research">
                <h2>Research & Future Initiatives</h2>
                <p>
                    We continuously conduct research and engage with community members to explore new ways to enhance services, improve operational efficiency, and respond to future challenges. Our future initiatives include developing smart city solutions and sustainable infrastructure projects.
                </p>
            </section>

            <section className="special-districts-contact">
                <h2>Contact Us</h2>
                <button className="contact-btn">Get in Touch</button>
            </section>

            <footer className="special-districts-footer">
                <p>© 2024 Special Districts. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SpecialDistricts;
