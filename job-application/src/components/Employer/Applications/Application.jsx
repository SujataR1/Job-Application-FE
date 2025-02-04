// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './Application.css';
// import EmployerNavbar from '../Navbar/Navbar';
// import EmployerSidebar from '../Sidebar/Sidebar';

// // Dummy Data for job and applicants
// const initialJobs = [
//   {
//     id: 1,
//     title: 'Software Engineer',
//     company: 'Tech Innovators',
//     applicants: [
//       { id: 1, name: 'John Doe', resume: 'resume_link1', status: 'Applied', appliedOn: '2024-12-01' },
//       { id: 2, name: 'Jane Smith', resume: 'resume_link2', status: 'Applied', appliedOn: '2024-12-02' },
//       { id: 3, name: 'Emma Watson', resume: 'resume_link3', status: 'Applied', appliedOn: '2024-12-03' },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Product Manager',
//     company: 'Innovative Solutions',
//     applicants: [
//       { id: 4, name: 'Mark Lee', resume: 'resume_link4', status: 'Applied', appliedOn: '2024-12-01' },
//       { id: 5, name: 'Sally Green', resume: 'resume_link5', status: 'Applied', appliedOn: '2024-12-02' },
//     ],
//   },
// ];

// const JobAnalyticsPage = () => {
//   const { jobId } = useParams();
//   const job = initialJobs.find((job) => job.id === parseInt(jobId));
//   const [applicants, setApplicants] = useState(job ? job.applicants : []);
//   const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
//   const [showInterviewPopup, setShowInterviewPopup] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
  
//   // Interview related state variables
//   const [interviewType, setInterviewType] = useState('');
//   const [meetingLink, setMeetingLink] = useState('');
//   const [address, setAddress] = useState('');
//   const [interviewDateTime, setInterviewDateTime] = useState('');

//   const handleShortlist = (applicantId) => {
//     const updatedApplicants = applicants.map((applicant) =>
//       applicant.id === applicantId ? { ...applicant, status: 'Shortlisted' } : applicant
//     );
//     setApplicants(updatedApplicants);
//   };

//   const handleReject = (applicantId) => {
//     const updatedApplicants = applicants.map((applicant) =>
//       applicant.id === applicantId ? { ...applicant, status: 'Rejected' } : applicant
//     );
//     setApplicants(updatedApplicants);
//   };

//   const handleAssessment = (applicantId) => {
//     setSelectedApplicant(applicants.find((applicant) => applicant.id === applicantId));
//     setShowAssessmentPopup(true);
//   };

//   const handleInterview = (applicantId) => {
//     setSelectedApplicant(applicants.find((applicant) => applicant.id === applicantId));
//     setShowInterviewPopup(true);
//   };

//   const handleAssessmentSend = () => {
//     const updatedApplicants = applicants.map((applicant) =>
//       applicant.id === selectedApplicant.id ? { ...applicant, status: 'In Progress' } : applicant
//     );
//     setApplicants(updatedApplicants);
//     setShowAssessmentPopup(false);
//   };

//   const handleInterviewSend = () => {
//     const updatedApplicants = applicants.map((applicant) =>
//       applicant.id === selectedApplicant.id
//         ? {
//             ...applicant,
//             status: 'In Progress',
//             interviewDetails: {
//               date: interviewDateTime,
//               type: interviewType,
//               meetingLink: interviewType === 'Online' ? meetingLink : null,
//               address: interviewType === 'Physical' ? address : null,
//             },
//           }
//         : applicant
//     );
//     setApplicants(updatedApplicants);
//     setShowInterviewPopup(false);
//   };

//   // Cancel button logic to close the popups
//   const handleCancel = () => {
//     // Reset form fields for interview
//     setInterviewType('');
//     setMeetingLink('');
//     setAddress('');
//     setInterviewDateTime('');

//     // Close both popups
//     setShowAssessmentPopup(false);
//     setShowInterviewPopup(false);
//   };

//   // Calculating statistics
//   const shortlistedCount = applicants.filter((applicant) => applicant.status === 'Shortlisted').length;
//   const rejectedCount = applicants.filter((applicant) => applicant.status === 'Rejected').length;
//   const inProgressCount = applicants.filter((applicant) => applicant.status === 'In Progress').length;

