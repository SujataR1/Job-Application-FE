import React, { useState } from 'react';
import './ProfessionalBusiness.css'; // Create a separate CSS file for styling
import ProfessionalImage from '../../../components/images/professionalbusiness.jpg'; // Main professional services image
import MarketplaceImage from '../../../components/images/finance.png'; // Marketplace image
import { FaUserCheck, FaChartLine, FaDollarSign, FaPeopleArrows } from 'react-icons/fa'; // Import icons

const ProfessionalBusinessPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="professional-business-container">
            <div className="professional-business-header">
                <h1>Professional Business Services for a Dynamic Future</h1>
                <p>
                    Deliver profitably and delight customers. As markets evolve, businesses must adapt quickly to changing expectations. 
                    Discover how our services can empower your institution to meet these challenges head-on.
                </p>
            </div>

            <div className="professional-business-content">
                <div className="professional-business-left">
                    <h2>Leading Companies Transforming with Our Services</h2>
                    <p>
                        Explore the success stories of companies that leverage our platform for innovation.
                    </p>
                    <button className="view-demo">View Demo (3:06)</button>
                    <button className="read-ebook" onClick={handleReadEbookClick}>Read eBook</button>
                </div>
                
                <div className="professional-business-right">
                    <img src={ProfessionalImage} alt="Professional Services Overview" className="professional-image" />
                </div>
            </div>

            <h3>Voices in Professional Services</h3>
            <div className="testimonials">
                <div className="testimonial">
                    <img src="path/to/company1-logo.png" alt="Company 1" />
                    <p>Increased operational efficiency by 30% using integrated services.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/company2-logo.png" alt="Company 2" />
                    <p>Reduced costs by 25% through streamlined operations.</p>
                </div>
                {/* Add more testimonials as needed */}
            </div>

            <h3>Solution Use Cases</h3>
            <div className="use-case-container">
                <div className="use-case-box">
                    <FaPeopleArrows className="use-case-icon" />
                    <h4>Enhancing Customer Engagement</h4>
                    <ul>
                        <li>Personalized Business Services</li>
                        <li>Customer Relationship Management</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaUserCheck className="use-case-icon" />
                    <h4>Optimizing Operational Efficiency</h4>
                    <ul>
                        <li>Process Automation</li>
                        <li>Performance Tracking</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaChartLine className="use-case-icon" />
                    <h4>Streamlining Financial Performance</h4>
                    <ul>
                        <li>Real-time Financial Insights</li>
                        <li>Forecasting and Budgeting</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaDollarSign className="use-case-icon" />
                    <h4>Cost Management Solutions</h4>
                    <ul>
                        <li>Expense Management</li>
                        <li>Supplier Risk Mitigation</li>
                    </ul>
                </div>
            </div>

            <h3>Workday Marketplace for Professional Services</h3>
            <div className="marketplace-container">
                <div className="marketplace-left">
                    <p>
                        Find trusted solutions to do more. 
                        Dive into an economy of partner expertise tailored for professional services. 
                        With Workday Marketplace, explore a wide range of integrated applications that enhance your business operations.
                    </p>
                </div>
                <div className="marketplace-right">
                    <img src={MarketplaceImage} alt="Marketplace Overview" className="marketplace-image" />
                </div>
            </div>

            <h3>Insights and Trends in Professional Services</h3>
            <div className="resources">
                <div className="resource-item">
                    <h4>Extended Demo: Business Optimization Strategies</h4>
                    <button className="view-demo">View Demo (11:52)</button>
                </div>
                <div className="resource-item">
                    <h4>Quick Demo: Customer Experience Enhancement</h4>
                    <button className="view-demo">View Demo (2:58)</button>
                </div>
                {/* Add more resources as needed */}
            </div>

            <h3>Ready to Connect?</h3>
            <button className="talk-to-sales">Get in touch</button>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left">
                            <h3>How Companies are Transforming with Our Services</h3>
                            <p>This eBook explores innovative strategies that leading companies are adopting to navigate the changing landscape.</p>
                        </div>
                        <div className="modal-right">
                            <h4>Why Choose Our Services</h4>
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

export default ProfessionalBusinessPage;
