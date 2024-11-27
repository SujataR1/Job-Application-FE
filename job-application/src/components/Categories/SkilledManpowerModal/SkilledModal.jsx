// SkilledModal.js
import React from 'react';
import './SkilledModal.css'; 

const SkilledModal = ({ closeModal }) => {
    const jobTypes = [
        "Full-Time",
        "Part-Time",
        "Contract",
        "Internship",
        "Freelance",
        "Temporary",
        "Volunteer"
    ];

    const locations = [
        "Delhi",
        "Mumbai",
        "Bengaluru",
        "Hyderabad",
        "Pune",
        "Chennai",
        "Kolkata",
        "Ahmedabad",
        "Jaipur",
        "Surat"
    ];

    const experienceLevels = [
        "0-1 Years",
        "1-2 Years",
        "2-3 Years",
        "3-5 Years",
        "5-7 Years",
        "7-10 Years",
        "10+ Years"
    ];

    const jobDepartments = [
        "Construction (500)",
        "Electrical (300)",
        "Plumbing (250)",
        "Mechanical (400)",
        "Civil Engineering (450)",
        "IT Support (600)",
        "Quality Assurance (350)",
        "Manufacturing (700)",
        "Project Management (200)",
        "Sales (150)"
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={closeModal}>
                    &times;
                </button>
                <h2>Filters</h2>

                {/* Job Types Section */}
                <h3>Job Types</h3>
                <div className="modal-body">
                    {jobTypes.map((type, index) => (
                        <div key={index} className="modal-filter-item">
                            <input type="checkbox" id={`jobType${index}`} />
                            <label htmlFor={`jobType${index}`}>{type}</label>
                        </div>
                    ))}
                </div>

                {/* Locations Section */}
                <h3>Locations</h3>
                <div className="modal-body">
                    {locations.map((location, index) => (
                        <div key={index} className="modal-filter-item">
                            <input type="checkbox" id={`location${index}`} />
                            <label htmlFor={`location${index}`}>{location}</label>
                        </div>
                    ))}
                </div>

                {/* Experience Levels Section */}
                <h3>Experience Levels</h3>
                <div className="modal-body">
                    {experienceLevels.map((level, index) => (
                        <div key={index} className="modal-filter-item">
                            <input type="checkbox" id={`experience${index}`} />
                            <label htmlFor={`experience${index}`}>{level}</label>
                        </div>
                    ))}
                </div>

                {/* Job Departments Section */}
                <h3>Job Departments</h3>
                <div className="modal-body">
                    {jobDepartments.map((dept, index) => (
                        <div key={index} className="modal-filter-item">
                            <input type="checkbox" id={`department${index}`} />
                            <label htmlFor={`department${index}`}>{dept}</label>
                        </div>
                    ))}
                </div>

                <button className="apply-btn">Apply Filters</button>
            </div>
        </div>
    );
};

export default SkilledModal;
