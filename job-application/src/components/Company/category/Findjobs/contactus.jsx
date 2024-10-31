import React from 'react';
import './contactus.css';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <div className="contact-details">
                <div className="detail-card card-company">
                    <h2>Transmogrify Global</h2>
                    <p>Newtown</p>
                    <p>Kolkata</p>
                </div>
                <div className="detail-card card-phone">
                    <h2>Phone</h2>
                    <p>6294159764</p>
                </div>
                <div className="detail-card card-email">
                    <h2>Email</h2>
                    <p>tgwbin@gmail.com</p>
                </div>
                <div className="detail-card card-follow">
                    <h2>Follow Us</h2>
                    <p>Facebook | Twitter | LinkedIn</p>
                </div>
            </div>
            <form className="contact-form">
                <h2>Get in Touch</h2>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
