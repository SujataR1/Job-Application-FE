import React from 'react';
import './priority-applicant.css';

const PriorityApplicant = () => {
    const applicants = [
        { id: 1, name: 'Alice Smith', position: 'Frontend Developer', status: 'Reviewed' },
        { id: 2, name: 'Bob Johnson', position: 'Backend Developer', status: 'Shortlisted' },
        { id: 3, name: 'Charlie Brown', position: 'UI/UX Designer', status: 'Interview Scheduled' },
    ];

    return (
        <div className="priority-applicant-container">
            <h1>Priority Applicants</h1>
            <div className="applicant-list">
                {applicants.map(applicant => (
                    <div key={applicant.id} className="applicant-card">
                        <h2>{applicant.name}</h2>
                        <p><strong>Position:</strong> {applicant.position}</p>
                        <p><strong>Status:</strong> {applicant.status}</p>
                        <button className="view-details-button">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriorityApplicant;
