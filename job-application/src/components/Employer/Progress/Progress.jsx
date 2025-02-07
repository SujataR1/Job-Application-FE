import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const HiringProcessPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [actionType, setActionType] = useState('');
  const [assessmentInstructions, setAssessmentInstructions] = useState('');
  const [selectedAssessmentAttachment, setSelectedAssessmentAttachment] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const token = localStorage.getItem('token');

  // Fetch companies when the component mounts
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:7000/jobposts/companies-user-can-post-jobs-for', {
          headers: { Authorization: ` ${token}` },
        })
        .then((response) => {
          setCompanies(response.data.companies || []);
        })
        .catch((error) => console.error('Error fetching companies:', error));
    }
  }, [token]);

  useEffect(() => {
    if (selectedCompany) {
      setLoading(true);
      const apiUrl = `http://localhost:7000/application/status-for-company/${selectedCompany}?limit=1-10&status=${status}`;

      const fetchApplicants = async () => {
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: ` ${token}`,
            },
          });

          const data = await response.json();
          if (Array.isArray(data.applications)) {
            setApplicants(data.applications);
          }
        } catch (error) {
          console.error('Error fetching applicants:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicants();
    }
  }, [selectedCompany, status, token]);

  const handleStatusChange = async (applicantId, newStatus) => {
    const response = await fetch('http://localhost:7000/application/change-status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ applicationId: applicantId, newStatus }),
    });

    if (response.ok) {
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
        )
      );
    }
  };

  const openModal = (applicant, action) => {
    setSelectedApplicant(applicant);
    setActionType(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedApplicant(null);
    setActionType('');
  };

  const handleModalAction = async () => {
    if (actionType === 'Schedule Interview') {
      handleStatusChange(selectedApplicant.id, 'InterviewScheduled');
    } else if (actionType === 'Reject') {
      handleStatusChange(selectedApplicant.id, 'Rejected');
    } else if (actionType === 'Custom Assessment') {
      handleStatusChange(selectedApplicant.id, 'UnderCustomAssessment');
    }
    closeModal();
  };

  const handleCustomAssessment = () => {
    const formData = new FormData();
    formData.append('applicantId', selectedApplicant.id);
    formData.append('instructions', assessmentInstructions);

    if (selectedAssessmentAttachment) {
      formData.append('attachments', selectedAssessmentAttachment);
    }

    axios
      .post(`http://localhost:7000/application/assessments/post/${selectedApplicant.id}`, formData, {
        headers: {
          Authorization: ` ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        handleStatusChange(selectedApplicant.id, 'UnderCustomAssessment');
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Error posting custom assessment:', error);
        alert('Failed to post custom assessment.');
      });
  };

  const handleScheduleInterview = () => {
    const interviewData = {
      applicationId: selectedApplicant.id,
      scheduledAt: interviewDate,
      location: interviewLocation,
    };

    axios
      .post(`http://localhost:7000/application/interviews/schedule/${selectedApplicant.id}`, interviewData, {
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then(() => {
        handleStatusChange(selectedApplicant.id, 'InterviewScheduled');
        setModalOpen(false);
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
        <main className="flex-1 p-24 ml-64">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Hiring Process</h1>

          {/* Select Company Dropdown */}
          <div className="mb-8">
            <label htmlFor="company" className="block text-lg font-semibold text-gray-700 mb-2">
              Select Company
            </label>
            <select
              id="company"
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm"
            >
              <option value="">Select a Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Status Dropdown */}
          <div className="mb-8">
            <label htmlFor="status" className="block text-lg font-semibold text-gray-700 mb-2">
              Select Status
            </label>
            <select
              id="status"
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="UnderCustomAssessment">Under Custom Assessment</option>
              <option value="InterviewScheduled">Interview Scheduled</option>
              <option value="InterviewCompleted">Interview Completed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="OfferExtended">Offer Extended</option>
              <option value="BackgroundCheck">Background Check</option>
              <option value="OnHold">On Hold</option>
              <option value="ApprovedForHire">Approved For Hire</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          {/* Applicants List */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Applicants</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{applicant.user.fullName}</h3>
                    <p className="text-sm text-gray-500 mb-1">Status: {applicant.status}</p>
                    <p className="text-sm text-gray-500 mb-3">Job Title: {applicant.jobPosting.title}</p>
                    <p className="text-sm text-gray-500 mb-3">Email: {applicant.user.email}</p>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      {applicant.status === 'Pending' && (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => openModal(applicant, 'Custom Assessment')}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                          >
                            Custom Assessment
                          </button>
                          <button
                            onClick={() => openModal(applicant, 'Reject')}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {applicant.status === 'UnderCustomAssessment' && (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => openModal(applicant, 'Schedule Interview')}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                          >
                            Schedule Interview
                          </button>
                          <button
                            onClick={() => openModal(applicant, 'Reject')}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">{actionType}</h3>
            <div className="flex space-x-4">
              {actionType === 'Custom Assessment' && (
                <>
                  <textarea
                    placeholder="Assessment Instructions"
                    value={assessmentInstructions}
                    onChange={(e) => setAssessmentInstructions(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  ></textarea>
                  <input
                    type="file"
                    onChange={(e) => setSelectedAssessmentAttachment(e.target.files[0])}
                    className="w-full mb-4"
                  />
                  <button
                    onClick={handleCustomAssessment}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                  >
                    Submit Custom Assessment
                  </button>
                </>
              )}
              {actionType === 'Schedule Interview' && (
                <>
                  <input
                    type="datetime-local"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Interview Location"
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleScheduleInterview}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                  >
                    Schedule Interview
                  </button>
                </>
              )}
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringProcessPage;
