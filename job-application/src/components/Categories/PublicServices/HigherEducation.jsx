import React from "react";
import "./HigherEducation.css";

const HigherEducation = () => {
    return (
        <div className="highereducation-container">
            <header className="highereducation-header">
                <h1>Higher Education</h1>
            </header>

            <section className="highereducation-overview">
                <h2>Overview</h2>
                <p>
                    Higher education is crucial for the development of advanced skills, knowledge, and expertise in various fields. Our programs are designed to foster academic excellence, leadership, and innovation. With a focus on research, critical thinking, and real-world application, we aim to empower the next generation of leaders.
                </p>
            </section>

            <section className="highereducation-programs">
                <h2>Our Programs</h2>
                <div className="program">
                    <h3>Undergraduate Degrees</h3>
                    <p>Our undergraduate programs provide foundational education and prepare students for entry into professional careers and higher studies.</p>
                </div>
                <div className="program">
                    <h3>Graduate Degrees</h3>
                    <p>Our graduate programs offer specialized knowledge and skills, giving students the opportunity to become experts in their chosen fields.</p>
                </div>
                <div className="program">
                    <h3>Online Education</h3>
                    <p>We provide flexible online learning options that allow students to pursue their education from anywhere, at their own pace.</p>
                </div>
            </section>

            <section className="highereducation-research">
                <h2>Research and Innovation</h2>
                <p>
                    Our institutions are home to groundbreaking research in diverse fields such as engineering, business, healthcare, and the arts. By supporting interdisciplinary research, we aim to solve real-world challenges and push the boundaries of knowledge.
                </p>
            </section>

            <section className="highereducation-admissions">
                <h2>Admissions</h2>
                <p>Apply today to join a community dedicated to academic excellence and transformative learning. Our admissions process is simple and designed to help you succeed. Take the first step towards a brighter future!</p>
                <button className="admissions-btn">Apply Now</button>
            </section>

            <footer className="highereducation-footer">
                <p>© 2024 Higher Education. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HigherEducation;
