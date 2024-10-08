import React from "react";
import "./Nonprofit.css";

const Nonprofit = () => {
    return (
        <div className="nonprofit-container">
            <header className="nonprofit-header">
                <h1>Nonprofit Organization</h1>
            </header>
            
            <section className="nonprofit-overview">
                <h2>Our Mission</h2>
                <p>
                    Our nonprofit organization is dedicated to supporting communities in need, providing resources, and empowering individuals to achieve their fullest potential. We focus on social justice, education, and healthcare, working to make a positive impact on society.
                </p>
            </section>

            <section className="nonprofit-services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Community Outreach</h3>
                    <p>We engage with local communities through outreach programs that provide food, shelter, and emotional support to those in need.</p>
                </div>
                <div className="service">
                    <h3>Educational Support</h3>
                    <p>Our educational programs provide underprivileged students with the tools they need to succeed, offering mentorship, scholarships, and tutoring.</p>
                </div>
                <div className="service">
                    <h3>Healthcare Access</h3>
                    <p>We offer free healthcare services, including medical checkups, mental health counseling, and health education programs to underserved communities.</p>
                </div>
            </section>

            <section className="nonprofit-research">
                <h2>Research and Advocacy</h2>
                <p>
                    Our team conducts research and works on advocacy initiatives to raise awareness about critical social issues such as poverty, education, and healthcare. We collaborate with other organizations and governments to create lasting, systemic change.
                </p>
            </section>

            <section className="nonprofit-get-involved">
                <h2>Get Involved</h2>
                <p>
                    Join us in our mission to create positive change. Whether through volunteering, donating, or spreading the word, you can help make a difference in the lives of others.
                </p>
                <button className="get-involved-btn">Join Us Today</button>
            </section>

            <footer className="nonprofit-footer">
                <p>© 2024 Nonprofit Organization. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Nonprofit;
