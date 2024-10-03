
import React from 'react';
import './Careers.css';
import jobsearch from '../images/jobsearch.jpg';
import Careres from '../images/carerres.jpg';
import Values from '../images/values.jpg';
import Benefits from '../images/benefits.jpg'; 
import investee1 from '../images/investee1.jpg';
import investee2 from '../images/investee2.jpg';
import investee3 from '../images/investee3.jpeg';
import investee4 from '../images/investee4.webp';
import investee5 from '../images/investee5.jpg';
import aboutus from '../images/about1.jpg';

const Careers = () => {
  return (
    <div className="careers-container">
      <header className="careers-header">
        <img src={aboutus} alt="Company" className="section-image full-width" />
        <h1>Careers at Job Portal</h1>
        <p>Join India's leading consumer internet company!</p>
      </header>

      <section className="company-introduction">
        <div className="flex-container">
          <img src={Careres} alt="About Us" className="sections-image" />
          <div className="text-content">
            <h2>About Us</h2>
            <p>
              Job Portal is India’s leading consumer internet company known for its strong brands in recruitment 
              (naukri.com, naukrigulf.com, iimjobs.com, firstnaukri.com), real estate (99acres.com), matrimony 
              (jeevansathi.com) and education (shiksha.com).
            </p>
          </div>
        </div>
      </section>

      <section className="businesses">
        <div className="flex-container">
          <div className="text-content">
            <h2>Our Businesses</h2>
            <ul>
              <li>Recruitment: naukri.com</li>
              <li>Real Estate: 99acres.com</li>
              <li>Matrimony: jeevansathi.com</li>
              <li>Education: shiksha.com</li>
            </ul>
          </div>
          <img src={jobsearch} alt="Job Search" className="sections-image" />
        </div>
      </section>

      <section className="values">
        <div className="flex-container">
          <div className="text-content">
            <h2>Our Values</h2>
            <p>
              At Job Portal, people are our core competitive advantage. We pride ourselves on having a culture that 
              promotes meritocracy and innovation.
            </p>
          </div>
          <img src={Values} alt="Values" className="sections-image" />
        </div>
      </section>

      <section className="benefits">
        <div className="flex-container">
          <img src={Benefits} alt="Benefits" className="sections-image" />
          <div className="text-content">
            <h2>Benefits</h2>
            <ul>
              <li>Company paid online courses & certifications</li>
              <li>Flexible health & accidental insurance plans</li>
              <li>Workplace wellness initiatives</li>
              <li>Opportunities for internal career mobility</li>
              <li>Reward and recognition programs</li>
              <li>Defined employee-friendly policies</li>
              <li>Team outings and annual celebrations</li>
              <li>CSR initiatives to contribute to society</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="leadership">
        <h2>Our Leaders</h2>
        <ul className="leadership-list">
          <li className="leadership-item">
            <img src={investee1} alt="Sanjeev Bikhchandani" className="leadership-image" />
            <div className="leadership-info">
              <strong>Sanjeev Bikhchandani</strong> - Founder & Executive Vice Chairman
            </div>
          </li>
          <li className="leadership-item">
            <img src={investee2} alt="Hitesh Oberoi" className="leadership-image" />
            <div className="leadership-info">
              <strong>Hitesh Oberoi</strong> - CEO & Managing Director
            </div>
          </li>
          <li className="leadership-item">
            <img src={investee3} alt="Chintan Thakkar" className="leadership-image" />
            <div className="leadership-info">
              <strong>Chintan Thakkar</strong> - Chief Financial Officer & Executive Director
            </div>
          </li>
          <li className="leadership-item">
            <img src={investee4} alt="Chintan Thakkar" className="leadership-image" />
            <div className="leadership-info">
              <strong>Chintan Thakkar</strong> - Chief Financial Officer & Executive Director
            </div>
          </li>
          <li className="leadership-item">
            <img src={investee5} alt="Chintan Thakkar" className="leadership-image" />
            <div className="leadership-info">
              <strong>Chintan Thakkar</strong> - Chief Financial Officer & Executive Director
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Careers;
