import React, { useState } from 'react';
import './Profit.css'; // Import CSS for styling
import nonprofitImage from '../../../images/Nonprofit.jpg'; // Path to your image

const NonprofitPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleViewDemoClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="nonprofit-container">
            <div className="nonprofit-header">
                <h1>Do Good for the World and Your Workforce</h1>
                <p>
                    Keep up your good work while remaining accountable and serving your employees. 
                    With Workday, you can access real-time data to measure mission effectiveness, demonstrate how funds are used, and create a culture of belonging.
                </p>
            </div>

            <div className="nonprofit-content">
                <div className="nonprofit-left">
                    <h2>View Demo (2:48)</h2>
                    <button className="view-demo" onClick={handleViewDemoClick}>View Demo</button>
                    <p>
                        With Workday, leading nonprofits are making a measurable impact:
                    </p>
                    <ul>
                        <li>Decreased onboarding time from half a day to 30 minutes.</li>
                        <li>Finance staff created custom reports using data-driven decision-making.</li>
                        <li>Reduced administrative costs by 17% and increased donor confidence.</li>
                        <li>Saved 220% of its goal and saw a 15% ROI by budgeting for mission achievement.</li>
                        <li>Realized 50% more efficiency in grants operations by enhancing financial stewardship.</li>
                    </ul>
                </div>
                
                <div className="nonprofit-right">
                    <img src={nonprofitImage} alt="Nonprofit Work" className="nonprofit-image" />
                </div>
            </div>

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

export default NonprofitPage;
