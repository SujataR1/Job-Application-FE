import React from "react";
import "./StateLocalGovernment.css";

const StateLocalGovernment = () => {
    return (
        <div className="gov-container">
            <header className="gov-header">
                <h1>State & Local Government</h1>
            </header>

            <section className="gov-overview">
                <h2>Overview</h2>
                <p>
                    State and local governments play a crucial role in creating and implementing policies that directly affect communities. From managing public safety to ensuring efficient transportation systems, we offer solutions that enhance governance, promote transparency, and improve service delivery.
                </p>
            </section>

            <section className="gov-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Public Safety and Security</h3>
                    <p>We provide solutions to enhance law enforcement capabilities, emergency response systems, and disaster management to ensure the safety of communities.</p>
                </div>
                <div className="service">
                    <h3>Public Health and Welfare</h3>
                    <p>Our services support public health initiatives, social welfare programs, and the effective management of healthcare resources for citizens.</p>
                </div>
                <div className="service">
                    <h3>Infrastructure and Transportation</h3>
                    <p>We offer innovative solutions for public infrastructure development, including roadways, public transport systems, and urban planning.</p>
                </div>
            </section>

            <section className="gov-initiatives">
                <h2>Government Initiatives</h2>
                <p>
                    Our government initiatives focus on enhancing public engagement, increasing civic participation, and improving access to essential services. We work closely with local governments to facilitate transparency, provide real-time data, and support decision-making for better public outcomes.
                </p>
            </section>

            <section className="gov-partnerships">
                <h2>Strategic Partnerships</h2>
                <p>
                    We collaborate with both public and private sector entities to strengthen governance frameworks, develop smart cities, and create solutions for better resource allocation.
                </p>
            </section>

            <section className="gov-contact">
                <h2>Contact Us for More Information</h2>
                <button className="gov-btn">Get In Touch</button>
            </section>

            <footer className="gov-footer">
                <p>© 2024 State & Local Government Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StateLocalGovernment;
