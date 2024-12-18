import React, { useState } from 'react';
import './JobPosting.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const JobPost = ({ job, onSave }) => {
  const [step, setStep] = useState(1); // Track current step of the form

  // State variables for each step
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
  });
  const [educationLevel, setEducationLevel] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  const navigate = useNavigate();

  // Step navigation functions
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = {
      jobTitle,
      address,
      jobType,
      shift,
      numPeople,
      startDate,
      benefits,
      skills,
      payRange,
      supplementalPay,
      description,
      communicationEmails,
      applicationPrefs,
      educationLevel,
      yearsExperience,
    };
    onSave(updatedJob);
    navigate('/jobposted');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3>Job Title</h3>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
                required
              />
            </div>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 2:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 3:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 4:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 5:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 6:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 7:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 8:
        return (
          <div>
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
                >
                  + Add Email
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Send Individual Emails for Each Application</label>
              <input type="checkbox" />
            </div>
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 9:
        return (
          <div>
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
            
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        );
      case 10:
        return (
          <div>
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
            <button type="button" onClick={handlePreviousStep}>Back</button>
            <button type="submit">Post Job</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-page">
      <EmployerNavbar />
      <div className="home-content flex flex-row">
        <EmployerSidebar />
        <div className="home-content flex flex-row">
          <EmployerSidebar />
          <div className="button-container">
            <button
              className="nav-button"
              onClick={() => navigate('/jobposting')}
            >
              Post Job
            </button>
            <button
              className="nav-button"
              onClick={() => navigate('/application')}
            >
              View Previous Posts
            </button>
          </div>

          <div className="job-post-container">
            <h2 className="header">{job ? 'Edit Job' : 'Post a New Job'}</h2>
            <form className="job-post-form" onSubmit={handleSubmit}>
              {renderStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
