import React from "react";
import "./StateLocalGovernment.css";

const StateLocalGovernment = () => {
    return (
        <div className="state-local-container">
            <header className="state-local-header">
                <h1>State & Local Government Services</h1>
            </header>

            <section className="state-local-overview">
                <h2>Overview</h2>
                <p>
                    State and Local Governments play a pivotal role in delivering essential public services that directly affect our daily lives. From education and healthcare to infrastructure development and public safety, these services help maintain the well-being and prosperity of our communities.
                </p>
            </section>

            <section className="state-local-services">
                <h2>Core Services</h2>
                <div className="service">
                    <h3>Education & Schools</h3>
                    <p>
                        State and Local governments provide critical funding for schools, colleges, and vocational training centers, ensuring quality education and career opportunities for all.
                    </p>
                </div>
                <div className="service">
                    <h3>Public Health & Safety</h3>
                    <p>
                        Local and state health agencies deliver healthcare services, manage public health crises, and coordinate safety measures for communities to ensure a secure and healthy environment.
                    </p>
                </div>
                <div className="service">
                    <h3>Transportation & Infrastructure</h3>
                    <p>
                        Local governments manage and maintain transportation networks, including roads, bridges, and public transit systems, contributing to safe and efficient mobility.
                    </p>
                </div>
                <div className="service">
                    <h3>Emergency Response & Disaster Management</h3>
                    <p>
                        State and local authorities work together to provide emergency response services, disaster preparedness, and recovery efforts, ensuring resilience in times of crisis.
                    </p>
                </div>
            </section>

            <section className="state-local-collaboration">
                <h2>Collaboration with Federal Government</h2>
                <p>
                    State and local governments partner with the federal government on numerous programs and projects, such as education grants, disaster relief funds, and infrastructure development to support and enhance community well-being.
                </p>
            </section>

            <section className="state-local-initiatives">
                <h2>Current Initiatives</h2>
                <ul>
                    <li>Smart City Projects - Enhancing urban living with advanced technology and infrastructure.</li>
                    <li>Healthcare Accessibility - Providing affordable healthcare and improving local health facilities.</li>
                    <li>Community Safety Programs - Strengthening neighborhood policing, public health, and emergency preparedness.</li>
                    <li>Environmental Sustainability - Developing green initiatives to protect and preserve natural resources.</li>
                </ul>
            </section>

            <section className="state-local-contact">
                <h2>Contact Your Local Government</h2>
                <p>
                    Get in touch with your local government office to learn more about the available services and initiatives in your area.
                </p>
                <button className="contact-btn">Find Local Services</button>
            </section>

            <footer className="state-local-footer">
                <p>© 2024 State & Local Government Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StateLocalGovernment;
