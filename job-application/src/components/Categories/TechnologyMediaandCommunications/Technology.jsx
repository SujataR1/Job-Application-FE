import React from "react";
import "./Technology.css";

const Technology = () => {
    return (
        <div className="tech-container">
            <header className="tech-header">
                <h1>Technology Solutions</h1>
                <p>Empowering businesses through innovation and digital transformation.</p>
            </header>

            <section className="tech-intro">
                <h2>Driving Innovation</h2>
                <p>
                    We leverage cutting-edge technologies to help businesses achieve more, enabling them to stay ahead in a fast-paced, ever-evolving digital landscape.
                </p>
            </section>

            <section className="tech-services">
                <h2>Our Core Services</h2>
                <div className="service">
                    <h3>Cloud Computing</h3>
                    <p>We offer scalable, secure cloud infrastructure that empowers businesses to grow without limits.</p>
                </div>
                <div className="service">
                    <h3>Artificial Intelligence</h3>
                    <p>Implement AI-powered solutions to automate processes, improve decision-making, and drive innovation.</p>
                </div>
                <div className="service">
                    <h3>Cybersecurity</h3>
                    <p>We ensure your digital assets are secure, with top-notch cybersecurity protocols that keep data safe and compliant.</p>
                </div>
            </section>

            <section className="tech-innovation">
                <h2>Technological Advancements</h2>
                <div className="tech-advancement">
                    <h3>Big Data Analytics</h3>
                    <p>Unlock the power of your data with advanced analytics that provide actionable insights for business growth.</p>
                </div>
                <div className="tech-advancement">
                    <h3>Internet of Things (IoT)</h3>
                    <p>Connect devices and systems to create smarter, more efficient operations across industries.</p>
                </div>
                <div className="tech-advancement">
                    <h3>Blockchain</h3>
                    <p>Build trust and transparency in your operations with our blockchain development solutions.</p>
                </div>
            </section>

            <section className="tech-future">
                <h2>The Future of Technology</h2>
                <p>
                    Our focus is on fostering innovation to prepare businesses for the future. Whether it's quantum computing or immersive technologies like AR and VR, we help you stay ahead of the curve.
                </p>
                <button className="contact-btn">Get in Touch</button>
            </section>

            <footer className="tech-footer">
                <p>© 2024 Technology Solutions. Innovating for Tomorrow.</p>
            </footer>
        </div>
    );
};

export default Technology;