// Salesjob/Modal.jsx

import React from 'react';
import './Modal.css'; // Import the CSS file for styling

function Modal({ closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>Departments</h2>
        <div className="modal-body">
          <div className="modal-filter-item">
            <input type="checkbox" id="dept1" />
            <label htmlFor="dept1">Production, Manufacturing & Engineering (43)</label>
          </div>
          <div className="modal-filter-item">
            <input type="checkbox" id="dept2" />
            <label htmlFor="dept2">Strategic & Top Management (34)</label>
          </div>
          <div className="modal-filter-item">
            <input type="checkbox" id="dept3" />
            <label htmlFor="dept3">Healthcare & Life Sciences (32)</label>
          </div>
          {/* Add all other department options here */}
          <div className="modal-filter-item">
            <input type="checkbox" id="deptLast" />
            <label htmlFor="deptLast">Legal & Regulatory (1)</label>
          </div>
          <button className="apply-btn">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
