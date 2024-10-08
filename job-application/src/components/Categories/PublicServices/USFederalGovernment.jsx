import React from "react";
import "./USFederalGovernment.css";

const USFederalGovernment = () => {
    return (
        <div className="usgov-container">
            <header className="usgov-header">
                <h1>U.S. Federal Government Services</h1>
            </header>

            <section className="usgov-overview">
                <h2>Overview</h2>
                <p>
                    The U.S. Federal Government provides a wide range of services aimed at supporting the nation's citizens, enhancing the economy, and ensuring national security. Through collaboration with State and Local governments, federal initiatives create sustainable solutions to challenges across sectors, including healthcare, public safety, infrastructure, and education.
                </p>
            </section>

            <section className="usgov-services">
                <h2>Federal Government Services</h2>
                <div className="service">
                    <h3>Healthcare Programs</h3>
                    <p>From Medicare to Medicaid, the Federal Government offers healthcare programs that ensure access to essential medical services for all citizens.</p>
                </div>
                <div className="service">
                    <h3>Public Safety & National Security</h3>
                    <p>Through federal agencies like FEMA and the Department of Homeland Security (DHS), we work to safeguard the country from threats and emergencies.</p>
                </div>
                <div className="service">
                    <h3>Federal Grants & Funding</h3>
                    <p>The U.S. Federal Government provides funding for educational institutions, healthcare facilities, and local communities through various grant programs.</p>
                </div>
            </section>

            <section className="usgov-state-local">
                <h2>State & Local Government Initiatives</h2>
                <div className="service">
                    <h3>Infrastructure Development</h3>
                    <p>We work closely with state and local governments to build and maintain critical infrastructure such as roads, bridges, and public transportation.</p>
                </div>
                <div className="service">
                    <h3>Education & Workforce Development</h3>
                    <p>Federal initiatives support state and local governments in developing a skilled workforce through education funding and job training programs.</p>
                </div>
                <div className="service">
                    <h3>Community Development & Housing</h3>
                    <p>Federal partnerships with local governments focus on creating affordable housing and improving urban development in communities nationwide.</p>
                </div>
            </section>

            <section className="usgov-research">
                <h2>Research & Innovation</h2>
                <p>
                    Federal investment in research drives technological innovation and scientific discovery. Through agencies like NASA, NSF, and the National Institutes of Health (NIH), we push the boundaries of knowledge, ensuring a sustainable and technologically advanced future.
                </p>
            </section>

            <section className="usgov-appointments">
                <h2>Contact & Services</h2>
                <button className="appointment-btn">Explore Services</button>
            </section>

            <footer className="usgov-footer">
                <p>© 2024 U.S. Federal Government. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default USFederalGovernment;
