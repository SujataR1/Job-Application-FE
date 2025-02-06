// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import EmployerNavbar from '../Navbar/Navbar';
// import EmployerSidebar from '../Sidebar/Sidebar';
// import './Application.css';

// const Application = () => {
//   const [applications, setApplications] = useState([]);
//   const [companyId, setCompanyId] = useState('');
//   const [jobDetails, setJobDetails] = useState(null);
//   const [token, setToken] = useState('');
//   const { jobId } = useParams(); // Extract jobId from the URL

//   // Fetch job details based on jobId and extract companyId
//   useEffect(() => {
//     const authToken = localStorage.getItem('token');
//     setToken(authToken);

//     if (authToken && jobId) {
//       // First, fetch the job details
//       axios
//         .get(`http://localhost:7000/jobposts/post-by-id/${jobId}`, {
//           headers: {
//             Authorization: ` ${authToken}`,
//           },
//         })
//         .then((response) => {
//           setJobDetails(response.data); // Set job details like title, description
//           setCompanyId(response.data.companyId); // Extract companyId from the response
//         })
//         .catch((error) => {
//           console.error('Error fetching job details:', error);
//         });
//     }
//   }, [jobId]);

//   // Fetch application IDs for the specific company and job posting
//   useEffect(() => {
//     if (companyId && jobId && token) {
//       axios
//         .get(
//           `http://localhost:7000/application/company-applications/company/${companyId}/jobPost/${jobId}`,
//           {
//             headers: {
//               Authorization: ` ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           console.log('Applications fetched:', response.data);

//           const applicationIds = response.data;

//           if (applicationIds && applicationIds.length > 0) {
//             applicationIds.forEach((applicationId) => {
//               axios
//                 .get(
//                   `http://localhost:7000/application/get-application/${companyId}/${applicationId}`,
//                   {
//                     headers: {
//                       Authorization: ` ${token}`,
//                     },
//                   }
//                 )
//                 .then((res) => {
//                   setApplications((prevApplications) => [
//                     ...prevApplications,
//                     res.data,
//                   ]);
//                 })
//                 .catch((error) => {
//                   console.error('Error fetching individual application:', error);
//                 });
//             });
//           } else {
//             console.log('No applications found for this job.');
//           }
//         })
//         .catch((error) => {
//           if (error.response) {
//             console.error('Error fetching application IDs:', error.response.data);
//             if (error.response.status === 403) {
//               alert('You do not have permission to access these applications.');
//             }
//           } else {
//             console.error('Error fetching application IDs:', error);
//           }
//         });
//     }
//   }, [companyId, jobId, token]);

//   // Format date for display
//   const formatDate = (date) => {
//     const formattedDate = new Date(date);
//     return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
//   };

//   // Handle status change
//   const handleStatusChange = (applicationId, newStatus) => {
//     axios
//       .patch(
//         'http://localhost:7000/application/change-status',
//         {
//           applicationId,
//           newStatus,
//         },
//         {
//           headers: {
//             Authorization: ` ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         alert('Application status updated successfully!');
//         setApplications((prevApplications) =>
//           prevApplications.map((application) =>
//             application.id === applicationId
//               ? { ...application, status: newStatus }
//               : application
//           )
//         );
//       })
//       .catch((error) => {
//         console.error('Error changing status:', error);
//         alert('Failed to update the status.');
//       });
//   };

//   return (
//     <div className="job-analytics-page">
//       <EmployerNavbar />
//       <div className="home-content flex flex-row">
//         <EmployerSidebar />
//         <div className="analytics-content">
//           {jobDetails ? (
//             <h1>Application Analytics for Job: {jobDetails.title}</h1>
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
//                 {application.appliedAt ? (
//                   <p><strong>Applied On:</strong> {formatDate(application.appliedAt)}</p>
//                 ) : (
//                   <p><strong>Applied On:</strong> N/A</p>
//                 )}

//                 <a href={application.resume} download>Download Attachments</a>

//                 <div>
                  
//                   <button
//                     className="status-change-btn"
//                     onClick={() => handleStatusChange(application.id, 'Accepted')}
//                   >
//                     Mark as Accepted
//                   </button>
//                   <button
//                     className="status-change-btn"
//                     onClick={() => handleStatusChange(application.id, 'Rejected')}
//                   >
//                     Mark as Rejected
//                   </button>
//                 </div>

