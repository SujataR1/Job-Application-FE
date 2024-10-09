// src/components/MediaEntertainment.js

import React from 'react';
import './Media.css'; // Import the CSS file for styling
import mediaImage from '../../../images/media.png'; // Adjust the path as necessary

const MediaEntertainment = () => {
    return (
        <>
            <section className="media-entertainment">
                <div className="content-left">
                    <h2>MEDIA AND ENTERTAINMENT</h2>
                    <p>
                        Captivate audiences. Inspire talent. Scale globally.<br /><br />
                        From content creation to monetization, the media and entertainment industry is evolving—fast. 
                        Workday delivers the agility and insight you need to pivot quickly and embrace the future with confidence.
                    </p>
                    <a href="#" className="view-demo">View Demo (3:20)</a>
                </div>
                <div className="content-right">
                    <img src={mediaImage} alt="Media and Entertainment" />
                </div>
            </section>

            <section className="additional-section">
                <h2>ADDITIONAL INSIGHTS</h2>
                <p>
                    Explore how technology transforms the landscape of media and entertainment. 
                    From streaming services to digital content creation, the future is bright for innovators.
                </p>
                <a href="#" className="view-more">Learn More</a>
            </section>

            <section className="latest-trends">
                <h2>LATEST TRENDS</h2>
                <p>
                    Stay ahead of the curve with the latest trends in media and entertainment. 
                    From AI-driven content recommendations to immersive experiences, technology is reshaping how audiences engage.
                </p>
                <a href="#" className="view-more">Discover Trends</a>
            </section>
        </>
    );
};

export default MediaEntertainment;
