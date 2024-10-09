import React from "react";
import "./SpecialDistricts.css";

const SpecialDistricts = () => {
    return (
        <div className="special-districts-container">
            <header className="special-districts-header">
                <h1>Special Districts and Local Governance</h1>
                <p>Empowering communities through specialized services and governance.</p>
            </header>

            <section className="special-districts-overview">
                <h2>What Are Special Districts?</h2>
                <p>
                    Special Districts are unique governmental entities created to address specific needs within communities,
                    such as water, fire, transit, healthcare, and educational services. These districts operate autonomously,
                    while working in partnership with local governments to enhance quality of life.
                </p>
            </section>

            <section className="special-districts-services">
                <h2>Key Services of Special Districts</h2>
                <div className="service">
                    <h3>Water & Sanitation Services</h3>
                    <p>Special districts provide clean and safe water, along with waste management services to ensure public health and hygiene.</p>
                </div>
                <div className="service">
                    <h3>Fire & Emergency Services</h3>
                    <p>Fire departments within special districts offer rapid response to emergencies, saving lives and protecting property.</p>
                </div>
                <div className="service">
                    <h3>Public Transportation</h3>
                    <p>Through transit districts, communities have access to reliable public transportation systems, reducing congestion and promoting eco-friendly travel.</p>
                </div>
                <div className="service">
                    <h3>Healthcare & Social Services</h3>
                    <p>Special districts manage healthcare facilities, including clinics and hospitals, providing essential medical services and improving community well-being.</p>
                </div>
                <div className="service">
                    <h3>Education & Community Development</h3>
                    <p>Districts focus on developing local education systems and creating safe community spaces for youth and families.</p>
                </div>
            </section>

            <section className="special-districts-initiatives">
                <h2>Recent Initiatives & Achievements</h2>
                <ul>
                    <li><strong>Smart Water Management:</strong> Implementing smart technologies to conserve water and improve supply management.</li>
                    <li><strong>Emergency Response Upgrades:</strong> Enhanced training and equipment for fire and rescue operations.</li>
                    <li><strong>Public Transit Expansion:</strong> Increasing access to public transportation routes and reducing carbon emissions.</li>
                </ul>
            </section>

            <section className="special-districts-contact">
                <h2>Contact Your Local Special District</h2>
                <p>If you have questions or would like to learn more about the services offered in your area, reach out to your local special district.</p>
                <button className="contact-btn">Get in Touch</button>
            </section>

            <footer className="special-districts-footer">
                <p>© 2024 Special Districts. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SpecialDistricts;
