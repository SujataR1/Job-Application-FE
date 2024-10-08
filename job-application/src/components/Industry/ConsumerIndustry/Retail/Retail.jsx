import React, { useState } from 'react';
import './Retail.css'; // Make sure to create this CSS file for styling
import RetailImage from '../../../images/retail.avif'; // Import the image
import { FaUserCheck, FaChartLine, FaDollarSign, FaPeopleArrows } from 'react-icons/fa'; // Import icons

const RetailPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReadEbookClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="retail-container">
            <div className="retail-header">
                <h1>Retail Solutions that Adapt to Change</h1>
                <p>
                    Shifting consumer demands, evolving workforce expectations, and new business models—the retail industry is changing faster than ever. 
                    Can your enterprise system help you accelerate fast and keep up? Workday can.
                </p>
            </div>

            <div className="retail-content">
                <div className="retail-left">
                    <h2>Five Retail Organizations Transforming with Workday</h2>
                    <p>
                        Check out real results that retail leaders get from the Workday platform.
                    </p>
                    <button className="view-demo">View Demo (3:06)</button>
                    <button className="read-ebook" onClick={handleReadEbookClick}>Read eBook</button>
                </div>
                
                <div className="retail-right">
                    <img src={RetailImage} alt="Retail Overview" className="retail-image" />
                </div>
            </div>

            <h3>People in Retail</h3>
            <div className="testimonials">
                <div className="testimonial">
                    <img src="path/to/schnuck-logo.png" alt="Schnuck Markets" />
                    <p>Saves $780,000 per year per store manager through managing a frontline workforce.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/racetrac-logo.png" alt="RaceTrac" />
                    <p>Reduces expense reimbursement time by 67% by controlling costs and managing margins.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/specsavers-logo.png" alt="Specsavers" />
                    <p>Accelerates corporate-wide planning by 50% through workforce, financial planning, and analytics.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/bestbuy-logo.png" alt="Best Buy" />
                    <p>Decreased staff turnover by 16% by transforming talent management.</p>
                </div>
                <div className="testimonial">
                    <img src="path/to/mileone-logo.png" alt="MileOne" />
                    <p>Eliminated paper-based scheduling at all dealerships by managing a frontline workforce.</p>
                </div>
            </div>

            <h3>Solution Use Cases</h3>
            <div className="use-case-container">
            <div className="use-case-box">
                    <FaPeopleArrows className="use-case-icon" />
                    <h4>Managing a Frontline Workforce</h4>
                    <ul>
                        <li>M&A and Growth Initiatives</li>
                        <li>Frontline Workforce Retention</li>
                <li>Labor Optimization and Productivity</li>
                 <li>Employee Experience and Well-Being</li>
                 <li>Active Employee Engagement</li>
                 <li>Compliance and Accountability</li>
                    </ul>
                </div>
                <div className="use-case-box">
                    <FaUserCheck className="use-case-icon" />
                    <h4>Transforming Talent Management</h4>
                    <ul>
                        <li>Retail Talent and Performance Management</li>
                        <li>Belonging and Diversity</li>
                        <li>High-Volume Recruiting</li>
                        <li>Mass Onboarding</li>
                        <li>Skills for the Future of Retail</li>
                        <li>Personalized Journeys</li>
                    </ul>
                </div>

                <div className="use-case-box">
                    <FaChartLine className="use-case-icon" />
                    <h4>Controlling Costs and Managing Margins</h4>
                    <ul>
                        <li>M&A and Growth Initiatives</li>
                        <li>Automated and Scalable Financial Operations</li>
                        <li>Flexible Global Financial Framework</li>
                        <li>Project and Expense Management</li>
                        <li>Compliance, Controls, and Audit Support</li>
                        <li>Budgeting and Sales Forecasting</li>
                    </ul>
                </div>

                <div className="use-case-box">
                    <FaDollarSign className="use-case-icon" />
                    <h4>Proactive Spend Management</h4>
                    <ul>
                        <li>Sourcing Efficiency</li>
                        <li>Mitigate Supplier Risk</li>
                        <li>Supplier Contract Management</li>
                        <li>Cost Containment</li>
                        <li>Stakeholder Engagement</li>
                        <li>Indirect Spend Controls</li>
                    </ul>
                </div>
            </div>

            <h3>Retail Insights and Trends</h3>
            <div className="resources">
                <div className="resource-item">
                    <h4>Extended Demo Accounting Process Automation for Retailers</h4>
                    <button className="view-demo">View Demo (11:52)</button>
                </div>
                <div className="resource-item">
                    <h4>Quick Demo Retail Frontline Manager Lifecycle</h4>
                    <button className="view-demo">View Demo (2:58)</button>
                </div>
                <div className="resource-item">
                    <h4>Quick Demo Interoperability with Workday: A Retail Use Case</h4>
                    <button className="view-demo">View Demo (4:29)</button>
                </div>
                <div className="resource-item">
                    <h4>Whitepaper 7 Reasons to Unite Finance and Human Capital Management in Retail</h4>
                    <button className="read-ebook">Read Whitepaper</button>
                </div>
            </div>

            <h3>Ready to talk?</h3>
            <button className="talk-to-sales">Get in touch</button>

            {/* Modal for eBook */}
            {showModal && (
                <div className="modal-overlay-retail" onClick={handleCloseModal}>
                    <div className="modal-content-retail" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <div className="modal-left-retail">
                            <h3>How Five Retail Organizations Are Transforming with Workday</h3>
                            <p>Today’s retailers must react to a shifting consumer experience, new business models, and tightening margins. This ebook explores how Workday helps industry-leading retail companies:</p>
                            <ul>
                                <li>Attract, retain, and engage frontline workers</li>
                                <li>Automate processes, improve financial planning, and drive growth</li>
                                <li>Unify data management and enhance security</li>
                            </ul>
                        </div>
                        <div className="modal-right-retail">
                            <h4>Why Workday for Retail</h4>
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
                                <label>
                                    Country/Territory
                                    <input type="text" required />
                                </label>
                                <label>
                                    Company Name
                                    <input type="text" required />
                                </label>
                                <label>
                                    Job Level
                                    <input type="text" required />
                                </label>
                                <label>
                                    Functional Role
                                    <input type="text" required />
                                </label>
                                <label>
                                    <input type="checkbox" required />
                                    Yes, please email me with occasional updates about products, services, and events from Workday. I can unsubscribe at any time.
                                </label>
                                <label>
                                    <input type="checkbox" required />
                                    My data will be handled in accordance with Workday’s privacy statement.
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

export default RetailPage;
