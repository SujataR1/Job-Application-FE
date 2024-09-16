import React from 'react';
import './ITjobs.css'; // Import your CSS file

const JobPage = () => {
    const handleApply = (e) => {
        e.preventDefault(); // Prevent the default button behavior
        // Handle apply button click here
    };

    const handleFilterClick = (filter) => {
        // Handle filter button clicks here
        console.log(`Filter clicked: ${filter}`);
    };

    return (
        <div className="job-page">
            {/* Job Filter Sidebar */}
            <aside className="job-filters">
                <div className="filter-section">
                    <h3>Department</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Engineering - Hardware & Networks')} className="filter-button">Engineering - Hardware & Networks (1083)</button></li>
                        <li><button onClick={() => handleFilterClick('Engineering - Software & QA')} className="filter-button">Engineering - Software & QA (13253)</button></li>
                        <li><button onClick={() => handleFilterClick('IT & Information Security')} className="filter-button">IT & Information Security (2724)</button></li>
                        <li><button onClick={() => handleFilterClick('Sales & Business Development')} className="filter-button">Sales & Business Development (9007)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Work mode</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Work from office')} className="filter-button">Work from office (14194)</button></li>
                        <li><button onClick={() => handleFilterClick('Hybrid')} className="filter-button">Hybrid (2086)</button></li>
                        <li><button onClick={() => handleFilterClick('Remote')} className="filter-button">Remote (775)</button></li>
                        <li><button onClick={() => handleFilterClick('Temp. WFH due to covid')} className="filter-button">Temp. WFH due to covid (5)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Experience</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Any')} className="filter-button">Any</button></li>
                        <li><button onClick={() => handleFilterClick('0 Yrs')} className="filter-button">0 Yrs</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Location</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Bengaluru')} className="filter-button">Bengaluru (6203)</button></li>
                        <li><button onClick={() => handleFilterClick('Hyderabad')} className="filter-button">Hyderabad (3447)</button></li>
                        <li><button onClick={() => handleFilterClick('Pune')} className="filter-button">Pune (2516)</button></li>
                        <li><button onClick={() => handleFilterClick('Delhi / NCR')} className="filter-button">Delhi / NCR (2383)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Salary</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('0-3 Lakhs')} className="filter-button">0-3 Lakhs (1520)</button></li>
                        <li><button onClick={() => handleFilterClick('3-6 Lakhs')} className="filter-button">3-6 Lakhs (6344)</button></li>
                        <li><button onClick={() => handleFilterClick('6-10 Lakhs')} className="filter-button">6-10 Lakhs (10056)</button></li>
                        <li><button onClick={() => handleFilterClick('10-15 Lakhs')} className="filter-button">10-15 Lakhs (8986)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Company type</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Foreign MNC')} className="filter-button">Foreign MNC (8603)</button></li>
                        <li><button onClick={() => handleFilterClick('Corporate')} className="filter-button">Corporate (1697)</button></li>
                        <li><button onClick={() => handleFilterClick('Indian MNC')} className="filter-button">Indian MNC (1565)</button></li>
                        <li><button onClick={() => handleFilterClick('Startup')} className="filter-button">Startup (198)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Role category</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Software Development')} className="filter-button">Software Development (10208)</button></li>
                        <li><button onClick={() => handleFilterClick('DBA / Data warehousing')} className="filter-button">DBA / Data warehousing (1343)</button></li>
                        <li><button onClick={() => handleFilterClick('Quality Assurance and Testing')} className="filter-button">Quality Assurance and Testing (1250)</button></li>
                        <li><button onClick={() => handleFilterClick('IT Support')} className="filter-button">IT Support (814)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Stipend</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Unpaid')} className="filter-button">Unpaid (9)</button></li>
                        <li><button onClick={() => handleFilterClick('0-10k')} className="filter-button">0-10k (14)</button></li>
                        <li><button onClick={() => handleFilterClick('10k-20k')} className="filter-button">10k-20k (7)</button></li>
                        <li><button onClick={() => handleFilterClick('20k-30k')} className="filter-button">20k-30k (1)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Duration</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('2 Months')} className="filter-button">2 Months (4)</button></li>
                        <li><button onClick={() => handleFilterClick('3 Months')} className="filter-button">3 Months (12)</button></li>
                        <li><button onClick={() => handleFilterClick('4 Months')} className="filter-button">4 Months (1)</button></li>
                        <li><button onClick={() => handleFilterClick('5 Months')} className="filter-button">5 Months (1)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Education</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Any Postgraduate')} className="filter-button">Any Postgraduate (8676)</button></li>
                        <li><button onClick={() => handleFilterClick('MCA')} className="filter-button">MCA (1270)</button></li>
                        <li><button onClick={() => handleFilterClick('B.Tech/B.E.')} className="filter-button">B.Tech/B.E. (10702)</button></li>
                        <li><button onClick={() => handleFilterClick('Any Graduate')} className="filter-button">Any Graduate (6229)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Posted by</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('Company Jobs')} className="filter-button">Company Jobs (14257)</button></li>
                        <li><button onClick={() => handleFilterClick('Consultant Jobs')} className="filter-button">Consultant Jobs (2803)</button></li>
                    </ul>
                </div>
                <div className="filter-section">
                    <h3>Industry</h3>
                    <ul>
                        <li><button onClick={() => handleFilterClick('IT Services & Consulting')} className="filter-button">IT Services & Consulting (13636)</button></li>
                        <li><button onClick={() => handleFilterClick('Software Product')} className="filter-button">Software Product (824)</button></li>
                        <li><button onClick={() => handleFilterClick('Banking')} className="filter-button">Banking (298)</button></li>
                        <li><button onClick={() => handleFilterClick('Recruitment / Staffing')} className="filter-button">Recruitment / Staffing (215)</button></li>
                    </ul>
                </div>
            </aside>

            {/* Job Listings */}
            <main className="job-listings">
                <h2 className="text-xl font-semibold mb-4">Freshness</h2>
                <div className="job-list">
                    <article className="job-item">
                        <h3 className="job-title">Automation Test Engineer</h3>
                        <p className="company">Cognizant</p>
                        <p className="experience">6-10 Yrs</p>
                        <p className="location">Hybrid - Kolkata, Pune, Chennai</p>
                        <p className="skills">Skill: Automation with Java, Selenium...</p>
                        <button onClick={handleApply} className="apply-link">Apply Now</button>
                    </article>
                    {/* Add more job items as needed */}
                </div>
            </main>
        </div>
    );
};

export default JobPage;