//                 {application.interviewDetails && (
//                   <div>
//                     <p><strong>Interview Scheduled:</strong></p>
//                     <p>Date & Time: {application.interviewDetails.date}</p>
//                     <p>Type: {application.interviewDetails.type}</p>
//                     {application.interviewDetails.type === 'Online' && (
//                       <p>Meeting Link: {application.interviewDetails.meetingLink}</p>
//                     )}
//                     {application.interviewDetails.type === 'Physical' && (
//                       <p>Address: {application.interviewDetails.address}</p>
//                     )}
//                   </div>
//                 )}
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import EmployerNavbar from '../Navbar/Navbar';
// import EmployerSidebar from '../Sidebar/Sidebar';
// import './Application.css';

// const Application = () => {
//   const [applications, setApplications] = useState([]);
//   const [companyId, setCompanyId] = useState('');
//   const [jobDetails, setJobDetails] = useState(null);
//   const [token, setToken] = useState('');
//   const { jobId } = useParams(); // Extract jobId from the URL

//   // Fetch job details based on jobId and extract companyId
//   useEffect(() => {
//     const authToken = localStorage.getItem('token');
//     setToken(authToken);

//     if (authToken && jobId) {
//       axios
//         .get(`http://localhost:7000/jobposts/post-by-id/${jobId}`, {
//           headers: {
//             Authorization: ` ${authToken}`,
//           },
//         })
//         .then((response) => {
//           setJobDetails(response.data);
//           setCompanyId(response.data.companyId); // Extract companyId from the response
//         })
//         .catch((error) => {
//           console.error('Error fetching job details:', error);
//         });
//     }
//   }, [jobId]);

//   // Fetch application IDs for the specific company and job posting
//   useEffect(() => {
//     if (companyId && jobId && token) {
//       axios
//         .get(
//           `http://localhost:7000/application/company-applications/company/${companyId}/jobPost/${jobId}`,
//           {
//             headers: {
//               Authorization: ` ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           console.log('Applications fetched:', response.data);

//           const applicationIds = response.data;

//           if (applicationIds && applicationIds.length > 0) {
//             applicationIds.forEach((applicationId) => {
//               axios
//                 .get(
//                   `http://localhost:7000/application/get-application/${companyId}/${applicationId}`,
//                   {
//                     headers: {
//                       Authorization: ` ${token}`,
//                     },
//                   }
//                 )
//                 .then((res) => {
//                   setApplications((prevApplications) => [
//                     ...prevApplications,
//                     res.data,
//                   ]);
//                 })
//                 .catch((error) => {
//                   console.error('Error fetching individual application:', error);
//                 });
//             });
//           } else {
//             console.log('No applications found for this job.');
//           }
//         })
//         .catch((error) => {
//           if (error.response) {
//             console.error('Error fetching application IDs:', error.response.data);
//             if (error.response.status === 403) {
//               alert('You do not have permission to access these applications.');
//             }
//           } else {
//             console.error('Error fetching application IDs:', error);
//           }
//         });
//     }
//   }, [companyId, jobId, token]);

//   // Format date for display
//   const formatDate = (date) => {
//     const formattedDate = new Date(date);
//     return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
//   };

//   // Handle status change
//   const handleStatusChange = (applicationId, newStatus) => {
//     axios
//       .patch(
//         'http://localhost:7000/application/change-status',
//         {
//           applicationId,
//           newStatus,
//         },
//         {
//           headers: {
//             Authorization: ` ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         alert('Application status updated successfully!');
//         setApplications((prevApplications) =>
//           prevApplications.map((application) =>
//             application.id === applicationId
//               ? { ...application, status: newStatus }
//               : application
//           )
//         );
//       })
//       .catch((error) => {
//         console.error('Error changing status:', error);
//         alert('Failed to update the status.');
//       });
//   };

//   // Post custom assessment
//   const handleCustomAssessment = (applicationId) => {
//     const formData = new FormData();
//     formData.append('jobPostingId', jobId);
//     formData.append('instructions', 'Assessment instructions here');
//     // Add your attachment here (e.g., from an input field)
//     // formData.append('attachments', selectedAttachment);

