import React from 'react';
import './jobs4u.css';

const Jobs4u = () => {
    const jobListings = [
        { id: 1, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 2, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 3, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 4, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 5, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 6, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 7, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 8, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 9, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 10, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 11, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 12, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 13, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 14, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 15, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 16, title: 'Frontend Developer', location: 'Remote', description: 'Build amazing user interfaces.' },
        { id: 17, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 18, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
        { id: 19, title: 'Backend Developer', location: 'On-site', description: 'Develop robust server-side applications.' },
        { id: 20, title: 'UI/UX Designer', location: 'Hybrid', description: 'Design intuitive user experiences.' },
    ];

    return (
        <div className="jobs4u-container">
            <h1>Jobs4U</h1>
            <div className="job-listings">
                {jobListings.map(job => (
                    <div key={job.id} className="job-card">
                        <h2>{job.title}</h2>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>{job.description}</p>
                        <button className="apply-button">Apply Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs4u;
