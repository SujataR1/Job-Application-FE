// Salesjob/Modal.jsx

import React from 'react';
import './ITmodal.css'; // Import the CSS file for styling

function Modal({ closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>Departments</h2>
        <div className="modal-body">
          {[
            "Engineering - Hardware & Networks(1175)",
            "Engineering - Software & QA(14878)",
            "IT & Information Security(2907)",
            "Sales & Business Development(9283)",
            "Customer Success, Service & Operations(5768)",
            "Finance & Accounting(3697)",
            "Production, Manufacturing & Engineering(2996)",
            "Human Resources(2632)",
            "Healthcare & Life Sciences(2334)",
            "Marketing & Communication(2199)",
            "BFSI, Investments & Trading(2109)",
            "Consulting(1667)",
            "Other(1543)",
            "Data Science & Analytics(1365)",
            "Procurement & Supply Chain(1350)",
            "Construction & Site Engineering(1148)",
            "Teaching & Training(1136)",
            "Administration & Facilities(994)",
            "Project & Program Management(932)",
            "UX, Design & Architecture(929)",
            "Quality Assurance(908)",
            "Research & Development(904)",
            "Food, Beverage & Hospitality(747)",
            "Legal & Regulatory(422)",
            "Merchandising, Retail & eCommerce(409)",
            "Content, Editorial & Journalism(376)",
            "Risk Management & Compliance(267)",
            "Product Management(257)",
            "Environment Health & Safety(209)",
            "Strategic & Top Management(181)",
            "Media Production & Entertainment(168)",
            "Sports, Fitness & Personal Care(61)",
            "Security Services(58)",
            "Aviation & Aerospace(57)",
            "CSR & Social Service(44)",
            "Energy & Mining(42)",
            "Shipping & Maritime(22)"
          ].map((dept, index) => (
            <div key={index} className="modal-filter-item">
              <input type="checkbox" id={`dept${index}`} />
              <label htmlFor={`dept${index}`}>{dept}</label>
            </div>
          ))}
          <button className="apply-btn">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
