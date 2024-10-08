import React, { useState } from 'react';
import './Education.css'; // Import CSS for styling
import educationImage from '../../../images/education.jpg'; // Path to your image

const HigherEducationPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleWatchDemoClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="higher-education-container">
            <div className="higher-education-header">
                <h1>Higher Education Management</h1>
                <p>
                    Transform your institution with trusted HR, finance, and student solutions. 
                    Workday modernizes experiences, provides deeper insights, and streamlines operations to scale for the future, while keeping students at the center.
                </p>
            </div>

            <div className="higher-education-content">
                <div className="higher-education-left">
                    <h2>Accelerate Innovation and Drive Student Success</h2>
                    <p>
                        Leading colleges and universities use Workday to drive student excellence. 
                        Explore the success stories and see how our solutions can benefit your institution.
                    </p>
                    <button className="view-demo" onClick={handleWatchDemoClick}>Watch Demo (14:25)</button>
                </div>
                
                <div className="higher-education-right">
                    <img src={educationImage} alt="Higher Education" className="higher-education-image" />
                </div>
            </div>

            <h3>Customer Success</h3>
            <div className="customer-success">
                <p>Leading colleges and universities use Workday to drive student excellence:</p>
                <ul>
                    <li>Washington State University: Builds the foundation for attracting top talent.</li>
                    <li>Ivy Tech Community College: Rebuilt business processes for better scalability.</li>
                    <li>Western Governors University: Enables leaders to make the right decisions faster.</li>
                    <li>Collaborative for Higher Education Shared Services (Chess): Empowers colleges to implement predictive analytics.</li>
                </ul>
            </div>

            <h3>Solution Use Cases</h3>
            <div className="solution-use-cases">
                <p>A use for all aspects of your institution:</p>
                <ul>
                    <li>Student Success</li>
                    <li>Engagement and Experience</li>
                    <li>Financial Stewardship</li>
                    <li>Operationalize, Plan, and Extend Data</li>
                </ul>
            </div>

            <h3>Resources</h3>
            <div className="resources">
                <ul>
                    <li>Blog: 3 Strategies for Higher Education to Navigate the Hurdles Ahead</li>
                    <li>Use Case: Planning Use Case for Higher Education</li>
                    <li>Datasheet: Workday for Higher Education</li>
                    <li>Press Release: Workday Sees Continued Momentum in Higher Education</li>
                </ul>
            </div>

            <h3>Ready to Talk?</h3>
            <button className="talk-to-sales">Get in touch</button>

            {/* Modal for Demo */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <h3>Demo Video</h3>
                        <p>This is where the demo video will be displayed.</p>
                        {/* Embed a video player here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HigherEducationPage;
