import React from 'react';

const jobs = [
    { id: 1, title: 'Frontend Developer', location: 'Remote' },
    { id: 2, title: 'Backend Developer', location: 'New York' },
    { id: 3, title: 'UI/UX Designer', location: 'California' },
];

const JobListing = ({ searchTerm }) => {
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {filteredJobs.length > 0 ? (
                <ul>
                    {filteredJobs.map(job => (
                        <li key={job.id}>
                            {job.title} - {job.location}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No jobs found for "{searchTerm}"</p>
            )}
        </div>
    );
};

export default JobListing;
