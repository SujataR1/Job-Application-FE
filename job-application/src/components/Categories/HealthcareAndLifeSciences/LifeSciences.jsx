import React from "react";
import "./LifeSciences.css";

const LifeScience = () => {
    return (
        <div className="lifescience-container">
            <header className="lifescience-header">
                <h1>Life Sciences and Innovation</h1>
                <p>Advancing Research and Healthcare for a Better Tomorrow</p>
            </header>

            <section className="lifescience-overview">
                <h2>Overview</h2>
                <p>
                    Life Sciences encompasses the study of living organisms and the application of scientific discoveries to improve health, agriculture, and environmental sustainability. This section highlights major advancements in life science research and their impact on society.
                </p>
            </section>

            <section className="lifescience-areas">
                <h2>Key Areas of Focus</h2>
                <div className="area-card">
                    <h3>Biotechnology</h3>
                    <p>
                        Biotechnology is revolutionizing healthcare and agriculture by harnessing biological systems to develop cutting-edge therapies and sustainable agricultural practices.
                    </p>
                </div>
                <div className="area-card">
                    <h3>Genomics</h3>
                    <p>
                        Advances in genomics enable personalized medicine, helping tailor treatments to individual genetic profiles for more effective outcomes.
                    </p>
                </div>
                <div className="area-card">
                    <h3>Pharmaceutical Research</h3>
                    <p>
                        Pharmaceutical research is constantly evolving, with new drug developments and treatment strategies aimed at curing diseases that were once considered untreatable.
                    </p>
                </div>
            </section>

            <section className="lifescience-innovations">
                <h2>Recent Innovations</h2>
                <div className="innovation">
                    <h3>CRISPR Technology</h3>
                    <p>
                        CRISPR technology allows scientists to edit genes with unprecedented precision, offering the potential to cure genetic disorders and revolutionize medical treatments.
                    </p>
                </div>
                <div className="innovation">
                    <h3>Stem Cell Therapy</h3>
                    <p>
                        Stem cell research is at the forefront of regenerative medicine, offering hope for healing tissues and organs damaged by disease or injury.
                    </p>
                </div>
                <div className="innovation">
                    <h3>AI in Drug Discovery</h3>
                    <p>
                        Artificial intelligence is being integrated into drug discovery processes, speeding up the identification of new compounds and reducing the time to market for new treatments.
                    </p>
                </div>
            </section>

            <section className="lifescience-education">
                <h2>Life Sciences Education & Careers</h2>
                <p>
                    The future of Life Sciences lies in education and innovation. Schools, universities, and research institutions are nurturing the next generation of scientists and researchers to drive the future of biology, medicine, and environmental science.
                </p>
            </section>

            <section className="lifescience-footer">
                <button className="learn-more-btn">Learn More About Life Sciences</button>
            </section>

            <footer className="lifescience-footer">
                <p>© 2024 Life Sciences Innovations. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LifeScience;
