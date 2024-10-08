import React from "react";
import "./PublicSector.css";

const PublicSector = () => {
    return (
        <div className="publicsector-container">
            <header className="publicsector-header">
                <h1>Public Sector</h1>
            </header>

            <section className="publicsector-overview">
                <h2>Overview</h2>
                <p>
                    The public sector encompasses government services that are provided to citizens, including education, healthcare, transportation, and more. Our public sector solutions focus on improving transparency, efficiency, and service delivery to meet the needs of the public and ensure sustainable development.
                </p>
            </section>

            <section className="publicsector-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Public Infrastructure</h3>
                    <p>We provide expertise in the design, development, and management of public infrastructure projects to improve connectivity and ensure sustainable urban growth.</p>
                </div>
                <div className="service">
                    <h3>Governance & Policy</h3>
                    <p>Our services support government agencies in creating policies, enhancing governance, and promoting accountability within public institutions.</p>
                </div>
                <div className="service">
                    <h3>Public Health Systems</h3>
                    <p>We develop solutions that strengthen public health systems by enhancing service delivery, reducing costs, and improving patient outcomes.</p>
                </div>
            </section>

            <section className="publicsector-innovation">
                <h2>Innovation in Public Service</h2>
                <p>
                    Our innovative approach leverages modern technology such as cloud computing, data analytics, and AI to enhance public service delivery, increase transparency, and improve citizen engagement.
                </p>
            </section>

            <section className="publicsector-appointments">
                <h2>Get in Touch</h2>
                <button className="appointment-btn">Contact Us</button>
            </section>

            <footer className="publicsector-footer">
                <p>© 2024 Public Sector. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PublicSector;
