import React from "react";
import "./Healthcare.css";

const Healthcare = () => {
    return (
        <div className="healthcare-container">
            <header className="healthcare-header">
                <h1>Healthcare Services</h1>
                <p>Access to quality healthcare for every individual</p>
            </header>

            <section className="healthcare-overview">
                <h2>Overview</h2>
                <p>
                    Healthcare is a basic human right. Our healthcare system offers comprehensive services to help individuals
                    live healthier lives. From preventive care to specialized treatment, our goal is to ensure that all citizens
                    have access to affordable and high-quality healthcare.
                </p>
            </section>

            <section className="healthcare-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Primary Care</h3>
                    <p>Comprehensive medical care including health screenings, annual check-ups, and chronic disease management.</p>
                </div>
                <div className="service">
                    <h3>Specialized Care</h3>
                    <p>Access to specialized healthcare providers for advanced treatments and procedures in various fields like cardiology, oncology, etc.</p>
                </div>
                <div className="service">
                    <h3>Emergency Care</h3>
                    <p>Round-the-clock emergency care services for immediate medical attention in case of accidents or health emergencies.</p>
                </div>
                <div className="service">
                    <h3>Mental Health Services</h3>
                    <p>Support for mental health with counseling, therapy, and psychiatric care for individuals and families.</p>
                </div>
            </section>

            <section className="healthcare-prevention">
                <h2>Preventive Healthcare</h2>
                <p>
                    Preventive healthcare is essential for maintaining good health. We offer services such as vaccinations, 
                    screenings, and wellness check-ups to ensure early detection and prevention of illnesses.
                </p>
            </section>

            <section className="healthcare-resources">
                <h2>Healthcare Resources</h2>
                <div className="resource">
                    <h3>Insurance Information</h3>
                    <p>Learn about health insurance options, including Medicaid, Medicare, and private health plans.</p>
                </div>
                <div className="resource">
                    <h3>Health Tips</h3>
                    <p>Get advice and tips for maintaining a healthy lifestyle, including nutrition, exercise, and mental wellness.</p>
                </div>
            </section>

            <section className="healthcare-appointments">
                <h2>Book an Appointment</h2>
                <p>Schedule an appointment with a healthcare professional today and start your journey to better health.</p>
                <button className="appointment-btn">Book Now</button>
            </section>

            <footer className="healthcare-footer">
                <p>© 2024 Healthcare Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Healthcare;
