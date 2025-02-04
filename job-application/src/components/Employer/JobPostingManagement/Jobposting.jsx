import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import './JobPosting.css'

<<<<<<< HEAD
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
    companyId: ''
=======

const JobPost = ({ job, onSave }) => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState(job ? job.jobTitle : '');
  const [address, setAddress] = useState(job ? job.address : { street: '', city: '', pinCode: '', area: '', country: '' });
  const [jobType, setJobType] = useState(job ? job.jobType : '');
  const [shift, setShift] = useState(job ? job.shift : '');
  const [numPeople, setNumPeople] = useState(job ? job.numPeople : '');
  const [startDate, setStartDate] = useState(job ? job.startDate : '');
  const [benefits, setBenefits] = useState(job ? job.benefits : []);
  const [skills, setSkills] = useState(job ? job.skills : []);
  const [payRange, setPayRange] = useState(job ? job.payRange : { min: '', max: '', type: 'monthly' });
  const [supplementalPay, setSupplementalPay] = useState(job ? job.supplementalPay : []);
  const [description, setDescription] = useState(job ? job.description : '');
  const [communicationEmails, setCommunicationEmails] = useState(job ? job.communicationEmails : []);
  const [applicationPrefs, setApplicationPrefs] = useState({
    askForCV: 'yes',
    applicationDeadline: 'no',
>>>>>>> f50fe3efe61107659a90607521e1ee0dc91b6ce2
  });
  const [token, setToken] = useState('');

<<<<<<< HEAD
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
=======

  const navigate = useNavigate();

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);
>>>>>>> f50fe3efe61107659a90607521e1ee0dc91b6ce2

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validate form data
    if (!job.title || typeof job.title !== 'string' || job.title.trim() === '') {
      alert('Job title is required and must be a string.');
      return;
=======
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Job Title</h3>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job Title"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Job Address</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="Street Address"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group">
              <label>Pin Code</label>
              <input
                type="text"
                value={address.pinCode}
                onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                placeholder="Pin Code"
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                placeholder="Country"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Job Type & Shift</h3>
            <div className="form-group">
              <label>Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                required
              >
                <option value="day">Day Shift</option>
                <option value="morning">Morning Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of People to Hire</label>
              <input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h3>Benefits</h3>
            <div className="form-group">
              <label>Benefits</label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="List benefits (e.g., health insurance, paid time off)"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h3>Skills</h3>
            <div className="form-group">
              <label>Skills Required</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="List required skills"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step">
            <h3>Pay Range & Supplemental Pay</h3>
            <div className="form-group">
              <label>Pay Range</label>
              <input
                type="number"
                value={payRange.min}
                onChange={(e) => setPayRange({ ...payRange, min: e.target.value })}
                placeholder="Min Salary"
                required
              />
              <input
                type="number"
                value={payRange.max}
                onChange={(e) => setPayRange({ ...payRange, max: e.target.value })}
                placeholder="Max Salary"
                required
              />
            </div>
            <div className="form-group">
              <label>Pay Frequency</label>
              <select
                value={payRange.type}
                onChange={(e) => setPayRange({ ...payRange, type: e.target.value })}
                required
              >
                <option value="monthly">Per Month</option>
                <option value="yearly">Per Year</option>
              </select>
            </div>
            <div className="form-group">
              <label>Supplemental Pay</label>
              <textarea
                value={supplementalPay}
                onChange={(e) => setSupplementalPay(e.target.value)}
                placeholder="e.g., performance bonus, joining bonus"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="form-step">
            <h3>Job Description</h3>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-step">
            <h3>Communication Preferences</h3>
            <div className="form-group">
              <label>Email for Updates</label>
              <div>
                {communicationEmails.map((email, index) => (
                  <div key={index}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const updatedEmails = [...communicationEmails];
                        updatedEmails[index] = e.target.value;
                        setCommunicationEmails(updatedEmails);
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setCommunicationEmails([...communicationEmails, ''])}
                  className="btn-secondary"
                >
                  + Add Email
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Send Individual Emails for Each Application</label>
              <input type="checkbox" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="form-step">
            <h3>Application Preferences</h3>
            <div className="form-group">
              <label>Ask for CV</label>
              <select
                value={applicationPrefs.askForCV}
                onChange={(e) => setApplicationPrefs({ ...applicationPrefs, askForCV: e.target.value })}
              >
                <option value="yes">Yes, require a CV</option>
                <option value="no">No, don't ask for CV</option>
              </select>
            </div>
            <div className="form-group">
              <label>Is there an application deadline?</label>
              <select
                value={applicationPrefs.applicationDeadline}
                onChange={(e) => setApplicationPrefs({ ...applicationPrefs, applicationDeadline: e.target.value })}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Save and Continue</button>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="form-step">
            <h3>Education and Experience</h3>
            <div className="form-group">
              <label>Highest Level of Education</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="bachelor">Bachelor's</option>
                <option value="master">Master's</option>
                <option value="phd">PhD</option>
                <option value="highschool">High School</option>
              </select>
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="Years of Experience"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreviousStep}>Back</button>
              <button type="submit" className="btn-primary">Post Job</button>
            </div>
          </div>
        );
      default:
        return null;
>>>>>>> f50fe3efe61107659a90607521e1ee0dc91b6ce2
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
      status: "Open" // Ensure the status is always "Open"
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
<<<<<<< HEAD
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
=======
    <div className="job-post-page">
      <EmployerNavbar />
      <div className="job-post-content">
        <EmployerSidebar />
        <div className="main-content">
          <div className="button-container">
            <button
              className="btn-secondary"
              onClick={() => navigate('/jobposting')}
            >
              Post Job
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/application')}
            >
              View Previous Posts
            </button>
          </div>

          <div className="job-post-form-container">
            <h2 className="job-post-header">{job ? 'Edit Job' : 'Post a New Job'}</h2>
            <form onSubmit={handleSubmit}>
              {renderStep()}
            </form>
>>>>>>> f50fe3efe61107659a90607521e1ee0dc91b6ce2
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

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
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