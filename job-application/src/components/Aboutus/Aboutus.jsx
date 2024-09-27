import React from "react";
import "./Aboutus.css"; // Ensure you create this CSS file
import aboutus from '../../components/images/about.jpg';
import values from '../../components/images/values.jpg';
import { Link } from "react-router-dom";
import investee1 from '../../components/images/investee1.jpg';
import investee2 from '../../components/images/investee2.jpg';
import investee3 from '../../components/images/investee3.jpeg'; 
import investee4 from '../../components/images/investee4.webp';
import investee5 from '../../components/images/investee5.jpg';


const About = () => {
  return (
    <div className="about-container">
      <div className="company-overview">
        <h2 >About Transmogrify</h2>
        <p>
          As one of the very few profitable pure play internet companies in the country,
          Info Edge is India’s premier online classifieds company in recruitment,
          matrimony, real estate, education, and related services.
        </p>
        <Link to="/overview">
          <button className="learn-more">LEARN MORE</button>
        </Link>
       
      </div>
      {/* Section 1: Introduction */}
      <div className="about-section">
        <img src={aboutus} alt="About Us" className="about-image" />
        <div className="about-text">
          <h2>Welcome to Our Job Application Portal</h2>
          <p>
            We are dedicated to connecting job seekers with the best opportunities.
            Our platform simplifies the application process, allowing you to focus
            on what matters most—your career.
          </p>
          <p>
            Our mission is to empower individuals to achieve their professional goals
            by providing the tools, resources, and support needed to excel in the
            job market.
          </p>
        </div>
      </div>

      {/* Section 2: Our Values */}
      <div className="about-section reverse">
        <img src={values} alt="Our Values" className="about-image" />
        <div className="about-text">
          <h2>Our Values</h2>
          <p>
            <i className="fas fa-users"></i> Collaboration: We believe in teamwork
            and supporting one another.
          </p>
          <p>
            <i className="fas fa-briefcase"></i> Professionalism: We uphold the highest
            standards of integrity and excellence.
          </p>
          <p>
            <i className="fas fa-info-circle"></i> Transparency: We prioritize clear and
            honest communication with our users.
          </p>
        </div>
      </div>
        {/* Section 5: Our Businesses */}
        <div className="businesses">
        <h2>Our Businesses</h2>
        <ul className="business-list">
          <li>Business A</li>
          <li>Business B</li>
          <li>Business C</li>
          <li>Business D</li>
        </ul>
      </div>

      {/* Section 6: Our Investee Companies */}
      <div className="investee-companies">
        <h2>Meet Our Leadership Team</h2>
        <div className="leadership-images">
          <div className="circle">
            <img src={investee1} alt="Investee 1" />
           </div>
          <div className="circle">
            <img src={investee2} alt="Investee 2" />
          </div>
          <div className="circle">
            <img src={investee3} alt="Investee 3" />
          </div>
          <div className="circle">
            <img src={investee4} alt="Investee 4" />
          </div>
          <div className="circle">
            <img src={investee5} alt="Investee 5" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;

    