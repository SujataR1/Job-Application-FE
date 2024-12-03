import React from 'react';
const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>Experience: {job.experience}</p>
      <p>WFH: {job.wfh ? 'Yes' : 'No'}</p>
      <button>Apply Now</button>
    </div>
  );
};

export default JobCard;
