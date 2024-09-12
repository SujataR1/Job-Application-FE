import React from 'react';

const featuredJobs = [
    { id: 1, title: 'Data Scientist', location: 'Remote' },
    { id: 2, title: 'Product Manager', location: 'London' },
    { id: 3, title: 'Mobile App Developer', location: 'Toronto' },
];

const FeaturedJobs = () => {
    return (
        <div>
            <ul>
                {featuredJobs.map(job => (
                    <li key={job.id}>
                        {job.title} - {job.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeaturedJobs;
