import React from 'react';
import './ITmodal.css'; // Ensure you have CSS for styling

// Modal component definition
function Modal({ closeModal, handleFilterChange, filters }) {
  // Define filter options
  const departments = [
    'Engineering - Hardware & Networks',
    'Engineering - Software & QA',
    'IT & Information Security',
    'Sales & Business Development',
    'Customer Success, Service & Operations',
    'Finance & Accounting',
    'Production, Manufacturing & Engineering',
    'Human Resources',
    'Healthcare & Life Sciences',
    'Marketing & Communication',
    'BFSI, Investments & Trading',
    'Consulting',
    'Other',
    'Data Science & Analytics',
    'Procurement & Supply Chain',
    'Construction & Site Engineering',
    'Teaching & Training',
    'Administration & Facilities',
    'Project & Program Management',
    'UX, Design & Architecture',
    'Quality Assurance',
    'Research & Development',
    'Food, Beverage & Hospitality',
    'Legal & Regulatory',
    'Merchandising, Retail & eCommerce',
    'Content, Editorial & Journalism',
    'Risk Management & Compliance',
    'Product Management',
    'Environment Health & Safety',
  ];

  const salaries = [
    '0-3 Lakhs',
    '3-6 Lakhs',
    '6-10 Lakhs',
    '10-15 Lakhs',
    '15-25 Lakhs',
    '25-50 Lakhs',
    '50-75 Lakhs',
    '75-100 Lakhs',
    '1-5 Cr',
    '5+ Cr',
  ];

  const locations = [
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Delhi / NCR',
    'Chennai',
    'Mumbai (All Areas)',
    'Gurugram',
    'Mumbai',
    'Noida',
    'Kolkata',
    'Ahmedabad',
    'Coimbatore',
    'Jaipur',
    'Navi Mumbai',
    'Indore',
    'Bhubaneswar',
    'Kochi',
    'New Delhi',
    'Bangalore Rural',
    'Thiruvananthapuram',
    'Mumbai Suburban',
    'Nagpur',
    'Thane',
    'Mohali',
    'Vadodara',
  ];

  const industries = [
    'IT Services & Consulting',
    'Software Product',
    'Hardware & Networking',
    'Electronic Components / Semiconductors',
    'Internet',
    'Electronics Manufacturing',
    'Emerging Technologies',
    'Banking',
    'FinTech / Payments',
    'Investment Banking / Venture Capital / Private Equity',
    'Financial Services',
    'Insurance',
    'NBFC',
    'Recruitment / Staffing',
    'Management Consulting',
    'Accounting / Auditing',
    'Legal',
    'Facility Management Services',
    'Architecture / Interior Design',
    'Law Enforcement / Security Services',
    'BPO / Call Centre',
    'Analytics / KPO / Research',
    'Telecom',
    'Media / Entertainment',
  ];

  const roles = [
    'Software Development',
    'DBA / Data warehousing',
    'Quality Assurance and Testing',
    'IT Support',
    'IT Infrastructure Services',
    'IT Network',
    'IT Security',
    'DevOps',
    'IT & Information Security - Other',
    'Hardware',
    'Telecom',
    'Hardware and Networks - Other',
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
        <h2>Filters</h2>

        <section>
          <h3>Departments</h3>
          <select onChange={(e) => handleFilterChange('department', e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h3>Salary</h3>
          <select onChange={(e) => handleFilterChange('salary', e.target.value)}>
            <option value="">Select Salary</option>
            {salaries.map((salary) => (
              <option key={salary} value={salary}>
                {salary}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h3>Location</h3>
          <select onChange={(e) => handleFilterChange('location', e.target.value)}>
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h3>Industry</h3>
          <select onChange={(e) => handleFilterChange('industry', e.target.value)}>
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </section>

        <section>
          <h3>Role Category</h3>
          <select onChange={(e) => handleFilterChange('role', e.target.value)}>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </section>
      </div>
    </div>
  );
}

export default Modal;