//     axios
//       .post('http://localhost:7000/application/assessments/post', formData, {
//         headers: {
//           'Authorization': ` ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then((response) => {
//         console.log('Assessment posted:', response.data);
//         // Update status to "UnderCustomAssessment"
//         handleStatusChange(applicationId, 'UnderCustomAssessment');
//       })
//       .catch((error) => {
//         console.error('Error posting custom assessment:', error);
//         alert('Failed to post custom assessment.');
//       });
//   };

//   // Schedule interview
//   const handleScheduleInterview = (applicationId) => {
//     const interviewData = {
//       jobPostingId: jobId,
//       date: '2025-02-15T10:00:00Z', // Example date
//       type: 'Online', // or 'Physical'
//       meetingLink: 'https://example.com/meeting-link', // For online interviews
//       address: '123 Address St, City', // For physical interviews
//     };

//     axios
//       .post('http://localhost:7000/application/interviews/schedule', interviewData, {
//         headers: {
//           'Authorization': ` ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log('Interview scheduled:', response.data);
//         // Update status to "InterviewScheduled"
//         handleStatusChange(applicationId, 'InterviewScheduled');
//       })
//       .catch((error) => {
//         console.error('Error scheduling interview:', error);
//         alert('Failed to schedule interview.');
//       });
//   };

//   return (
//     <div className="job-analytics-page">
//       <EmployerNavbar />
//       <div className="home-content flex flex-row">
//         <EmployerSidebar />
//         <div className="analytics-content">
//           {jobDetails ? (
//             <h1>Application Analytics for Job: {jobDetails.title}</h1>
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
//                 {application.appliedAt ? (
//                   <p><strong>Applied On:</strong> {formatDate(application.appliedAt)}</p>
//                 ) : (
//                   <p><strong>Applied On:</strong> N/A</p>
//                 )}

//                 <a href={application.resume} download>Download Attachments</a>

//                 <div>
//                   <button
//                     className="status-change-btn"
//                     onClick={() => handleStatusChange(application.id, 'Accepted')}
//                   >
//                     Mark as Accepted
//                   </button>
//                   <button
//                     className="status-change-btn"
//                     onClick={() => handleStatusChange(application.id, 'Rejected')}
//                   >
//                     Mark as Rejected
//                   </button>
//                 </div>

//                 {/* Show buttons for Accepted status */}
//                 {application.status === 'Accepted' && (
//                   <div>
//                     <button
//                       className="status-change-btn"
//                       onClick={() => handleCustomAssessment(application.id)}
//                     >
//                       Post Custom Assessment
//                     </button>
//                     <button
//                       className="status-change-btn"
//                       onClick={() => handleScheduleInterview(application.id)}
//                     >
//                       Schedule Interview
//                     </button>
//                   </div>
//                 )}

