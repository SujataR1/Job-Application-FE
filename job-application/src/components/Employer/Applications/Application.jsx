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
