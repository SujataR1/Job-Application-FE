import React from "react";
import "./Technology.css";

const Technology = () => {
    return (
        <div className="tech-container">
            <header className="tech-header">
                <h1 className="fade-in">Technology Solutions</h1>
                <p className="slide-in">Empowering businesses through innovation and digital transformation.</p>
            </header>

            <section className="tech-intro">
                <h2 className="fade-in">Driving Innovation</h2>
                <p>
                    We leverage cutting-edge technologies to help businesses achieve more, enabling them to stay ahead in a fast-paced, ever-evolving digital landscape.
                </p>
            </section>

            <section className="tech-services">
                <h2 className="fade-in">Our Core Services</h2>
                <div className="services-grid">
                    <div className="service card-hover">
                        <h3>Cloud Computing</h3>
                        <p>We offer scalable, secure cloud infrastructure that empowers businesses to grow without limits.</p>
                    </div>
                    <div className="service card-hover">
                        <h3>Artificial Intelligence</h3>
                        <p>Implement AI-powered solutions to automate processes, improve decision-making, and drive innovation.</p>
                    </div>
                    <div className="service card-hover">
                        <h3>Cybersecurity</h3>
                        <p>We ensure your digital assets are secure, with top-notch cybersecurity protocols that keep data safe and compliant.</p>
                    </div>
                </div>
            </section>

            <section className="tech-innovation">
                <h2 className="fade-in">Technological Advancements</h2>
                <div className="advancements-grid">
                    <div className="tech-advancement card-hover">
                        <h3>Big Data Analytics</h3>
                        <p>Unlock the power of your data with advanced analytics that provide actionable insights for business growth.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>Internet of Things (IoT)</h3>
                        <p>Connect devices and systems to create smarter, more efficient operations across industries.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>Blockchain</h3>
                        <p>Build trust and transparency in your operations with our blockchain development solutions.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>Machine Learning</h3>
                        <p>Implement machine learning algorithms to automate tasks, enhance data accuracy, and make smarter business predictions.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>Quantum Computing</h3>
                        <p>Explore the future of computational power with quantum computing solutions to solve complex problems in seconds.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>Edge Computing</h3>
                        <p>Process data closer to where it is generated, reducing latency and increasing efficiency for IoT and real-time applications.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>5G Networking</h3>
                        <p>Unlock faster, more reliable network connectivity for your devices, enabling seamless communication and high-speed data transfer.</p>
                    </div>
                    <div className="tech-advancement card-hover">
                        <h3>AR & VR Solutions</h3>
                        <p>Create immersive experiences for customers with Augmented and Virtual Reality, transforming how people interact with your products.</p>
                    </div>

                </div>
            </section>

            <section className="tech-future">
                <h2 className="fade-in">The Future of Technology</h2>
                <p>
                    Our focus is on fostering innovation to prepare businesses for the future. Whether it's quantum computing or immersive technologies like AR and VR, we help you stay ahead of the curve.
                </p>
                <button className="contact-btn pulse">Get in Touch</button>
            </section>

            <footer className="tech-footer">
                <p>© 2024 Technology Solutions. Innovating for Tomorrow.</p>
            </footer>
        </div>
    );
};

export default Technology;
