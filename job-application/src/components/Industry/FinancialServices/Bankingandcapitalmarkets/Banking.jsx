import React, { useState } from 'react';
import './Banking.css'; // Create a separate CSS file for styling
import BankingImage from '../../../images/banking.webp'; // Import the main banking image
import MarketplaceImage from '../../../images/marketplace.jpg'; // Import the marketplace image
import { FaUserCheck, FaChartLine, FaDollarSign, FaPeopleArrows } from 'react-icons/fa'; // Import icons

const BankingPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="banking-container">
            <div className="banking-header">
                <h1>Banking Solutions for a Dynamic Future</h1>
                <p>
                    As financial markets evolve, banks must adapt quickly to changing regulations and customer expectations. 
                    Discover how Workday can empower your institution to meet these challenges head-on.
                </p>
            </div>

            <div className="banking-content">
                <div className="banking-left">
                    <h2>Leading Banks Transforming with Workday</h2>
                    <p>
                        Explore the success stories of banks that leverage the Workday platform for innovation.
                    </p>
                    <button className="view-demo">View Demo (3:06)</button>
                    <button className="read-ebook" onClick={handleReadEbookClick}>Read eBook</button>
                </div>
                
                <div className="banking-right">
                    <img src={BankingImage} alt="Banking Overview" className="banking-image" />
                </div>
            </div>

            <h3>Voices in Banking</h3>
            <div className="testimonials">
                <div className="testimonial">
                    <img src="path/to/bank1-logo.png" alt="Bank 1" />
                    <p>Increased operational efficiency by 30% using integrated financial planning.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/bank2-logo.png" alt="Bank 2" />
                    <p>Reduced compliance costs by 25% through automated reporting.</p>
                </div>
                {/* Add more testimonials as needed */}
            </div>

            <h3>Solution Use Cases</h3>
            <div className="use-case-container">
                <div className="use-case-box">
                    <FaPeopleArrows className="use-case-icon" />
                    <h4>Managing Financial Compliance</h4>
                    <ul>
                        <li>Automated Reporting and Analytics</li>
                        <li>Regulatory Compliance</li>
                        <li>Risk Management</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaUserCheck className="use-case-icon" />
                    <h4>Enhancing Customer Engagement</h4>
                    <ul>
                        <li>Personalized Banking Services</li>
                        <li>Customer Relationship Management</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaChartLine className="use-case-icon" />
                    <h4>Optimizing Financial Performance</h4>
                    <ul>
                        <li>Real-time Financial Insights</li>
                        <li>Forecasting and Budgeting</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaDollarSign className="use-case-icon" />
                    <h4>Streamlined Cost Management</h4>
                    <ul>
                        <li>Expense Management Solutions</li>
                        <li>Supplier Risk Mitigation</li>
                    </ul>
                </div>
            </div>

            <h3>Workday Marketplace for Banking and Capital Markets</h3>
            <div className="marketplace-container">
                <div className="marketplace-left">
                    <p>
                        Find trusted solutions to do more. 
                        Dive into an economy of partner expertise tailored for banking and capital markets. 
                        With Workday Marketplace, you can explore a wide range of integrated applications that enhance your banking operations and improve customer experiences.
                    </p>
                </div>
                <div className="marketplace-right">
                    <img src={MarketplaceImage} alt="Marketplace Overview" className="marketplace-image" />
                </div>
            </div>

            <h3>Banking Insights and Trends</h3>
            <div className="resources">
                <div className="resource-item">
                    <h4>Extended Demo: Financial Planning for Banks</h4>
                    <button className="view-demo">View Demo (11:52)</button>
                </div>
                <div className="resource-item">
                    <h4>Quick Demo: Customer Experience Transformation</h4>
                    <button className="view-demo">View Demo (2:58)</button>
                </div>
                {/* Add more resources as needed */}
            </div>

            <h3>Ready to Connect?</h3>
            <button className="talk-to-sales">Get in touch</button>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay-banking" onClick={handleCloseModal}>
                    <div className="modal-content-banking" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left-banking">
                            <h3>How Banks are Transforming with Workday</h3>
                            <p>This eBook explores the innovative strategies that leading banks are adopting to navigate the changing landscape.</p>
                        </div>
                        <div className="modal-right-banking">
                            <h4>Why Workday for Banking</h4>
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
                                {/* Add more form fields as needed */}
                                <button type="submit">Download eBook</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankingPage;
