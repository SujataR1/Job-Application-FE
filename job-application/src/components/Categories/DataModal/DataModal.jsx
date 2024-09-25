// Modal.js
import React from 'react';
import './DataModal.css'; // Import the CSS file for styling

function Modal({ closeModal, type }) {
  const departments = [
    "Data Science & Analytics(12638)",
         "Engineering - Software & QA(9481)",
        "Marketing & Communication(1106)",
        "Sales & Business Development(1022)",
         "Customer Success, Service & Operations(1009)",
         "Finance & Accounting(894)",
         "IT & Information Security(458)",
         "Other(430)",
         "Human Resources(424)",
         "Consulting(405)",
         "Product Management(384)",
         "Project & Program Management(377)",
         "Research & Development(354)",
         "Teaching & Training(296)",
         "Production, Manufacturing & Engineering(294)",
         "Procurement & Supply Chain(245)",
        "Quality Assurance(233)",
         "BFSI, Investments & Trading(227)",
         "UX, Design & Architecture(166)",
         "Healthcare & Life Sciences(165)",
         "Engineering - Hardware & Networks(130)",
         "Strategic & Top Management(109)",
         "Risk Management & Compliance(104)",
        "Merchandising, Retail & eCommerce(103)",
         "Content, Editorial & Journalism(91)",
         "Administration & Facilities(84)",
         "Construction & Site Engineering(66)",
         "Legal & Regulatory(31)",
         "Food, Beverage & Hospitality(26)",
        "Environment Health & Safety(24)",
        "CSR & Social Service(23)",
         "Security Services(5)",
         "Energy & Mining(4)",
       "Media Production & Entertainment(4)",
         "Aviation & Aerospace(2)",
         "Sports, Fitness & Personal Care(1)"
  ];

  const locations = [
   "Bengaluru(4550)",
     "Delhi / NCR(2460)",
     "Hyderabad(2049)",
     "Mumbai (All Areas)(1840)",
     "Pune(1755)",
     "Chennai(1416)",
     "Gurugram(1090)",
     "New Delhi(749)",
     "Kolkata(598)",
     "Noida(552)",     
     "Ahmedabad(293)",
     "Jaipur(129)",
     "Indore(111)",
    "Kochi(101)",
     "Navi Mumbai(88)",
     "Mohali(85)",
     "Coimbatore(80)",
     "Thiruvananthapuram(76)",
     "Thane(60)",
     "Surat(42)",
     "Nagpur(40)",
     "Chandigarh(40)",
     "Bangalore Rural(39)",
     "Vadodara(38)"
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>Filters</h2>

        {type === 'departments' && (
          <>
            <h3>View More Departments</h3>
            <div className="modal-body">
              {departments.map((dept, index) => (
                <div key={index} className="modal-filter-item">
                  <input type="checkbox" id={`dept${index}`} />
                  <label htmlFor={`dept${index}`}>{dept}</label>
                </div>
              ))}
            </div>
          </>
        )}

        {type === 'locations' && (
          <>
            <h3>View More Locations</h3>
            <div className="modal-body">
              {locations.map((location, index) => (
                <div key={index} className="modal-filter-item">
                  <input type="checkbox" id={`loc${index}`} />
                  <label htmlFor={`loc${index}`}>{location}</label>
                </div>
              ))}
            </div>
          </>
        )}

        <button className="apply-btn">Apply</button>
      </div>
    </div>
  );
}

export default Modal;
