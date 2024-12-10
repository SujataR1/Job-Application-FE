// import React, { useState } from 'react';
// import './Jobs.css'; // Importing the CSS file

// const Job = () => {
//   const [activeOption, setActiveOption] = useState(null); // Track which option is active

//   const handleClick = (option) => {
//     setActiveOption(option); // Set the active option when clicked
//   };

//   const renderAdditionalOptions = () => {
//     switch (activeOption) {
//       case 'Top Locations':
//         return (
//           <ul>
//             <li>Delhi</li>
//             <li>Bangalore</li>
//             <li>Mumbai</li>
//             <li>Hyderabad</li>
//           </ul>
//         );
//       case 'Top Companies':
//         return (
//           <ul>
//             <li>Google</li>
//             <li>Microsoft</li>
//             <li>Meta</li>
//             <li>Amazon</li>
//           </ul>
//         );
//       case 'Explore More Jobs':
//         return (
//           <ul>
//             <li>Software Engineer</li>
//             <li>Product Manager</li>
//             <li>HR Manager</li>
//             <li>Data Scientist</li>
//           </ul>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="job-section">
//       <div className="job-options">
//         <div
//           className="job-option"
//           onMouseEnter={() => setActiveOption(null)} // Hide options on hover out
//         >
//           Jobs
//           <div className="dropdown">
//             <ul>
//               <li onClick={() => handleClick('Top Locations')}>Top Locations</li>
//               <li onClick={() => handleClick('Top Companies')}>Top Companies</li>
//               <li onClick={() => handleClick('Explore More Jobs')}>Explore More Jobs</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       {activeOption && (
//         <div className="additional-options">
//           <h4>{activeOption}</h4>
//           {renderAdditionalOptions()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Job;


import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'; // Assuming applicant has a navbar
import Sidenavbar from '../Sidenavbar/Sidenavbar'; // Assuming applicant has a sidenavbar

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', location: 'New York', salary: 90000, type: 'Full-time' },
    { id: 2, title: 'Data Analyst', location: 'Remote', salary: 70000, type: 'Part-time' },
  ]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Handle Apply Job
  const handleApplyJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  return (
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-content flex flex-row">
        <Sidenavbar />
        <div className="jobs-container">
          <h1>Job Listings</h1>

          {/* Job Listings Table */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Job Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.type}</td>
                  <td>
                    <button
                      className="apply-btn"
                      onClick={() => handleApplyJob(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? 'Applied' : 'Apply'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
