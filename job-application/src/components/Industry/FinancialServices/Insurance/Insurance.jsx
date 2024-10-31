import React, { useState } from 'react';
import './Insurance.css'; // Import CSS for styling
import InsuranceImage from '../../../images/Insurance1.png'; // Import the main insurance image
import { FaUsers, FaChartLine, FaFileInvoiceDollar, FaShieldAlt } from 'react-icons/fa'; // Import icons

const InsuranceLandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showResources, setShowResources] = useState(false); // State for resources visibility

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleToggleResources = () => {
        setShowResources(prevState => !prevState);
    };

    return (
        <div className="insurance-container">
            <section className="hero-section">
                <div className="content">
                    <h1>Build a Nimble Insurance Organization</h1>
                    <p>
                        Ready to turn your data into a business asset? Only Workday puts AI at the core of an open and connected system to help you make smarter decisions, uncover risks, and quickly act on what you see.
                    </p>
                    <div className="button-container">
                        <button className="demo-button">View Demo (2:57)</button>
                        <button className="ebook-button" onClick={handleReadEbookClick}>Read eBook</button>
                    </div>
                </div>
                <div className="image">
                    <img src={InsuranceImage} alt="Insurance Visual" />
                </div>
            </section>

            <section className="industry-section">
                <div className="industry">
                    <h2>For Your Industry</h2>
                    <h3>Life Insurance</h3>
                    <p>Facing unstable market conditions and unpredictable events? Take it all in stride with a platform that’s ready for anything.</p>
                    <button className="learn-more-button">Learn More</button>
                </div>
                <div className="industry">
                    <h3>Property and Casualty Insurance</h3>
                    <p>You don’t have to choose between organizational agility and growth. Future-proof and transform your business with one platform.</p>
                    <button className="learn-more-button">Learn More</button>
                </div>
            </section>

            <section className="success-section">
                <h2>Who Succeeds With Us</h2>
                <div className="companies">
                    <div className="company">
                        <FaUsers />
                        <h3>Health First</h3>
                        <p>Automates premiums and claims data integration using automated and scalable finance.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                    <div className="company">
                        <FaChartLine />
                        <h3>AON</h3>
                        <p>Shortens the close cycle by 25% using financial reporting and analytics.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                    <div className="company">
                        <FaFileInvoiceDollar />
                        <h3>CNA</h3>
                        <p>Increases IT efficiency by 27% using continuous and company-wide planning.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                    <div className="company">
                        <FaShieldAlt />
                        <h3>AIA</h3>
                        <p> Gains 24/7 insights into staff development and improves communication with talent management </p>
                        <button className="see-story-button">See Story</button>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2>Talent Management</h2>
                <div className="features-box">
                    <h3>Continuous and Company-Wide Planning</h3>
                    <ul>
                        <li>Claims Modeling</li>
                        <li>Product and Branch Profitability</li>
                        <li>Operational Expense Planning</li>
                        <li>Premiums Forecasting</li>
                        <li>Workforce Planning</li>
                        <li>Reinsurance Rate Planning</li>
                    </ul>
                </div>

                <div className="features-box">
                    <h3>Automated and Scalable Finance</h3>
                    <ul>
                        <li>Risk and Financial Controls</li>
                        <li>Streamlined Operational Data Integration</li>
                        <li>Insurance Policy and Claim Subledgers</li>
                        <li>Deferred Acquisition Cost (DAC) and Premium Spreads</li>
                        <li>Remeasurement Accounting (LDTI/IFRS 17)</li>
                        <li>Cost Allocations</li>
                    </ul>
                </div>

                <div className="features-box">
                    <h3>Financial Reporting and Analytics</h3>
                    <ul>
                        <li>Insurance Data Models/Finance Data Warehouse</li>
                        <li>Risk and Actuarial Financial Reporting</li>
                        <li>SEC Reporting</li>
                        <li>ESG Reporting</li>
                        <li>Regulatory Reporting (NAIC/Solvency II)</li>
                        <li>Management Reporting/KPIs</li>
                    </ul>
                </div>
            </section>

            <section className="customer-success">
                <h2>Customer Success</h2>
                <p>More insurance companies are live on Workday than any other cloud-based solution.</p>
                <div className="success-stories">
                    <div className="story">
                        <img src="path-to-unum-logo.jpg" alt="Unum Logo" />
                        <h3>Unum</h3>
                        <p>Realizes $200K net annual cost savings.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                    <div className="story">
                        <img src="path-to-aaa-logo.jpg" alt="AAA Logo" />
                        <h3>AAA</h3>
                        <p>Gains greater visibility into performance.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                    <div className="story">
                        <img src="path-to-brown-and-brown-logo.jpg" alt="Brown & Brown Logo" />
                        <h3>Brown and Brown Insurance</h3>
                        <p>Attracts top talent.</p>
                        <button className="watch-video-button">Watch Video (2:44)</button>
                    </div>
                    <div className="story">
                        <img src="path-to-cna-logo.jpg" alt="CNA Logo" />
                        <h3>CNA</h3>
                        <p>59% reduction in ledger accounts.</p>
                        <button className="see-story-button">See Story</button>
                    </div>
                </div>
            </section>

            <section className="resources">
                <h2>Resources</h2>
                <h3>Insurance industry insights and trends.</h3>
                <button className="see-all-resources">See All Resources</button>
                <button onClick={handleToggleResources}>Toggle Resources</button>
                {showResources && (
                    <ul>
                        <li><button>Report: How to Build a Strong Foundation to Take Advantage of Emerging Tech</button></li>
                        <li><button>Report: The Future of Insurance: Aiming for Agility</button></li>
                        <li><button>Blog: How AI Can Help Solve the Insurance Industry’s Talent Crisis</button></li>
                        <li><button>Datasheet: Workday Differentiators: Global Insurance Industry at a Crossroads to Shaping Long-Term Success</button></li>
                    </ul>
                )}
            </section>

            <section className="contact-section">
                <h2>Ready to Talk?</h2>
                <button className="contact-button">Get in Touch</button>
            </section>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left">
                            <h3>How Insurance Companies are Transforming with Workday</h3>
                            <p>This eBook explores the innovative strategies that leading insurance companies are adopting to navigate the changing landscape.</p>
                        </div>
                        <div className="modal-right">
                            <h4>Why Workday for Insurance</h4>
                            <form>
                                <label>
                                    First Name
                                    <input type="text" required />
                                </label>
                                <label>
                                    Last Name
                                    <input type="text" required />
                                </label>
                                <label>
                                    Business Email
                                    <input type="email" required />
                                </label>
                                <button type="submit">Download eBook</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InsuranceLandingPage;