//   return (
//     <div className="home-page">
//       <EmployerNavbar />
//       <div className="home-content flex flex-row">
//         <EmployerSidebar />
//         <div className="job-analytics-page">
//           <h1>Applicants Analytics for {job?.title}</h1>

//           {/* Displaying the statistics */}
//           <div className="statistics">
//             <div className="stat-item">
//               <h4>Shortlisted: {shortlistedCount}</h4>
//             </div>
//             <div className="stat-item">
//               <h4>Rejected: {rejectedCount}</h4>
//             </div>
//             <div className="stat-item">
//               <h4>In Progress: {inProgressCount}</h4>
//             </div>
//           </div>

//           {/* Applicant List */}
//           <ul className="applicant-list">
//             {applicants.map((applicant) => (
//               <li key={applicant.id} className="applicant-item">
//                 <h4 >{applicant.name}</h4>
//                 <p>Status: {applicant.status}</p>
//                 <p>Applied On: {applicant.appliedOn}</p>
//                 <a href={applicant.resume} download>Download Resume</a>
//                 <div>
//                   <button className="shortlist" style={{ marginRight: '10px' }} onClick={() => handleShortlist(applicant.id)}>Shortlist</button>
//                   <button className="reject" onClick={() => handleReject(applicant.id)}>Reject</button>
//                 </div>
//                 {applicant.status === 'Shortlisted' && (
//                   <div>
//                     <button className="assessment" onClick={() => handleAssessment(applicant.id)}>Custom Assessment</button>
//                     <button className="interview" onClick={() => handleInterview(applicant.id)}>Schedule Interview</button>
//                   </div>
//                 )}

//                 {/* Display Interview Details */}
//                 {applicant.interviewDetails && (
//                   <div>
//                     <p><strong>Interview Scheduled:</strong></p>
//                     <p>Date & Time: {applicant.interviewDetails.date}</p>
//                     <p>Type: {applicant.interviewDetails.type}</p>
//                     {applicant.interviewDetails.type === 'Online' && <p>Meeting Link: {applicant.interviewDetails.meetingLink}</p>}
//                     {applicant.interviewDetails.type === 'Physical' && <p>Address: {applicant.interviewDetails.address}</p>}
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>

//           {/* Custom Assessment Popup */}
//           {showAssessmentPopup && (
//             <div className="popup assessment-popup">
//               <div className="popup-content">
//                 <h3>Custom Assessment for {selectedApplicant.name}</h3>
//                 <label>Assessment Type</label>
//                 <input type="text" placeholder="Enter assessment type" />
//                 <label>Deadline</label>
//                 <input type="date" />
//                 <div className="popup-buttons">
//                   <button className="send" onClick={handleAssessmentSend}>Send</button>
//                   <button className="cancel" onClick={handleCancel}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Interview Scheduling Popup */}
//           {showInterviewPopup && (
//             <div className="popup">
//               <div className="popup-content">
//                 <h3>Schedule Interview for {selectedApplicant.name}</h3>
//                 <label>Interview Type</label>
//                 <select
//                   value={interviewType}
//                   onChange={(e) => setInterviewType(e.target.value)}
//                 >
//                   <option value="">Select Interview Type</option>
//                   <option value="Online">Online</option>
//                   <option value="Physical">Physical</option>
//                 </select>
//                 <label>Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={interviewDateTime}
//                   onChange={(e) => setInterviewDateTime(e.target.value)}
//                 />
//                 <label>Note</label>
//                 <input type="text" placeholder="Enter any notes" />
//                 {interviewType === 'Online' && (
//                   <>
//                     <label>Meeting Link</label>
//                     <input
//                       type="text"
//                       placeholder="Enter meeting link"
//                       value={meetingLink}
//                       onChange={(e) => setMeetingLink(e.target.value)}
//                     />
//                   </>
//                 )}
//                 {interviewType === 'Physical' && (
//                   <>
//                     <label>Address</label>
//                     <input
//                       type="text"
//                       placeholder="Enter address"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                     />
//                   </>
//                 )}
//                 <div className="popup-buttons">
//                   <button className="send" onClick={handleInterviewSend}>Schedule Interview</button>
//                   <button className="cancel" onClick={handleCancel}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobAnalyticsPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import EmployerNavbar from '../Navbar/Navbar';
// import EmployerSidebar from '../Sidebar/Sidebar';
// import './Application.css';

