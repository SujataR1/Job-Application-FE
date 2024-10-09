import React from "react";
import "./HigherEducation.css";

const HigherEducation = () => {
    return (
        <div className="higher-education-container">
            <header className="higher-education-header">
                <h1>Higher Education Opportunities</h1>
            </header>

            <section className="higher-education-overview">
                <h2>Overview</h2>
                <p>
                    Higher education plays a crucial role in personal development, career advancement, and societal progress. It provides students with the skills, knowledge, and experiences necessary to thrive in a rapidly changing world. Explore various programs, scholarships, and resources to help you succeed in your academic journey.
                </p>
            </section>

            <section className="higher-education-programs">
                <h2>Academic Programs</h2>
                <div className="program-card">
                    <h3>Undergraduate Programs</h3>
                    <p>Explore diverse undergraduate degrees that prepare students for a wide range of careers, from engineering and science to arts and humanities.</p>
                </div>
                <div className="program-card">
                    <h3>Postgraduate Programs</h3>
                    <p>Advance your knowledge and expertise with postgraduate degrees that offer specialization in various fields, including business, law, medicine, and more.</p>
                </div>
                <div className="program-card">
                    <h3>Online Learning</h3>
                    <p>Access flexible and innovative online learning platforms offering degree programs and certifications from top universities globally.</p>
                </div>
            </section>

            <section className="higher-education-scholarships">
                <h2>Scholarships & Financial Aid</h2>
                <div className="scholarship-card">
                    <h3>Merit-Based Scholarships</h3>
                    <p>Explore a range of merit-based scholarships for students with outstanding academic achievements. These scholarships are awarded based on academic performance, leadership, and community involvement.</p>
                </div>
                <div className="scholarship-card">
                    <h3>Need-Based Financial Aid</h3>
                    <p>Financial assistance is available to help students meet their educational expenses. Learn about federal and state financial aid programs that provide support based on financial need.</p>
                </div>
                <div className="scholarship-card">
                    <h3>International Scholarships</h3>
                    <p>Students from abroad can access scholarships to study in leading universities across the globe. These scholarships provide financial support for international students pursuing higher education in different countries.</p>
                </div>
            </section>

            <section className="higher-education-careers">
                <h2>Career Development & Internships</h2>
                <p>
                    Higher education is not just about academic success, it's also about preparing for a successful career. Explore career services, internships, and job placement programs designed to help you land your dream job.
                </p>
            </section>

            <section className="higher-education-contact">
                <h2>Get In Touch</h2>
                <p>If you have any questions about our programs or would like more information, don't hesitate to reach out. We're here to help you on your educational journey!</p>
                <button className="contact-btn">Contact Us</button>
            </section>

            <footer className="higher-education-footer">
                <p>© 2024 Higher Education. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HigherEducation;
