
import React from 'react';
import './Sitemap.css'; // Import your CSS for styling

const Sitemap = () => {
    return (
        <div className="sitemap">
            <h1>Sitemap</h1>
            
            {/* General Information Section */}
            <section className="sitemap-section">
                <h2>Information</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/careers">Career with Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/blog">Naukri Blog</a></li>
                    <li><a href="/job-speak">Naukri Job Speak</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/feedback">Feedback</a></li>
                </ul>
            </section>

            {/* Job Seekers Section */}
            <section className="sitemap-section">
                <h2>Job Seekers Section</h2>
                <ul>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/advanced-search">Advanced Search</a></li>
                    <li><a href="/job-alert">Create Job Alert</a></li>
                    <li><a href="/jobseekers-faqs">Jobseekers FAQs</a></li>
                </ul>
            </section>

            {/* Browse Jobs Section */}
            <section className="sitemap-section">
                <h2>Browse Jobs</h2>
                <ul>
                    <li><a href="/iim-jobs">IIM Jobs</a></li>
                    <li><a href="/iit-jobs">IIT Jobs</a></li>
                    <li><a href="/government-jobs">Government Jobs</a></li>
                    <li><a href="/international-jobs">International Jobs</a></li>
                    <li><a href="/browse-jobs">Browse Jobs</a></li>
                    <li><a href="/browse-by-designation">Browse by Designation</a></li>
                    <li><a href="/browse-by-skill">Browse by Skill</a></li>
                    <li><a href="/browse-by-industry">Browse by FA/Industry</a></li>
                    <li><a href="/browse-by-company">Browse by Company</a></li>
                    <li><a href="/browse-by-location">Browse by Location</a></li>
                </ul>
            </section>

            {/* Skilled Manpower Section */}
            <section className="sitemap-section">
                <h2>Skilled Manpower</h2>
                <ul>
                    <li><a href="/skilled-manpower">Find Skilled Manpower</a></li>
                    <li><a href="/locations">Job Locations</a></li>
                    <li><a href="/job-type">Job Types</a></li>
                    <li><a href="/location-based-jobs">Location-Based Jobs</a></li>
                </ul>
            </section>

            {/* Naukri FastForward Section */}
            <section className="sitemap-section">
                <h2>Naukri FastForward</h2>
                <ul>
                    <li><a href="/resume-writing">Resume Writing</a></li>
                    <li><a href="/resume-samples">Resume Samples</a></li>
                    <li><a href="/resume-freshers">Resume Sample for Freshers</a></li>
                    <li><a href="/visual-resume-samples">Visual Resume Samples</a></li>
                    <li><a href="/cover-letter-samples">Cover Letter Samples</a></li>
                    <li><a href="/job-letter-samples">Job Letter Samples</a></li>
                    <li><a href="/resume-quality-score">Resume Quality Score</a></li>
                    <li><a href="/recruiter-connection">Recruiter Connection</a></li>
                    <li><a href="/jobs4u">Jobs4U</a></li>
                    <li><a href="/career-advice">Career Advice</a></li>
                    <li><a href="/faqs">FAQs</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                </ul>
            </section>

            {/* Naukri Learning Section */}
            <section className="sitemap-section">
                <h2>Naukri Learning</h2>
                <ul>
                    <li><a href="/online-courses">Online Courses & Certifications</a></li>
                    <li><a href="/online-courses">Online Courses</a></li>
                    <li><a href="/aptitude-test">Online Aptitude Test</a></li>
                    <li><a href="/career-advice">Career Advice</a></li>
                </ul>
            </section>

            {/* Naukri CareerNavigator Section */}
            <section className="sitemap-section">
                <h2>Naukri CareerNavigator</h2>
                <ul>
                    <li><a href="/career-navigator">Career Navigator</a></li>
                </ul>
            </section>

            {/* Naukri Recruiter Section */}
            <section className="sitemap-section">
                <h2>Naukri Recruiter</h2>
                <ul>
                    <li><a href="/recruiter/register">Register/Login</a></li>
                </ul>
            </section>

            {/* Recruiters Section */}
            <section className="sitemap-section">
                <h2>Recruiters Section</h2>
                <ul>
                    <li><a href="/recruiters/register">Register</a></li>
                    <li><a href="/recruiters/login">Login</a></li>
                    <li><a href="/recruiters-faqs">Recruiters FAQs</a></li>
                </ul>
            </section>

            {/* Recruiters Products Section */}
            <section className="sitemap-section">
                <h2>Recruiters Products</h2>
                <ul>
                    <li><a href="/buy-online">Buy Online</a></li>
                    <li><a href="/post-jobs">Post Jobs</a></li>
                    <li><a href="/access-database">Access Database</a></li>
                    <li><a href="/job-advertisement">Job Advertisement</a></li>
                    <li><a href="/eapps-pro">eApps Pro</a></li>
                    <li><a href="/insta-hire">Insta Hire</a></li>
                    <li><a href="/hr-zone">HR Zone</a></li>
                    <li><a href="/career-site-manager">Career Site Manager</a></li>
                </ul>
            </section>
        </div>
    );
};

export default Sitemap;