// const Application = () => {
//   const [applications, setApplications] = useState([]); // To store all the application details
//   const [companyId, setCompanyId] = useState(''); // To store the company ID
//   const [jobDetails, setJobDetails] = useState(null); // To store job details (title, description, etc.)
//   const [token, setToken] = useState(''); // To store auth token
//   const { jobId } = useParams(); // Extract jobId from the URL

//   // Fetch the companies the user can post jobs for and set the companyId
//   useEffect(() => {
//     const authToken = localStorage.getItem('token');
//     setToken(authToken);

//     if (authToken) {
//       axios
//         .get('http://localhost:7000/jobposts/companies-user-can-post-jobs-for', {
//           headers: {
//             Authorization: ` ${authToken}`,
//           },
//         })
//         .then((response) => {
//           if (response.data.companies.length > 0) {
//             const company = response.data.companies[0]; // Assuming the first company
//             setCompanyId(company.id); // Set the companyId
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching companies:', error);
//         });
//     }
//   }, []);

//   // Fetch job details based on jobId
//   useEffect(() => {
//     if (jobId && companyId && token) {
//       axios
//         .get(`http://localhost:7000/jobposts/post-by-id/${jobId}`, {
//           headers: {
//             Authorization: `${token}`,
//           },
//         })
//         .then((response) => {
//           setJobDetails(response.data); // Set job details like title, description
//         })
//         .catch((error) => {
//           console.error('Error fetching job details:', error);
//         });
//     }
//   }, [jobId, companyId, token]);

//   useEffect(() => {
//     if (companyId && jobId && token) {
//       axios
//         .get(
//           `http://localhost:7000/application/company-applications?companyId=${companyId}&jobPostingId=${jobId}`,
//           {
//             headers: {
//               Authorization: ` ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           if (response.data && response.data.length > 0) {
//             console.log('Fetched application IDs:', response.data);
//             response.data.forEach((application) => {
//               // Log the entire application object to see its structure
//               console.log('Application Id:', application);
  
//               // Make sure the applicationId exists before making the request
//               if (application) {
//                 console.log('Fetching details for application ID:', application);
  
//                 // Correctly construct the URL with applicationId
//                 axios
//                   .get(
//                     `http://localhost:7000/application/application/${companyId}/${application}`,
//                     {
//                       headers: {
//                         Authorization: ` ${token}`,
//                       },
//                     }
//                   )
//                   .then((res) => {
//                     console.log('Fetched application details:', res.data);
//                     // Add the fetched application details to the state
//                     setApplications((prevApplications) => [...prevApplications, res.data]);
//                   })
//                   .catch((error) => {
//                     console.error('Error fetching individual application:', error);
//                   });
//               } else {
//                 console.log('No applicationId found for this application.');
//               }
//             });
//           } else {
//             console.log('No applications found for this job.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching application IDs:', error);
//         });
//     }
//   }, [companyId, jobId, token]);
  
  
//   // Format date for display
//   const formatDate = (date) => {
//     const formattedDate = new Date(date);
//     return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
//   };

//   return (
//     <div className="job-analytics-page">
//       <EmployerNavbar />
//       <div className="home-content flex flex-row">
//         <EmployerSidebar />
//         <div className="analytics-content">
//           {jobDetails ? (
//             <>
//               <h1>Application Analytics for Job: {jobDetails.title}</h1>
//             </>
//           ) : (
//             <p>Loading job details...</p>
//           )}

//           {applications.length > 0 ? (
//             applications.map((application) => (
//               <div key={application.id} className="application-card">
//                 <h3>Applicant: {application.user.fullName}</h3>
//                 <p><strong>Email:</strong> {application.user.email}</p>
//                 <p><strong>Phone:</strong> {application.user.phoneNumber}</p>
//                 <p><strong>Status:</strong> {application.status}</p>
//                 <p><strong>Applied On:</strong> {formatDate(application.appliedAt)}</p>
//               </div>
//             ))
//           ) : (
//             <p>No applications for this job.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Application;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import './Application.css';

