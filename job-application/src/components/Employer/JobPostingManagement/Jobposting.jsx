import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import './JobPosting.css'

const JobPost = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [job, setJob] = useState({
    title: '',
    summary: '',
    description: '',
    locations: [''],
    address: {
      street: '',
      city: '',
      zip: '',
      country: ''
    },
    skills: [''],
    requirements: [''],
    min_experience: '',
    max_experience: '',
    min_salary: '',
    max_salary: '',
    companyId: '',
    tags:['']
  });
  const [token, setToken] = useState('');

  // Effect to load companies
  useEffect(() => {
    const token = localStorage.getItem('token'); // Fetch the token from localStorage
    setToken(token); // Set token state

    const limit = '1-12'; // Define the limit you want
    axios
      .post(
        'http://localhost:7000/companies/all',
        { limit },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        setCompanies(response.data); // Set companies data to state
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!job.title || typeof job.title !== 'string' || job.title.trim() === '') {
      alert('Job title is required and must be a string.');
      return;
    }
    if (isNaN(job.min_experience) || isNaN(job.max_experience)) {
      alert('Experience fields must be numbers.');
      return;
    }
    if (isNaN(job.min_salary) || isNaN(job.max_salary)) {
      alert('Salary fields must be numbers.');
      return;
    }

    // Construct the job post data and add status "Open"
    const jobPostData = {
      title: job.title,
      summary: job.summary,
      description: job.description,
      locations: job.locations,
      address: job.address,
      skills: job.skills,
      requirements: job.requirements,
      min_experience: job.min_experience,
      max_experience: job.max_experience,
      min_salary: job.min_salary,
      max_salary: job.max_salary,
      companyId: selectedCompanyId || job.companyId,
      status: "Open",
      tags:job.tags // Ensure the status is always "Open"
    };

    // Send the job post data to API
    axios
      .post('http://localhost:7000/jobposts', jobPostData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}` // Authorization token with Bearer prefix
        }
      })
      .then((response) => {
        console.log('Job posted successfully:', response.data);
        alert('Job posted successfully!');
      })
      .catch((error) => {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      });
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}
      <EmployerNavbar />

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <EmployerSidebar />
        <h2 style={{ marginBottom: '20px',marginLeft:'100px' }}>Post a New Job</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
        >
          {/* Job Title */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Job Title</label>
            <input
              type="text"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Job Summary */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Job Summary</label>
            <textarea
              value={job.summary}
              onChange={(e) => setJob({ ...job, summary: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px',
                height: '100px'
              }}
            />
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Job Description</label>
            <textarea
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px',
                height: '100px'
              }}
            />
          </div>

          {/* Job Locations */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Locations</label>
            <input
              type="text"
              value={job.locations.join(', ')}
              onChange={(e) =>
                setJob({
                  ...job,
                  locations: e.target.value.split(',').map((location) => location.trim())
                })
              }
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Job Address Fields */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Street Address</label>
              <input
                type="text"
                value={job.address.street}
                onChange={(e) =>
                  setJob({ ...job, address: { ...job.address, street: e.target.value } })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>City</label>
              <input
                type="text"
                value={job.address.city}
                onChange={(e) =>
                  setJob({ ...job, address: { ...job.address, city: e.target.value } })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Pin Code</label>
              <input
                type="text"
                value={job.address.zip}
                onChange={(e) =>
                  setJob({ ...job, address: { ...job.address, zip: e.target.value } })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Country</label>
              <input
                type="text"
                value={job.address.country}
                onChange={(e) =>
                  setJob({ ...job, address: { ...job.address, country: e.target.value } })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Job Skills */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Skills</label>
            <input
              type="text"
              value={job.skills.join(', ')}
              onChange={(e) =>
                setJob({
                  ...job,
                  skills: e.target.value.split(',').map((skill) => skill.trim())
                })
              }
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Job Requirements */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Requirements</label>
            <input
              type="text"
              value={job.requirements.join(', ')}
              onChange={(e) =>
                setJob({
                  ...job,
                  requirements: e.target.value.split(',').map((req) => req.trim())
                })
              }
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Job Experience */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Min Experience</label>
              <input
                type="number"
                value={job.min_experience}
                onChange={(e) =>
                  setJob({ ...job, min_experience: parseInt(e.target.value) })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Max Experience</label>
              <input
                type="number"
                value={job.max_experience}
                onChange={(e) =>
                  setJob({ ...job, max_experience: parseInt(e.target.value) })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Job Salary */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Min Salary</label>
              <input
                type="number"
                value={job.min_salary}
                onChange={(e) =>
                  setJob({ ...job, min_salary: parseInt(e.target.value) })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Max Salary</label>
              <input
                type="number"
                value={job.max_salary}
                onChange={(e) =>
                  setJob({ ...job, max_salary: parseInt(e.target.value) })
                }
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Company Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Company</label>
            <select
              value={selectedCompanyId || job.companyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
{/* Job Tags */}
<div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Tags</label>
            <input
              type="text"
              value={job.tags.join(', ')}
              onChange={(e) =>
                setJob({
                  ...job,
                  tags: e.target.value.split(',').map((req) => req.trim())
                })
              }
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#white',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;