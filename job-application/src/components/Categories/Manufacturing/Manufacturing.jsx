import React from "react";
import "./Manufacturing.css";

const Manufacturing = () => {
    return (
        <div className="manufacturing-container">
            <header className="manufacturing-header">
                <h1>Manufacturing Services</h1>
            </header>
            
            <section className="manufacturing-overview">
                <h2>Overview</h2>
                <p>
                    Our manufacturing services offer advanced production solutions for industries ranging from automotive to electronics. We prioritize quality, efficiency, and innovation to meet the evolving demands of the market.
                </p>
            </section>

            <section className="manufacturing-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Automotive Manufacturing</h3>
                    <p>State-of-the-art manufacturing processes for automotive parts and assemblies.</p>
                </div>
                <div className="service">
                    <h3>Electronics Manufacturing</h3>
                    <p>High-precision manufacturing for electronic components and devices.</p>
                </div>
                <div className="service">
                    <h3>Custom Manufacturing</h3>
                    <p>Tailored manufacturing solutions to meet the specific needs of your project.</p>
                </div>
            </section>

            <section className="manufacturing-appointments">
                <h2>Request a Consultation</h2>
                <button className="appointment-btn">Get in Touch</button>
            </section>

            <footer className="manufacturing-footer">
                <p>© 2024 Manufacturing Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Manufacturing;
