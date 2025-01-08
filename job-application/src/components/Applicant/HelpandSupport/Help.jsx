import React, { useState } from "react";
import "./Help.css";

const HelpAndSupport = () => {
  // State for FAQ search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  // State for Contact Us form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFAQClick = (index) => {
    setSelectedFAQ(selectedFAQ === index ? null : index);
  };

  const handleContactFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Send the contact form data to the support team (API request can go here)
    console.log("Contact form submitted:", contactForm);
  };

  const faqs = [
    { question: "How do I reset my password?", answer: "To reset your password, click on 'Forgot Password' on the login page." },
    { question: "How can I apply for a job?", answer: "You can apply for a job by navigating to the job listings and clicking 'Apply Now'." },
    { question: "What should I do if my application is rejected?", answer: "If your application is rejected, you can review the feedback or apply for other roles." },
  ];

  return (
    <div className="help-support-container">
      <h1>Help and Support</h1>

      {/* FAQ Search */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        {faqs
          .filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => handleFAQClick(index)}
              >
                {faq.question}
              </div>
              {selectedFAQ === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
      </div>

      {/* Contact Us Form */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            value={contactForm.name}
            placeholder="Your Name"
            onChange={handleContactFormChange}
            required
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            placeholder="Your Email"
            onChange={handleContactFormChange}
            required
          />
          <textarea
            name="message"
            value={contactForm.message}
            placeholder="Your Message"
            onChange={handleContactFormChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HelpAndSupport;
