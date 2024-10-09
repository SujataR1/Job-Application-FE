import React from "react";
import "./AllIndustries.css";

const AllIndustries = () => {
    return (
        <div className="industries-container">
            <header className="industries-header">
                <h1>Explore All Industries</h1>
                <p>Your gateway to cutting-edge solutions tailored for every sector.</p>
            </header>

            <section className="industries-intro">
                <h2>Tailored Solutions Across Industries</h2>
                <p>
                    With deep industry expertise and a passion for innovation, we deliver cutting-edge solutions for businesses across diverse sectors. Whether you are in healthcare, technology, finance, or government, we understand your unique challenges and offer specialized solutions to help you thrive.
                </p>
            </section>

            <section className="industries-list">
                <h2>Industries We Serve</h2>
                <div className="industries-grid">
                    <div className="industry-card">
                        <h3>Technology</h3>
                        <p>Driving innovation through transformative digital solutions and technology consulting.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Healthcare</h3>
                        <p>Improving healthcare delivery with data-driven insights, digital tools, and patient-centric solutions.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Manufacturing</h3>
                        <p>Optimizing production with smart manufacturing solutions and IoT-driven efficiencies.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Government</h3>
                        <p>Empowering public services with secure, scalable technology solutions for enhanced citizen engagement.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Finance</h3>
                        <p>Revolutionizing the financial sector with fintech solutions and digital banking innovations.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Retail</h3>
                        <p>Transforming the retail experience with omnichannel commerce and personalized customer experiences.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Telecommunications</h3>
                        <p>Enabling seamless connectivity with next-gen networking and communication technologies.</p>
                    </div>
                    <div className="industry-card">
                        <h3>Life Sciences</h3>
                        <p>Supporting cutting-edge research and innovation to improve patient outcomes and accelerate drug discovery.</p>
                    </div>
                </div>
            </section>

            <section className="industries-cta">
                <h2>Ready to Transform Your Industry?</h2>
                <p>Contact us today to explore how our solutions can help your business innovate, grow, and excel.</p>
                <button className="contact-btn">Get in Touch</button>
            </section>

            <footer className="industries-footer">
                <p>© 2024 Transmogrify . All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AllIndustries;
