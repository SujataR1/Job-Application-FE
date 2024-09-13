import React from 'react';

const JobList = ({ jobs }) => {
    return (
        <div className="p-5 w-3/4">
            <h2 className="text-xl font-bold mb-4">Job Opportunities</h2>
            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                jobs.map((job, index) => (
                    <div key={index} className="p-4 mb-4 border border-gray-200 rounded-md">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>Salary: {job.salary}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default JobList;
