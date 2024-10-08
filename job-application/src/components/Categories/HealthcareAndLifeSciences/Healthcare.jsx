import React from "react";
import "./Healthcare.css";

const Healthcare = () => {
    return (
        <div className="healthcare-container">
            <header className="healthcare-header">
                <h1>Healthcare Services</h1>
            </header>
            
            <section className="healthcare-overview">
                <h2>Overview</h2>
                <p>
                    We provide a wide range of healthcare services, including primary care, specialist consultations, and emergency care. Our dedicated team is here to ensure you receive the best medical care possible.
                </p>
            </section>

            <section className="healthcare-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Primary Care</h3>
                    <p>General health assessments, preventive care, and ongoing treatments.</p>
                </div>
                <div className="service">
                    <h3>Specialist Consultations</h3>
                    <p>Consultations with leading specialists across various fields.</p>
                </div>
                <div className="service">
                    <h3>Emergency Care</h3>
                    <p>Immediate attention for acute medical conditions and injuries.</p>
                </div>
            </section>

            <section className="healthcare-appointments">
                <h2>Book an Appointment</h2>
                <button className="appointment-btn">Schedule Now</button>
            </section>

            <footer className="healthcare-footer">
                <p>© 2024 Healthcare Services. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Healthcare;