//                 {application.interviewDetails && (
//                   <div>
//                     <p><strong>Interview Scheduled:</strong></p>
//                     <p>Date & Time: {application.interviewDetails.date}</p>
//                     <p>Type: {application.interviewDetails.type}</p>
//                     {application.interviewDetails.type === 'Online' && (
//                       <p>Meeting Link: {application.interviewDetails.meetingLink}</p>
//                     )}
//                     {application.interviewDetails.type === 'Physical' && (
//                       <p>Address: {application.interviewDetails.address}</p>
//                     )}
//                   </div>
//                 )}
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
  const [applications, setApplications] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [token, setToken] = useState('');
  const { jobId } = useParams(); // Extract jobId from the URL

  // Modal States
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [currentApplicationId, setCurrentApplicationId] = useState(null);

  // Assessment and Interview States
  const [assessmentInstructions, setAssessmentInstructions] = useState('');
  const [selectedAssessmentAttachment, setSelectedAssessmentAttachment] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewType, setInterviewType] = useState('Online');
  const [interviewLocation, setInterviewLocation] = useState('');

  // Fetch job details based on jobId and extract companyId
  useEffect(() => {
    const authToken = localStorage.getItem('token');
    setToken(authToken);

    if (authToken && jobId) {
      axios
        .get(`http://localhost:7000/jobposts/post-by-id/${jobId}`, {
          headers: {
            Authorization: ` ${authToken}`,
          },
        })
        .then((response) => {
          setJobDetails(response.data);
          setCompanyId(response.data.companyId); // Extract companyId from the response
        })
        .catch((error) => {
          console.error('Error fetching job details:', error);
        });
    }
  }, [jobId]);

  // Fetch application IDs for the specific company and job posting
  useEffect(() => {
    if (companyId && jobId && token) {
      axios
        .get(
          `http://localhost:7000/application/company-applications/company/${companyId}/jobPost/${jobId}`,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        )
        .then((response) => {
          console.log('Applications fetched:', response.data);
          const applicationIds = response.data;

          if (applicationIds && applicationIds.length > 0) {
            applicationIds.forEach((applicationId) => {
              axios
                .get(
                  `http://localhost:7000/application/get-application/${companyId}/${applicationId}`,
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
            });
          } else {
            console.log('No applications found for this job.');
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

  // Post custom assessment
  const handleCustomAssessment = () => {
    const formData = new FormData();
    formData.append('jobPostingId', jobId);
    formData.append('instructions', assessmentInstructions);
    if (selectedAssessmentAttachment) {
      formData.append('attachments', selectedAssessmentAttachment);
    }

    axios
      .post('http://localhost:7000/application/assessments/post', formData, {
        headers: {
          'Authorization': ` ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Assessment posted:', response.data);
        handleStatusChange(currentApplicationId, 'UnderCustomAssessment');
        setIsAssessmentModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error posting custom assessment:', error);
        alert('Failed to post custom assessment.');
      });
  };

  // Schedule interview
  const handleScheduleInterview = () => {
    const interviewData = {
      jobPostingId: jobId,
      scheduledAt: interviewDate,
      mode: interviewType,
      location: interviewType === 'Offline' ? interviewLocation : undefined,
    };

    axios
      .post('http://localhost:7000/application/interviews/schedule', interviewData, {
        headers: {
          'Authorization': ` ${token}`,
        },
      })
      .then((response) => {
        console.log('Interview scheduled:', response.data);
        handleStatusChange(currentApplicationId, 'InterviewScheduled');
        setIsInterviewModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error scheduling interview:', error);
        alert('Failed to schedule interview.');
      });
  };

  return (
    <div className="job-analytics-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="analytics-content">
          {jobDetails ? (
            <h1>Application Analytics for Job: {jobDetails.title}</h1>
          ) : (
            <p>Loading job details...</p>
          )}

          {applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.id} className="application-card">
                <h3>Applicant: {application.user.fullName}</h3>
                <p><strong>Email:</strong> {application.user.email}</p>
                <p><strong>Phone:</strong> {application.user.phoneNumber}</p>
                <p><strong>Status:</strong> {application.status}</p>
                {application.appliedAt ? (
                  <p><strong>Applied On:</strong> {formatDate(application.appliedAt)}</p>
                ) : (
                  <p><strong>Applied On:</strong> N/A</p>
                )}

                <a href={application.resume} download>Download Attachments</a>

                <div>
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

                {/* Show buttons for Accepted status */}
                {application.status === 'Accepted' && (
                  <div>
                    <button
                      className="status-change-btn"
                      onClick={() => {
                        setCurrentApplicationId(application.id);
                        setIsAssessmentModalOpen(true);
                      }}
                    >
                      Post Custom Assessment
                    </button>
                    <button
                      className="status-change-btn"
                      onClick={() => {
                        setCurrentApplicationId(application.id);
                        setIsInterviewModalOpen(true);
                      }}
                    >
                      Schedule Interview
                    </button>
                  </div>
                )}

                {application.interviewDetails && (
                  <div>
                    <p><strong>Interview Scheduled:</strong></p>
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

      {/* Modal for Custom Assessment */}
      {isAssessmentModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Post Custom Assessment</h2>
            <textarea
              placeholder="Enter instructions"
              value={assessmentInstructions}
              onChange={(e) => setAssessmentInstructions(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setSelectedAssessmentAttachment(e.target.files[0])}
            />
            <button onClick={handleCustomAssessment}>Post Assessment</button>
            <button onClick={() => setIsAssessmentModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Interview Schedule */}
      {isInterviewModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Schedule Interview</h2>
            <input
              type="datetime-local"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {interviewType === 'Offline' && (
              <input
                type="text"
                placeholder="Enter interview location"
                value={interviewLocation}
                onChange={(e) => setInterviewLocation(e.target.value)}
              />
            )}
            <button onClick={handleScheduleInterview}>Schedule Interview</button>
            <button onClick={() => setIsInterviewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
