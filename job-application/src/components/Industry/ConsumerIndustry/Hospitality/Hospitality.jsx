import React, { useState } from 'react';
import './Hospitality.css';
import HospitalityImage from '../../../images/hospitality.jpg'; // Import image
import { FaUserCheck, FaChartLine,  FaPeopleArrows, FaDollarSign } from 'react-icons/fa'; // Import icons

const HospitalityPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleReadEbook = () => {
        setShowModal(true);
    };

    return (
        <div className="hospitality-container">
            <div className="hospitality-left">
                <h1>HOSPITALITY</h1>
                <h2>Serve your employees. Grow your business.</h2>
                
                <div className="hospitality-image-container">
                    <img 
                        src={HospitalityImage} 
                        alt="Hospitality Overview" 
                        className="hospitality-image" 
                    />
                </div>
                
                <p>
                    In the hospitality industry, agility and flexibility are absolutely essential to success.<br />
                    Whenever and wherever change happens, <br />
                    Workday allows companies to keep a laser focus on productivity and costs, while optimizing the workforce.
                </p>
                <div className="hospitality-buttons">
                    <button className="view-demo">View Demo (3:10)</button>
                    <button className="read-ebook" onClick={handleReadEbook}>Read eBook</button>
                </div>
            </div>

            <div className="hospitality-right">
                <h3>CUSTOMER SUCCESS</h3>
                <p>The world’s leading hospitality organizations adapt to change with Workday.</p>
                
                <h3>People talking hospitality</h3>
                <div className="testimonials">
                    <div className="testimonial">
                        <img src="path/to/shake-shack-logo.png" alt="Shake Shack" />
                        <p>Cuts 10-day quarterly closings to five days by controlling costs and managing margins.</p>
                    </div>
                    <div className="testimonial">
                        <img src="path/to/lifetime-fitness-logo.png" alt="Life Time Fitness" />
                        <p>Saves 50,000 manager hours per year with automated time management by managing a frontline workforce.</p>
                    </div>
                    <div className="testimonial">
                        <img src="path/to/innisfree-hotels-logo.png" alt="Innisfree Hotels" />
                        <p>Automated 85% of cash flow reports by controlling costs and managing margins.</p>
                    </div>
                    <div className="testimonial">
                        <img src="path/to/dennys-logo.png" alt="Denny's, Inc." />
                        <p>Creates 60% more “what-if” scenarios through workforce planning and analytics.</p>
                    </div>
                    <div className="testimonial">
                        <img src="path/to/pf-changs-logo.png" alt="P.F. Chang’s" />
                        <p>Increases retention by transforming talent management.</p>
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

                <div className="customer-success">
                    <h3>CUSTOMER SUCCESS STORIES</h3>
                    <div className="customer">
                        <h4>Southwest Airlines</h4>
                        <p>Scaled operations and created better access to their data.</p>
                    </div>
                    <div className="customer">
                        <h4>P.F. Chang’s</h4>
                        <p>Used insights to make smarter, faster decisions.</p>
                    </div>
                    <div className="customer">
                        <h4>Mohegan</h4>
                        <p>Connected people, planning, finance, and revenue data.</p>
                    </div>
                    <div className="customer">
                        <h4>Drury Hotels</h4>
                        <p>Minimized manual tasks and leveled up value-added work.</p>
                    </div>
                </div>

                <h3>RESOURCES</h3>
                <h1>Hospitality insights and trends.</h1>
                <div className="resources">
                    <button className="view-demo">Quick Demo Interoperability with Workday: Hospitality</button>
                    <button className="read-ebook" onClick={handleReadEbook}>eBook Hospitality Frontline Manager Lifecycle</button>
                    <button className="view-demo">Quick Demo Accounting Process Optimization for Hospitality Organizations</button>
                    <button className="read-whitepaper">Whitepaper 7 Reasons to Unite Finance and HCM in Hospitality</button>
                </div>

                <h3>Ready to talk?</h3>
                <button className="talk-to-sales">Get in touch</button>

                {/* Modal for eBook */}
                {showModal && (
                    <div className="modal-overlay-retail" onClick={handleCloseModal}>
                        <div className="modal-content-retail" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={handleCloseModal}>X</button>
                            <div className="modal-left-retail">
                                <h3>How Five Hospitality Organizations Are Transforming with Workday</h3>
                                <p>Today’s retailers must react to a shifting consumer experience, new business models, and tightening margins. This ebook explores how Workday helps industry-leading retail companies:</p>
                                <ul>
                                    <li>Attract, retain, and engage frontline workers</li>
                                    <li>Automate processes, improve financial planning, and drive growth</li>
                                    <li>Unify data management and enhance security</li>
                                </ul>
                            </div>
                            <div className="modal-right-retail">
                                <h4>Why Workday for Hospitality</h4>
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
        </div>
    );
};

export default HospitalityPage;
