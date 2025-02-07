import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const EvaluationPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobPosts, setJobPosts] = useState([]); // Define the jobPosts state
  const [assessments, setAssessments] = useState([]);
  const [interviewSchedule, setInterviewSchedule] = useState(null);
  const [token] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [assessmentId, setAssessmentId] = useState(null);

  // Fetch companies available to post jobs for
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

  // Fetch job posts for the selected company
  useEffect(() => {
    if (selectedCompany && token) {
      axios
        .post(
          `http://localhost:7000/jobposts/company/${selectedCompany}`,
          { limit: '1-12' },
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        )
        .then((response) => {
          setJobPosts(response.data || []); // Update to setJobPosts instead of setJobsByCompany
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
          setJobPosts([]); // Use setJobPosts to set empty array in case of error
        });
    }
  }, [selectedCompany, token]);

  // Fetch assessments for a specific job
  const fetchAssessments = (jobId) => {
    axios
      .get(`http://localhost:7000/application/assessments/get?jobId=${jobId}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setAssessments(response.data.assessments || []);
      })
      .catch((error) => console.error('Error fetching assessments:', error));
  };

  // Fetch interview schedule for a specific application
  const fetchInterviewSchedule = (applicationId) => {
    axios
      .get(`http://localhost:7000/application/interview/applicationId/${applicationId}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setInterviewSchedule(response.data.interview || null);
      })
      .catch((error) => console.error('Error fetching interview schedule:', error));
  };

  // Handle Modal actions (Edit or Delete assessment)
  const openModal = (action, assessmentId = null) => {
    setModalAction(action);
    setAssessmentId(assessmentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setAssessmentId(null);
    setModalAction('');
  };

  const handleEditAssessment = (newAssessmentDetails) => {
    axios
      .patch(`http://localhost:7000/application/assessments/edit`, newAssessmentDetails, {
        headers: { Authorization: ` ${token}` },
      })
      .then(() => {
        closeModal();
        fetchAssessments(selectedJob.id); // Refresh assessments after edit
      })
      .catch((error) => console.error('Error editing assessment:', error));
  };

  const handleDeleteAssessment = () => {
    axios
      .delete(`http://localhost:7000/application/assessments/delete?assessmentId=${assessmentId}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then(() => {
        closeModal();
        fetchAssessments(selectedJob.id); // Refresh assessments after deletion
      })
      .catch((error) => console.error('Error deleting assessment:', error));
  };

  const handleRescheduleInterview = (newDate, newLocation) => {
    const interviewData = {
      scheduledAt: newDate,
      location: newLocation,
    };

    axios
      .post(`http://localhost:7000/application/interview/applicationId/${interviewSchedule.applicationId}`, interviewData, {
        headers: { Authorization: ` ${token}` },
      })
      .then(() => {
        fetchInterviewSchedule(interviewSchedule.applicationId); // Refresh interview schedule after reschedule
      })
      .catch((error) => console.error('Error rescheduling interview:', error));
  };

  const handleCancelInterview = () => {
    axios
      .delete(`http://localhost:7000/application/interview/applicationId/${interviewSchedule.applicationId}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then(() => {
        setInterviewSchedule(null); // Clear interview schedule after cancel
      })
      .catch((error) => console.error('Error cancelling interview:', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="flex flex-1">
        <EmployerSidebar />
        <main className="flex-1 p-24 ml-64">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Evaluation</h1>

          {/* Company Dropdown */}
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

          {/* Job Post Dropdown */}
          {selectedCompany && (
            <div className="mb-8">
              <label htmlFor="job" className="block text-lg font-semibold text-gray-700 mb-2">
                Select Job Post
              </label>
              <select
                id="job"
                onChange={(e) => {
                  setSelectedJob(e.target.value);
                  fetchAssessments(e.target.value);
                  fetchInterviewSchedule(e.target.value);
                }}
                className="w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm"
              >
                <option value="">Select a Job</option>
                {jobPosts.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Assessments Section */}
          {selectedJob && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Assessments</h2>
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{assessment.name}</h3>
                    <button
                      onClick={() => openModal('edit', assessment.id)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
                    >
                      Edit Assessment
                    </button>
                    <button
                      onClick={() => openModal('delete', assessment.id)}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
                    >
                      Delete Assessment
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interview Schedule Section */}
          {interviewSchedule && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Interview Schedule</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Scheduled Interview</h3>
                <p className="text-sm text-gray-500 mb-2">Scheduled At: {new Date(interviewSchedule.scheduledAt).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-2">Location: {interviewSchedule.location}</p>
                <p className="text-sm text-gray-500 mb-2">Mode: {interviewSchedule.mode}</p>
                <button
                  onClick={() => handleRescheduleInterview('2025-02-11T14:00:00.000Z', 'New Location')}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md mb-2"
                >
                  Reschedule Interview
                </button>
                <button
                  onClick={handleCancelInterview}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel Interview
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Modal for Edit/Delete Assessment */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">{modalAction === 'edit' ? 'Edit Assessment' : 'Delete Assessment'}</h3>
            {modalAction === 'edit' ? (
              <div>
                {/* Edit Assessment Form */}
                <textarea placeholder="Edit assessment details..." className="w-full p-2 mb-4 border border-gray-300 rounded-md"></textarea>
                <button
                  onClick={handleEditAssessment}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to delete this assessment?</p>
                <button
                  onClick={handleDeleteAssessment}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Yes, Delete
                </button>
              </div>
            )}
            <button
              onClick={closeModal}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;
