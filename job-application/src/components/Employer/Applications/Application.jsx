import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [token, setToken] = useState('');
  const { jobId } = useParams();

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
            Authorization: `${authToken}`,
          },
        })
        .then((response) => {
          setJobDetails(response.data);
          setCompanyId(response.data.companyId);
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
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          const applicationIds = response.data;

          if (applicationIds && applicationIds.length > 0) {
            applicationIds.forEach((applicationId) => {
              axios
                .get(
                  `http://localhost:7000/application/get-application/${companyId}/${applicationId}`,
                  {
                    headers: {
                      Authorization: `${token}`,
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
            Authorization: `${token}`,
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
    formData.append('applicantId', currentApplicationId); // Use applicationId here
    formData.append('instructions', assessmentInstructions);

    if (selectedAssessmentAttachment) {
      formData.append('attachments', selectedAssessmentAttachment);
    }

    axios
      .post(`http://localhost:7000/application/assessments/post/${jobId}`, formData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Assessment posted:', response.data);
        handleStatusChange(currentApplicationId, 'UnderCustomAssessment');
        setIsAssessmentModalOpen(false);
      })
      .catch((error) => {
        console.error('Error posting custom assessment:', error);
        alert('Failed to post custom assessment.');
      });
  };

  // Schedule interview
  const handleScheduleInterview = () => {
    const interviewData = {
      applicationId: currentApplicationId, // Send the current applicationId dynamically in the body
      scheduledAt: interviewDate,
      mode: interviewType,
      location: interviewType === 'Offline' ? interviewLocation : undefined,
    };

    axios
      .post(`http://localhost:7000/application/interviews/schedule/${currentApplicationId}`, interviewData, {
        headers: {
          'Authorization': `${token}`,
        },
      })
      .then((response) => {
        console.log('Interview scheduled:', response.data);
        handleStatusChange(currentApplicationId, 'InterviewScheduled');
        setIsInterviewModalOpen(false);
      })
      .catch((error) => {
        console.error('Error scheduling interview:', error);
        alert('Failed to schedule interview.');
      });
};


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="flex flex-1">
        <EmployerSidebar />
        <div className="flex-1 p-24 ml-[220px]">
          {jobDetails ? (
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Application Analytics for Job: {jobDetails.title}
            </h1>
          ) : (
            <p className="text-gray-600">Loading job details...</p>
          )}

          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Applicant: {application.user.fullName}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> {application.user.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Phone:</span> {application.user.phoneNumber}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Status:</span> {application.status}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Applied On:</span> {application.appliedAt ? formatDate(application.appliedAt) : 'N/A'}
                </p>

                <a
                  href={application.resume}
                  download
                  className="text-blue-600 hover:underline block mb-4"
                >
                  Download Attachments
                </a>

                <div className="space-x-3 mb-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                    onClick={() => handleStatusChange(application.id, 'Accepted')}
                  >
                    Mark as Accepted
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                    onClick={() => handleStatusChange(application.id, 'Rejected')}
                  >
                    Mark as Rejected
                  </button>
                </div>

                {application.status === 'Accepted' && (
                  <div className="space-x-3">
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => {
                        setCurrentApplicationId(application.id);
                        setIsAssessmentModalOpen(true);
                      }}
                    >
                      Post Custom Assessment
                    </button>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => {
                        setCurrentApplicationId(application.id);
                        setIsInterviewModalOpen(true);
                      }}
                    >
                      Schedule Interview
                    </button>
                  </div>
                )}

                {application.status === 'InterviewScheduled' && (
                  <div className="space-x-3 mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => handleStatusChange(application.id, 'InterviewCompleted')}
                    >
                      Interview Completed
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => handleStatusChange(application.id, 'Rejected')}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => handleStatusChange(application.id, 'OnHold')}
                    >
                      On Hold
                    </button>
                  </div>
                )}

                {application.interviewDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="font-medium text-gray-700 mb-2">Interview Scheduled:</p>
                    <p className="text-gray-600">Date & Time: {application.interviewDetails.date}</p>
                    <p className="text-gray-600">Type: {application.interviewDetails.type}</p>
                    {application.interviewDetails.type === 'Online' && (
                      <p className="text-gray-600">Meeting Link: {application.interviewDetails.meetingLink}</p>
                    )}
                    {application.interviewDetails.type === 'Physical' && (
                      <p className="text-gray-600">Address: {application.interviewDetails.address}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-red-600 font-semibold text-lg">No applications for this job.</p>
          )}
        </div>
      </div>

      {/* Assessment Modal */}
      {isAssessmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Post Custom Assessment</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter instructions"
              value={assessmentInstructions}
              onChange={(e) => setAssessmentInstructions(e.target.value)}
            />
            <input
              type="file"
              className="mb-4"
              onChange={(e) => setSelectedAssessmentAttachment(e.target.files[0])}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                onClick={() => setIsAssessmentModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                onClick={handleCustomAssessment}
              >
                Post Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Modal */}
      {isInterviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Schedule Interview</h2>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded mb-4"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <select
              className="w-full p-2 border rounded mb-4"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {interviewType === 'Offline' && (
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter interview location"
                value={interviewLocation}
                onChange={(e) => setInterviewLocation(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                onClick={() => setIsInterviewModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                onClick={handleScheduleInterview}
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
