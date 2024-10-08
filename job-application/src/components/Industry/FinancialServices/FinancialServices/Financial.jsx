import React, { useState } from 'react';
import './Financial.css'; // Create a separate CSS file for styling
import BankingImage from '../../../images/banking.webp'; // Main banking image
import InvestmentManagementImage from '../../../images/investment.jpg'; // Investment management image
import InsuranceImage from '../../../images/insurance.jpg'; // Insurance image
import MarketplaceImage from '../../../images/marketplace.jpg'; // Marketplace image
import Finance from '../../../images/finance.png';
import { FaUserCheck, FaChartLine, FaDollarSign, FaPeopleArrows } from 'react-icons/fa'; // Import icons

const FinancialPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="financial-container">
            <header className="financial-header">
                <h1>Financial Services</h1>
                <p>Navigate the new normal with ease.</p>
            </header>
            
            <section className="financial-intro">
                <div className="intro-content">
                    <div className="intro-text">
                        <p>
                            Market shifts, changing customer expectations, and a new wave of FinTech disruption require you to act fast. 
                            Workday empowers you to accelerate your digital transformation and gain the agility to meet change head-on.
                        </p>
                    </div>
                    <div className="intro-image-container">
                        <img src={Finance} alt="Financial Services" className="intro-image" />
                        <button className="view-demo" onClick={handleReadEbookClick}>Watch the Video</button>
                    </div>
                </div>
            </section>
    
            <h3>INDUSTRIES SERVED</h3>
            <div className="industries-served">
                <div className="industry-box">
                    <h4>Banking and Capital Markets</h4>
                    <img src={BankingImage} alt="Banking and Capital Markets" className="industry-image" />
                    <p>Navigate market uncertainty, find untapped opportunities, and ensure success.</p>
                    <button className="learn-more">Learn More</button>
                </div>
                <div className="industry-box">
                    <h4>Investment Management</h4>
                    <img src={InvestmentManagementImage} alt="Investment Management" className="industry-image" />
                    <p>Transform how you operate to flex with market pressures. With Workday, you can run better than ever.</p>
                    <button className="learn-more">Learn More</button>
                </div>
                <div className="industry-box">
                    <h4>Insurance</h4>
                    <img src={InsuranceImage} alt="Insurance" className="industry-image" />
                    <p>Effectively manage risk, weather disruption, and adapt to a changing industry.</p>
                    <button className="learn-more">Learn More</button>
                </div>
            </div>

            <h3>Workday Marketplace for Financial Services</h3>
            <div className="marketplace-container">
                <div className="marketplace-left">
                    <p>
                        Find trusted solutions to do more. 
                        Dive into an economy of partner expertise tailored for financial services. 
                        With Workday Marketplace, you can explore a wide range of integrated applications that enhance your operations and improve customer experiences.
                    </p>
                </div>
                <div className="marketplace-right">
                    <img src={MarketplaceImage} alt="Marketplace Overview" className="marketplace-image" />
                </div>
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

            <h3>Ready to Connect?</h3>
            <button className="talk-to-sales">Get in touch</button>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left">
                            <h3>How Financial Services are Transforming with Workday</h3>
                            <p>This eBook explores the innovative strategies that leading financial institutions are adopting to navigate the changing landscape.</p>
                        </div>
                        <div className="modal-right">
                            <h4>Why Workday for Financial Services</h4>
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

export default FinancialPage;
