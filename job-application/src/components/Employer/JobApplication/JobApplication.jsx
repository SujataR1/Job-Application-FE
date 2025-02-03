import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import './JobApplication.css';

const JobApplicationPage = () => {
  const [jobsByCompany, setJobsByCompany] = useState([]);
  const [userPostedJobs, setUserPostedJobs] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [token, setToken] = useState('');
  const [editingJobId, setEditingJobId] = useState(null); // Track which job is being edited
  const [editedJobData, setEditedJobData] = useState({});
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
      requirements:job.requirements,
      address: job.address || { street: '', city: '', zip: '' }, // Handle address object
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is an address property, update the address object
    if (name.startsWith('address')) {
      setEditedJobData({
        ...editedJobData,
        address: {
          ...editedJobData.address,
          [name.replace('address', '').toLowerCase()]: value, // Dynamically update street, city, or zip
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
      locations: editedJobData.locations.split(',').map((loc) => loc.trim()), // Ensure locations are an array
      skills: editedJobData.skills.split(',').map((skill) => skill.trim()), // Ensure skills are an array
    };

    // Send the updated job data including the address as an object
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
    <div className="home-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="job-application-page" style={{ width: '80%' }}>
          <h1>My Job Postings</h1>

          <div>
            <label htmlFor="company">Select Company:</label>
            <select
              id="company"
              name="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              required
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

          {jobsByCompany.length > 0 ? (
            <>
              <h2>Jobs for Selected Company</h2>
              {jobsByCompany.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p><strong>Summary:</strong> {job.summary}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Location:</strong> {job.locations.join(', ')}</p>
                  <p><strong>Address:</strong> {job.address ? `${job.address.street}, ${job.address.city}, ${job.address.zip}` : 'Address not available'}</p>

                  <p><strong>Requirements:</strong>{job.requirements}</p>
                  <p><strong>Skills Required:</strong> {job.skills.join(', ')}</p>
                  <p><strong>Experience:</strong> {`${job.min_experience} to ${job.max_experience} years`}</p>
                  <p><strong>Salary:</strong> ${job.min_salary} - ${job.max_salary}</p>
                  <p><strong>Posted:</strong> {formatDate(job.createdAt)}</p>
                  <p><strong>Status:</strong> {job.status}</p>

                  <div className="job-actions">
                    <button onClick={() => handleViewApplicants(job.id)} className="action-button">
                      View Applicants
                    </button>

                    <button onClick={() => handleEditJob(job.id)} className="action-button" style={{ marginLeft: '10px' }}>
                      Edit Job
                    </button>

                    {job.status !== 'Closed' && (
                      <button onClick={() => handleCloseJob(job.id)} className="action-button" style={{ marginLeft: '10px' }}>
                        Close Job
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No jobs posted yet for the selected company.</p>
          )}

          {editingJobId && (
            <div className="edit-job-form">
              <h3>Edit Job Details</h3>
              <form>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={editedJobData.title}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Summary:
                  <input
                    type="text"
                    name="summary"
                    value={editedJobData.summary}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={editedJobData.description}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Locations (comma-separated):
                  <input
                    type="text"
                    name="locations"
                    value={editedJobData.locations}
                    onChange={handleChange}
                  />
                </label>
                {/* Address Fields */}
                <label>
                  Street:
                  <input
                    type="text"
                    name="addressStreet"
                    value={editedJobData.address?.street || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  City:
                  <input
                    type="text"
                    name="addressCity"
                    value={editedJobData.address?.city || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Zip Code:
                  <input
                    type="text"
                    name="addressZip"
                    value={editedJobData.address?.zip || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Requirements:
                  <input
                    type="text"
                    name="requirements"
                    value={editedJobData.requirements || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Skills (comma-separated):
                  <input
                    type="text"
                    name="skills"
                    value={editedJobData.skills}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Min Experience:
                  <input
                    type="number"
                    name="min_experience"
                    value={editedJobData.min_experience}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Max Experience:
                  <input
                    type="number"
                    name="max_experience"
                    value={editedJobData.max_experience}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Min Salary:
                  <input
                    type="number"
                    name="min_salary"
                    value={editedJobData.min_salary}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Max Salary:
                  <input
                    type="number"
                    name="max_salary"
                    value={editedJobData.max_salary}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleSaveEditedJob}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {Object.keys(userPostedJobs).length > 0 && (
            <>
              <h2>Your Posted Jobs</h2>
              {Object.entries(userPostedJobs).map(([companyId, companyData]) => (
                <div key={companyId}>
                  <h3>{companyData.companyName}</h3>
                  {companyData.jobs.map((job) => (
                    <div key={job.jobId} className="job-card">
                      <h4>{job.title}</h4>
                      <p><strong>Posted On:</strong> {formatDate(job.postedAt)}</p>

                      <button onClick={() => handleDeleteJob(job.jobId)} className="action-button" style={{ marginLeft: '10px' }}>
                        Delete Job
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
