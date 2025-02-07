import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const JobApplicationPage = () => {
  const [jobsByCompany, setJobsByCompany] = useState([]);
  const [userPostedJobs, setUserPostedJobs] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [token, setToken] = useState('');
  const [editingJobId, setEditingJobId] = useState(null); // Track which job is being edited
  const [editedJobData, setEditedJobData] = useState({});
  const [recruiterTimeline, setRecruiterTimeline] = useState([]);

  const navigate = useNavigate();

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
          setCompanies(response.data.companies || []);
        })
        .catch((error) => console.error('Error fetching companies:', error));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:7000/jobposts/user-posted-jobs/?limit=1-12&companySwitch=false', {
          headers: {
            Authorization: ` ${token}`,
          },
        })
        .then((response) => {
          if (response.data.message === 'Jobs posted by user retrieved successfully.') {
            setUserPostedJobs(response.data.jobs || {});
          }
        })
        .catch((error) => console.error('Error fetching jobs:', error));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:7000/application/timeline/by-recruiter?limit=1-7', {
          headers: { Authorization: ` ${token}` },
        })
        .then((response) => {
          setRecruiterTimeline(response.data.timeline || []);
        })
        .catch((error) => {
          console.error('Error fetching recruiter timeline:', error);
        });
    }
  }, [token]);

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
          setJobsByCompany(response.data || []);
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
          setJobsByCompany([]);
        });
    }
  }, [selectedCompany, token]);

  const formatDate = (postedDate) => {
    const date = new Date(postedDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/job-analytics/${jobId}`);
  };

  // Edit job form handling
  const handleEditJob = (jobId) => {
    const job = jobsByCompany.find((job) => job.id === jobId);
    setEditingJobId(jobId);
    setEditedJobData({
      title: job.title,
      summary: job.summary,
      description: job.description,
      locations: job.locations.join(', '),
      skills: job.skills.join(', '),
      min_experience: job.min_experience,
      max_experience: job.max_experience,
      min_salary: job.min_salary,
      max_salary: job.max_salary,
      status: job.status,
      requirements: job.requirements,
      address: job.address || { street: '', city: '', zip: '' },
      tags: job.JobPostingsTags.map((tag) => tag.tagId).join(', '),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is for an address property, update the address object
    if (name.startsWith('address')) {
      setEditedJobData({
        ...editedJobData,
        address: {
          ...editedJobData.address,
          [name.replace('address', '').toLowerCase()]: value,
        },
      });
    } else {
      setEditedJobData({
        ...editedJobData,
        [name]: value,
      });
    }
  };

  const handleSaveEditedJob = () => {
    const updatedJobData = {
      ...editedJobData,
      locations: editedJobData.locations.split(',').map((loc) => loc.trim()),
      skills: editedJobData.skills.split(',').map((skill) => skill.trim()),
      requirements:
        typeof editedJobData.requirements === 'string'
          ? editedJobData.requirements.split(',').map((req) => req.trim())
          : editedJobData.requirements,
      tags: editedJobData.tags.split(',').map((tag) => tag.trim()),
      address: {
        street: editedJobData.address?.street || '',
        city: editedJobData.address?.city || '',
        zip: editedJobData.address?.zip || '',
      },
    };

    axios
      .patch(`http://localhost:7000/jobposts/${editingJobId}`, updatedJobData, {
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then(() => {
        alert('Job has been successfully updated!');
        setEditingJobId(null);
        setEditedJobData({});
        // Optionally, refresh the jobs list
        navigate(`/application`);
      })
      .catch((error) => {
        console.error('Error updating job details:', error);
        alert('Failed to update job.');
      });
  };

  const handleCloseJob = (jobId) => {
    axios
      .patch(
        `http://localhost:7000/jobposts/${jobId}`,
        { status: 'Closed' },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      )
      .then(() => {
        setJobsByCompany(
          jobsByCompany.map((job) =>
            job.id === jobId ? { ...job, status: 'Closed' } : job
          )
        );
        alert('Job has been closed.');
      })
      .catch((error) => {
        console.error('Error closing job:', error);
      });
  };

  const handleDeleteJob = (jobId) => {
    axios
      .delete(`http://localhost:7000/jobposts/${jobId}`, {
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then(() => {
        const updatedJobs = Object.keys(userPostedJobs).reduce((acc, companyId) => {
          const companyJobs = userPostedJobs[companyId].jobs.filter(
            (job) => job.jobId !== jobId
          );
          if (companyJobs.length > 0) {
            acc[companyId] = { ...userPostedJobs[companyId], jobs: companyJobs };
          }
          return acc;
        }, {});
        setUserPostedJobs(updatedJobs);
        alert('Job has been deleted.');
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
      });
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
    setJobsByCompany([]); // Clear jobs when changing company
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployerNavbar />
      <div className="flex">
        <EmployerSidebar />
        {/* Added mt-20 to create extra gap below the navbar */}
        <div className="w-full md:w-4/5 mx-auto mt-20 mb-10 p-8 bg-white rounded-xl shadow-xl">
          <h1 className="text-4xl font-bold text-center mb-8">My Job Postings</h1>

          {/* Company Selector */}
          <div className="mb-10">
            <label
              htmlFor="company"
              className="block text-xl font-medium text-gray-800 mb-3"
            >
              Select Company:
            </label>
            <select
              id="company"
              name="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a company</option>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))
              ) : (
                <option disabled>No companies available</option>
              )}
            </select>
          </div>

          {/* Jobs for Selected Company */}
          {jobsByCompany.length > 0 ? (
            <>
              <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                Jobs for Selected Company
              </h2>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {jobsByCompany.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200"
                  >
                    <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                    <p className="mt-2 text-gray-600">
                      <strong>Summary:</strong> {job.summary}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Location:</strong> {job.locations.join(', ')}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Address:</strong>{' '}
                      {job.address
                        ? `${job.address.street}, ${job.address.city}, ${job.address.zip}`
                        : 'Address not available'}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Skills Required:</strong> {job.skills.join(', ')}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Experience:</strong> {`${job.min_experience} to ${job.max_experience} years`}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Salary:</strong> ${job.min_salary} - ${job.max_salary}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Posted:</strong> {formatDate(job.createdAt)}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Status:</strong> {job.status}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <strong>Tags:</strong> {job.JobPostingsTags.map((tag) => tag.tagId).join(', ')}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewApplicants(job.id)}
                        className="py-2 px-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        View Applicants
                      </button>
                      <button
                        onClick={() => handleEditJob(job.id)}
                        className="py-2 px-5 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Edit Job
                      </button>
                      {job.status !== 'Closed' && (
                        <button
                          onClick={() => handleCloseJob(job.id)}
                          className="py-2 px-5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Close Job
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xl text-gray-600 text-center my-10">
              No jobs posted yet for the selected company.
            </p>
          )}
          {/* Recruiter Timeline */}
<div className="mt-16">
  <h2 className="text-3xl font-semibold text-gray-700 mb-8">Recruiter Timeline</h2>
  {recruiterTimeline.length > 0 ? (
    <ul className="space-y-4">
      {recruiterTimeline.map((event, index) => (
        <li key={index} className="bg-white p-4 shadow-md rounded-md border border-gray-200">
          <p className="text-lg font-medium text-gray-900">{event.action}</p>
          <p className="text-sm text-gray-600">{formatDate(event.timestamp)}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xl text-gray-600 text-center my-10">No recent activity.</p>
  )}
</div>


          {/* Edit Job Form */}
          {editingJobId && (
            <div className="bg-white p-8 mt-12 border-t-4 border-indigo-500 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Edit Job Details</h3>
              <form className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col col-span-2">
                  <label className="font-medium text-gray-700">Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={editedJobData.title}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="font-medium text-gray-700">Summary:</label>
                  <input
                    type="text"
                    name="summary"
                    value={editedJobData.summary}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="font-medium text-gray-700">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={editedJobData.description}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Locations (comma-separated):</label>
                  <input
                    type="text"
                    name="locations"
                    value={editedJobData.locations}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {/* Address Fields */}
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Street:</label>
                  <input
                    type="text"
                    name="addressStreet"
                    value={editedJobData.address?.street || ''}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">City:</label>
                  <input
                    type="text"
                    name="addressCity"
                    value={editedJobData.address?.city || ''}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Zip Code:</label>
                  <input
                    type="text"
                    name="addressZip"
                    value={editedJobData.address?.zip || ''}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="font-medium text-gray-700">Requirements:</label>
                  <input
                    type="text"
                    name="requirements"
                    value={editedJobData.requirements || ''}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Tags (comma-separated):</label>
                  <input
                    type="text"
                    name="tags"
                    value={editedJobData.tags}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Skills (comma-separated):</label>
                  <input
                    type="text"
                    name="skills"
                    value={editedJobData.skills}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Min Experience:</label>
                  <input
                    type="number"
                    name="min_experience"
                    value={editedJobData.min_experience}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Max Experience:</label>
                  <input
                    type="number"
                    name="max_experience"
                    value={editedJobData.max_experience}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Min Salary:</label>
                  <input
                    type="number"
                    name="min_salary"
                    value={editedJobData.min_salary}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">Max Salary:</label>
                  <input
                    type="number"
                    name="max_salary"
                    value={editedJobData.max_salary}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveEditedJob}
                    className="py-3 px-8 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Your Posted Jobs */}
          {Object.keys(userPostedJobs).length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-gray-700 mb-8">Your Posted Jobs</h2>
              {Object.entries(userPostedJobs).map(([companyId, companyData]) => (
                <div key={companyId} className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {companyData.companyName}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {companyData.jobs.map((job) => (
                      <div
                        key={job.jobId}
                        className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200"
                      >
                        <h4 className="text-xl font-semibold text-gray-800">
                          {job.title}
                        </h4>
                        <p className="mt-2 text-gray-600">
                          <strong>Posted On:</strong> {formatDate(job.postedAt)}
                        </p>
                        <button
                          onClick={() => handleDeleteJob(job.jobId)}
                          className="mt-4 py-2 px-5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete Job
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
