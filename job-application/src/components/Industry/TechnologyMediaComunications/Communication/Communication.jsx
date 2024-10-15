import React from 'react';
import './Communication.css'; // Import CSS for styling
import communicationsImage from '../../../images/communication.avif'; // Update with the path to your image

const Communications = () => {
    return (
        <div className="communications-container">
            <div className="communications-content">
                <div className="text-section">
                    <h1>COMMUNICATIONS</h1>
                    <h2>Evolve with the communications industry.</h2>
                    <p>
                        Spin up new service offerings, deliver on the power of 5G, and create new partnerships overnight. Only Workday delivers the speed and insights you need to stay competitive and accelerate digital finance.
                    </p>
                    {/* Replaced <a> with <button> for accessibility */}
                    <button className="datasheet-link" onClick={() => alert('Read Datasheet clicked!')}>
                        Read Datasheet
                    </button>                    
                    <h3>Workday and Maxis</h3>
                    <p>The worlds leading communications companies partner with Workday.</p>
                    <div className="partner-logos">
                        <img src="/path/to/sky-logo.png" alt="Sky UK Limited logo" />
                        <img src="/path/to/att-logo.png" alt="AT&T, Services Inc. logo" />
                        <img src="/path/to/talktalk-logo.png" alt="TalkTalk logo" />
                        <img src="/path/to/orange-logo.png" alt="Orange logo" />
                        <img src="/path/to/telus-logo.png" alt="Telus Communications logo" />
                        <img src="/path/to/globe-logo.png" alt="Globe Telecom, Inc. logo" />
                    </div>
                </div>
                <div className="image-section">
                    <img src={communicationsImage} alt="Communications Illustration" />
                </div>
            </div>
            
            {/* New Section: How We Serve You */}
            <div className="services-section">
                <h2>HOW WE SERVE YOU</h2>
                <div className="service-item">
                    <h3>Adapt to Change</h3>
                    <p>
                        Use an agile system to create new monetization models, manage spend, and fuel digital acceleration.
                    </p>
                </div>
                <div className="service-item">
                    <h3>Build a Great Workforce</h3>
                    <p>
                        Manage, engage, and develop your people so they can do their best work today and gain skills for the future.
                    </p>
                </div>
                <div className="service-item">
                    <h3>Bring in Edge Data for Richer Insights</h3>
                    <p>
                        Perform sales and revenue modeling to see which opportunities to pursue and keep pricing and bids competitive.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Communications;
