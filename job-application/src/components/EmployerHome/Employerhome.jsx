import React, { useState } from 'react';
import './Employerhome.css';
import bannerImage from '../images/images.jpg'; // Example banner image
import recruiterAppImage from '../images/app.webp'; // Example recruiter app image

const EmployerHome = () => {
  const [isSalesEnquiryOpen, setSalesEnquiryOpen] = useState(false);
  const [isLoginRegisterOpen, setLoginRegisterOpen] = useState(false);
  const [isRegisterMode, setRegisterMode] = useState(false); // New state to toggle between Login and Register

  const handleSalesEnquiry = () => setSalesEnquiryOpen(!isSalesEnquiryOpen);
  const handleLoginRegister = () => setLoginRegisterOpen(!isLoginRegisterOpen);
  const toggleRegisterMode = () => setRegisterMode(!isRegisterMode); // Function to toggle register mode

  return (
    <div className="employer-home">
      <header className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Hire talent with JobPortal!</h1>
          <p>Find, engage, and hire talent on India’s leading recruitment platform </p>
          <button onClick={handleSalesEnquiry}>Sales Enquiry</button>
          <button onClick={handleLoginRegister}>Login/Register</button>
        </div>
        <div className="form-container-wrapper">
          {isSalesEnquiryOpen && (
            <div className="form-container">
              <h2>Sales Enquiry</h2>


              <form>
                <input type="text" placeholder="Company Name" required />
                <input type="number" placeholder="Number of Employees" required />
                <input type="text" placeholder="Designation" required />
                <input type="text" placeholder="Employee ID" required />
                <input type="text" placeholder="City" required />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}

          {isLoginRegisterOpen && (
            <div className="form-container">
              <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
              <form>
                {isRegisterMode ? (
                  <>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email ID" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                  </>
                ) : (
                  <>
                    <input type="email" placeholder="Email ID" required />
                    <input type="password" placeholder="Password" required />
                  </>
                )}
                <div className="form-links">
                  <button type="button" onClick={toggleRegisterMode} className="link-button">
                    {isRegisterMode ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                  </button>
                  <button type="button" className="link-button">
                    Forgot password?
                  </button>
                </div>
                <button type="submit">{isRegisterMode ? 'Register' : 'Login'}</button>
              </form>
            </div>
          )}
        </div>
      </header>

      <section className="services">
        <h2>PRODUCTS & SERVICES</h2>
        <p>JobPortal is India’s No.1 Job Posting Site & Recruitment Platform</p>
        <div className="service-details">
          <h3>JobPortal Job Posting Services - Get Quality Applies</h3>
          <p>
            Reach out to millions of jobseekers and hire quickly with our fast and easy job posting services.
          </p>
          <ul>
            <li>2 Minutes to Post</li>
            <li>Unlimited Applies</li>
            <li>Attract Audience</li>
            <li>30 Day Visibility</li>
          </ul>
        </div>
      </section>

      <section className="resume-access">
        <div className="resume-text">
          <h2>Search Best Talent with Naukri’s Resume Database Access - Resdex</h2>
          <p>
            Source candidates from Resdex − India’s largest Talent Pool and find the perfect talent for your organisation.
          </p>
          <ul>
            <li>Over 10.28 crore Jobseekers</li>
            <li>Smart Talent Search</li>
            <li>Contact Directly</li>
            <li>Verified Candidates</li>
          </ul>
        </div>
        <img src={recruiterAppImage} alt="Naukri Recruiter App" className="resume-image" />
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <p>Recruiters Recommend Naukri Job Posting Portal</p>
        {/* Add testimonials here */}
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-box">
          <h3>What is the cost to post a job on the job posting website Naukri.com?</h3>
          <p>Job posting starts at INR 400 + taxes and goes up to INR 1650 + taxes.</p>
        </div>
        <div className="faq-box">
          <h3>How long will my job posting stay active on the site?</h3>
          <p>Your Job listing will be active on the website for up to 30 days.</p>
        </div>
        <div className="faq-box">
          <h3>Are there any tips for writing effective job postings on a portal?</h3>
          <p>Writing a good job description (JD) significantly impacts visibility and effectiveness.</p>
        </div>
      </section>
    </div>
  );
};

export default EmployerHome;
