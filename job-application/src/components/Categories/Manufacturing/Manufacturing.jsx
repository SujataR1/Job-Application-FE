import React from "react";
import "./Manufacturing.css";

const Manufacturing = () => {
    return (
        <div className="manufacturing-container">
            <header className="manufacturing-header">
                <h1>Manufacturing Industry Solutions</h1>
                <p>Empowering the future of manufacturing with innovation, efficiency, and sustainability.</p>
            </header>

            <section className="manufacturing-overview">
                <h2>Overview</h2>
                <p>
                    The manufacturing industry plays a pivotal role in global economies, driving progress through innovative technologies,
                    increased productivity, and enhanced sustainability efforts. Our solutions are designed to optimize production processes,
                    streamline supply chains, and support the industry’s growing need for eco-friendly practices.
                </p>
            </section>

            <section className="manufacturing-services">
                <h2>Key Services</h2>
                <div className="service">
                    <h3>Smart Manufacturing</h3>
                    <p>Utilize IoT and automation to streamline production, reduce downtime, and enhance quality control.</p>
                </div>
                <div className="service">
                    <h3>Supply Chain Optimization</h3>
                    <p>Leverage AI-driven analytics to predict trends, optimize logistics, and minimize disruptions in the supply chain.</p>
                </div>
                <div className="service">
                    <h3>Energy Efficiency Solutions</h3>
                    <p>Implement sustainable practices to reduce energy consumption and minimize environmental impact.</p>
                </div>
                <div className="service">
                    <h3>Workforce Training & Development</h3>
                    <p>Offer cutting-edge training programs to upskill employees and prepare them for Industry 4.0 technologies.</p>
                </div>
            </section>

            <section className="manufacturing-innovation">
                <h2>Innovation in Manufacturing</h2>
                <p>
                    The future of manufacturing is built on innovation. By integrating technologies like 3D printing, robotics, and artificial
                    intelligence, we aim to revolutionize how products are designed, produced, and delivered, enhancing both efficiency and
                    product quality.
                </p>
            </section>

            <section className="manufacturing-sustainability">
                <h2>Sustainability & Green Manufacturing</h2>
                <p>
                    Green manufacturing focuses on reducing the environmental footprint of production processes. By using renewable
                    resources, adopting waste-reducing practices, and focusing on eco-friendly materials, we help manufacturers transition
                    to more sustainable production methods.
                </p>
            </section>

            <section className="manufacturing-contact">
                <h2>Contact Us</h2>
                <p>
                    Ready to optimize your manufacturing processes? Reach out today to learn how our solutions can transform your business.
                </p>
                <button className="contact-btn">Get in Touch</button>
            </section>

            <footer className="manufacturing-footer">
                <p>© 2024 Manufacturing Solutions. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Manufacturing;
