import React from "react";
import "./LifeSciences.css";

const LifeScience = () => {
    return (
        <div className="lifescience-container">
            <header className="lifescience-header">
                <h1>Life Sciences</h1>
            </header>
            
            <section className="lifescience-overview">
                <h2>Overview</h2>
                <p>
                    Life sciences encompass the study of living organisms and their vital processes. We provide comprehensive solutions and services that support research, drug development, biotechnology, and healthcare. Our goal is to advance scientific discovery and improve human health through innovation and collaboration.
                </p>
            </section>

            <section className="lifescience-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Biotechnology Research</h3>
                    <p>We offer cutting-edge research in biotechnology to develop novel therapeutic solutions and improve agricultural practices.</p>
                </div>
                <div className="service">
                    <h3>Pharmaceutical Development</h3>
                    <p>Our pharmaceutical services support the entire drug development lifecycle, from initial discovery to clinical trials and commercialization.</p>
                </div>
                <div className="service">
                    <h3>Healthcare Solutions</h3>
                    <p>We offer innovative healthcare solutions aimed at improving patient outcomes through personalized medicine, diagnostic tools, and advanced treatments.</p>
                </div>
            </section>

            <section className="lifescience-research">
                <h2>Research and Innovation</h2>
                <p>
                    Our research team focuses on the development of novel treatments for chronic diseases such as cancer, diabetes, and cardiovascular conditions. We utilize advanced technologies, including CRISPR, artificial intelligence, and genomics, to accelerate breakthroughs in the life sciences.
                </p>
            </section>

            <section className="lifescience-appointments">
                <h2>Schedule a Consultation</h2>
                <button className="appointment-btn">Contact Us</button>
            </section>

            <footer className="lifescience-footer">
                <p>© 2024 Life Sciences. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LifeScience;