const Application = () => {
  const [applications, setApplications] = useState([]); // To store all the application details
  const [companyId, setCompanyId] = useState(''); // To store the company ID
  const [jobDetails, setJobDetails] = useState(null); // To store job details (title, description, etc.)
  const [token, setToken] = useState(''); // To store auth token
  const { jobId } = useParams(); // Extract jobId from the URL

  // Fetch the companies the user can post jobs for and set the companyId
  useEffect(() => {
    const authToken = localStorage.getItem('token');
    setToken(authToken);

    if (authToken) {
      axios
        .get('http://localhost:7000/jobposts/companies-user-can-post-jobs-for', {
          headers: {
            Authorization: ` ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data.companies.length > 0) {
            const company = response.data.companies[0]; // Assuming the first company
            setCompanyId(company.id); // Set the companyId
          }
        })
        .catch((error) => {
          console.error('Error fetching companies:', error);
        });
    }
  }, []);

  // Fetch job details based on jobId
  useEffect(() => {
    if (jobId && companyId && token) {
      axios
        .get(`http://localhost:7000/jobposts/post-by-id/${jobId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setJobDetails(response.data); // Set job details like title, description
        })
        .catch((error) => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [jobId, companyId, token]);

  useEffect(() => {
    if (companyId && jobId && token) {
      axios
        .get(
          `http://localhost:7000/application/company-applications?companyId=${companyId}&jobPostingId=${jobId}`,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            response.data.forEach((application) => {
              if (application) {
                axios
                  .get(
                    `http://localhost:7000/application/application/${companyId}/${application}`,
                    {
                      headers: {
                        Authorization: ` ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    setApplications((prevApplications) => [
                      ...prevApplications,
                      res.data,
                    ]);
                  })
                  .catch((error) => {
                    console.error('Error fetching individual application:', error);
                  });
              }
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching application IDs:', error);
        });
    }
  }, [companyId, jobId, token]);

  // Format date for display
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
  };

  // Handle status change
  const handleStatusChange = (applicationId, newStatus) => {
    axios
      .patch(
        'http://localhost:7000/application/change-status',
        {
          applicationId,
          newStatus,
        },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      )
      .then((response) => {
        alert('Application status updated successfully!');
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.id === applicationId
              ? { ...application, status: newStatus }
              : application
          )
        );
      })
      .catch((error) => {
        console.error('Error changing status:', error);
        alert('Failed to update the status.');
      });
  };

  return (
    <div className="job-analytics-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="analytics-content">
          {jobDetails ? (
            <>
              <h1>Application Analytics for Job: {jobDetails.title}</h1>
            </>
          ) : (
            <p>Loading job details...</p>
          )}

          {applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.id} className="application-card">
                <h3>Applicant: {application.user.fullName}</h3>
                <p>
                  <strong>Email:</strong> {application.user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {application.user.phoneNumber}
                </p>
                <p>
                  <strong>Status:</strong> {application.status}
                </p>
                {/* Properly display the "Applied On" date */}
                {application.appliedAt ? (
                  <p>
                    <strong>Applied On:</strong> {formatDate(application.appliedAt)}
                  </p>
                ) : (
                  <p>
                    <strong>Applied On:</strong> N/A
                  </p>
                )}

                {/* Display Download Resume Link */}
                <a href={application.resume} download>
                  Download Resume
                </a>

                {/* Application Status Change */}
                <div>
                  <button
                    className="status-change-btn"
                    onClick={() => handleStatusChange(application.id, 'Shortlisted')}
                  >
                    Mark as Shortlisted
                  </button>
                  <button
                    className="status-change-btn"
                    onClick={() => handleStatusChange(application.id, 'Accepted')}
                  >
                    Mark as Accepted
                  </button>
                  <button
                    className="status-change-btn"
                    onClick={() => handleStatusChange(application.id, 'Rejected')}
                  >
                    Mark as Rejected
                  </button>
                </div>

                {/* Display Interview Details */}
                {application.interviewDetails && (
                  <div>
                    <p>
                      <strong>Interview Scheduled:</strong>
                    </p>
                    <p>Date & Time: {application.interviewDetails.date}</p>
                    <p>Type: {application.interviewDetails.type}</p>
                    {application.interviewDetails.type === 'Online' && (
                      <p>Meeting Link: {application.interviewDetails.meetingLink}</p>
                    )}
                    {application.interviewDetails.type === 'Physical' && (
                      <p>Address: {application.interviewDetails.address}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No applications for this job.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
