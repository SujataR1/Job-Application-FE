import React, { useState } from 'react';
import './Investment.css'; // Create a separate CSS file for styling
import InvestmentImage from '../../../images/investmentmanagement.jpg'; // Investment management image
import { FaChartLine, FaUserCheck, FaDollarSign, FaPeopleArrows } from 'react-icons/fa'; // Import icons

const InvestmentManagementPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="investment-management-container">
            <header className="investment-header">
                <h1>Investment Management</h1>
                <p>Transform how you operate in a dynamic market.</p>
            </header>

            <section className="investment-intro">
                <div className="intro-content">
                    <img src={InvestmentImage} alt="Investment Management" className="intro-image" />
                    <p>
                        In the realm of investment management, agility is key. With rapidly changing markets and evolving investor expectations, 
                        Workday provides the tools necessary to enhance decision-making, streamline operations, and optimize investment strategies. 
                        From portfolio management to compliance, our solutions are designed to help you thrive in a competitive landscape.
                    </p>
                    <div className="button-container">
                        <button className="demo-button">View Demo (2:57)</button>
                        <button className="ebook-button" onClick={handleReadEbookClick}>Read eBook</button>
                    </div>
                </div>
            </section>

            <h3>Key Solutions</h3>
            <div className="solutions-container">
                <div className="solution-box">
                    <FaChartLine className="solution-icon" />
                    <h4>Real-time Insights</h4>
                    <p>Gain immediate access to critical financial data and analytics for informed decision-making.</p>
                </div>
                <div className="solution-box">
                    <FaUserCheck className="solution-icon" />
                    <h4>Enhanced Customer Engagement</h4>
                    <p>Deliver personalized experiences and build strong relationships with your clients.</p>
                </div>
                <div className="solution-box">
                    <FaDollarSign className="solution-icon" />
                    <h4>Optimized Performance</h4>
                    <p>Streamline your operations and improve investment performance with advanced analytics.</p>
                </div>
                <div className="solution-box">
                    <FaPeopleArrows className="solution-icon" />
                    <h4>Regulatory Compliance</h4>
                    <p>Stay ahead of regulatory requirements with automated reporting and compliance management.</p>
                </div>
            </div>

            {/* New Customer Success Stories Section */}
            <section className="success-stories">
                <h3>Customer Success Stories</h3>
                <div className="stories-container">
                    <div className="story-box">
                        <h4>Global Investment Firm</h4>
                        <p>Implemented Workday solutions to streamline portfolio management and achieved a 30% increase in efficiency.</p>
                    </div>
                    <div className="story-box">
                        <h4>Regional Asset Manager</h4>
                        <p>Utilized real-time insights to enhance client engagement, resulting in a 25% growth in client satisfaction.</p>
                    </div>
                    <div className="story-box">
                        <h4>Wealth Management Company</h4>
                        <p>Achieved regulatory compliance with automated reporting, reducing compliance costs by 20%.</p>
                    </div>
                </div>
            </section>

            <h3>Ready to Transform Your Investment Management?</h3>
            <button className="contact-button">Get in Touch</button>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left">
                            <h3>How Investment Management is Evolving with Workday</h3>
                            <p>This eBook explores innovative strategies that leading investment firms are adopting to thrive in a changing landscape.</p>
                        </div>
                        <div className="modal-right">
                            <h4>Why Workday for Investment Management</h4>
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

export default InvestmentManagementPage;
