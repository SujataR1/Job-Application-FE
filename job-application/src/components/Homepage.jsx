import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <section className="company-overview">
                <h1>Welcome to Our Company</h1>
                <p>Our company is committed to providing excellent services and creating a strong impact in the industry. We offer amazing job opportunities for talented individuals to grow and succeed with us.</p>
            </section>

            <section className="job-search-section">
                <h2>Find Your Dream Job</h2>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search for jobs..." 
                    />
                    <button>Search</button>
                </div>
            </section>

            <section className="featured-jobs">
                <h2>Featured Job Openings</h2>
                <div className="job-listings">
                    <div className="job-card">
                        <h3>Software Engineer</h3>
                        <p>Location: New York</p>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-card">
                        <h3>Product Manager</h3>
                        <p>Location: San Francisco</p>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-card">
                        <h3>UX Designer</h3>
                        <p>Location: Remote</p>
                        <button>Apply Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
