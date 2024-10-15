import React from 'react';
import './Media.css'; // Import the CSS file for styling now
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
                    {/* Replaced <a> with <button> */}
                    <button className="view-demo" onClick={() => alert('Demo viewed')}>
                        View Demo (3:20)
                    </button>
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
                {/* Replaced <a> with <button> */}
                <button className="view-more" onClick={() => alert('Learn more')}>
                    Learn More
                </button>
            </section>

            <section className="latest-trends">
                <h2>LATEST TRENDS</h2>
                <p>
                    Stay ahead of the curve with the latest trends in media and entertainment. 
                    From AI-driven content recommendations to immersive experiences, technology is reshaping how audiences engage.
                </p>
                {/* Replaced <a> with <button> */}
                <button className="view-more" onClick={() => alert('Discover trends')}>
                    Discover Trends
                </button>
            </section>
        </>
    );
};

export default MediaEntertainment;
