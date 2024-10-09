import React from "react";
import "./Professional&BusinessServices.css";

const ProfessionalAndBusinessServices = () => {
    return (
      <div className="professional-services-container">
        <header className="services-header">
          <h1>Professional & Business Services</h1>
          <p>Discover a wide range of services that help businesses thrive and professionals grow.</p>
        </header>
  
        <section className="services-overview">
          <h2>Overview</h2>
          <p>
            Professional and business services provide vital support to businesses, industries, and individuals. These services range from consultancy and legal advice to IT solutions, marketing, and human resources. They empower organizations to optimize operations, manage risks, and foster innovation.
          </p>
        </section>
  
        <section className="service-category">
          <h2>Our Key Services</h2>
          <div className="service-card">
            <h3>Consulting Services</h3>
            <p>
              We offer expert consulting services to help businesses make informed decisions, improve processes, and achieve growth objectives. Our consultants specialize in strategy, management, and technology solutions.
            </p>
          </div>
          <div className="service-card">
            <h3>Legal & Compliance</h3>
            <p>
              Our legal services offer advice on corporate governance, regulatory compliance, and risk management. Protect your business with our experienced legal professionals.
            </p>
          </div>
          <div className="service-card">
            <h3>IT & Tech Solutions</h3>
            <p>
              From system integration to cybersecurity, our IT and tech services help you stay competitive and secure in a rapidly evolving digital landscape. We build tailored solutions to meet your business needs.
            </p>
          </div>
          <div className="service-card">
            <h3>Human Resources</h3>
            <p>
              Our HR services cover recruitment, employee training, performance management, and organizational development. Enhance your workforce with our tailored HR solutions.
            </p>
          </div>
          <div className="service-card">
            <h3>Marketing & Branding</h3>
            <p>
              Elevate your brand with our marketing and branding expertise. From strategy development to campaign execution, we help your business reach new heights.
            </p>
          </div>
        </section>
  
        <section className="testimonial-section">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-card">
            <p>
              "The consulting services provided by the team were transformative for our business. We increased efficiency and improved our processes, leading to measurable results."
            </p>
            <span>- John Doe, CEO of XYZ Corp</span>
          </div>
          <div className="testimonial-card">
            <p>
              "Their legal team helped us navigate complex regulatory challenges and ensured that our company remained compliant with all industry standards."
            </p>
            <span>- Sarah Smith, Legal Advisor</span>
          </div>
        </section>
  
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have a question or want to learn more about our services? Reach out to us today, and let’s discuss how we can help your business succeed.
          </p>
          <button className="contact-btn">Contact Us</button>
        </section>
  
        <footer className="services-footer">
          <p>© 2024 Professional & Business Services. All rights reserved.</p>
        </footer>
      </div>
    );
  };
  
  export default ProfessionalAndBusinessServices;
