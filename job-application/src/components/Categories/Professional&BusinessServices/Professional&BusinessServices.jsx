import React from "react";
import "./Professional&BusinessServices.css";

const ProfessionalBusinessServices = () => {
    return (
        <div className="pbs-container">
            <header className="pbs-header">
                <h1>Professional & Business Services</h1>
            </header>

            <section className="pbs-overview">
                <h2>Overview</h2>
                <p>
                    Our Professional & Business Services aim to help businesses grow and succeed. From consultancy and financial services to IT solutions and legal advice, we provide comprehensive support that is tailored to meet the unique needs of your organization. Let us help you unlock your business potential.
                </p>
            </section>

            <section className="pbs-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Consulting Services</h3>
                    <p>Our experienced consultants offer strategic insights to help your business make informed decisions and improve operational efficiency.</p>
                </div>
                <div className="service">
                    <h3>Financial Advisory</h3>
                    <p>We provide expert financial advice to help businesses with risk management, investments, and overall financial planning.</p>
                </div>
                <div className="service">
                    <h3>Legal Services</h3>
                    <p>Our legal team offers comprehensive services, including contract law, dispute resolution, and regulatory compliance assistance.</p>
                </div>
                <div className="service">
                    <h3>IT Solutions</h3>
                    <p>We help businesses implement cutting-edge IT infrastructure and software solutions to enhance productivity and security.</p>
                </div>
            </section>

            <section className="pbs-industry-focus">
                <h2>Industry Focus</h2>
                <p>
                    We specialize in offering services across various industries, including finance, healthcare, technology, and more. Our tailored solutions address the specific challenges faced by businesses in each sector, ensuring success in a competitive marketplace.
                </p>
            </section>

            <section className="pbs-appointment">
                <h2>Get in Touch</h2>
                <button className="appointment-btn">Request Consultation</button>
            </section>

            <footer className="pbs-footer">
                <p>© 2024 Professional & Business Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProfessionalBusinessServices;
