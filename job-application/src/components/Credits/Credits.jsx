// src/components/Credits.js
import React from 'react';
import './Credits.css'; // Import your CSS for styling

const Credits = () => {
    return (
        <div className="credits">
            <h1>Credits</h1>
            <p>We would like to acknowledge the following individuals and resources that contributed to the development of our Job Application website:</p>

            <section className="credits-section">
                <h2>Development Team</h2>
                <ul>
                    <li>John Doe - Lead Developer</li>
                    <li>Jane Smith - Frontend Developer</li>
                    <li>Michael Johnson - Backend Developer</li>
                    <li>Emily Davis - UI/UX Designer</li>
                </ul>
            </section>

            <section className="credits-section">
                <h2>Special Thanks</h2>
                <ul>
                    <li>OpenAI - For the AI assistance</li>
                    <li>React - For the powerful library</li>
                    <li>Bootstrap - For the responsive design framework</li>
                    <li>Font Awesome - For the icons</li>
                </ul>
            </section>

            <section className="credits-section">
                <h2>Resources</h2>
                <ul>
                    <li><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React Documentation</a></li>
                    <li><a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap Documentation</a></li>
                    <li><a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">Font Awesome Icons</a></li>
                </ul>
            </section>
        </div>
    );
};

export default Credits;
