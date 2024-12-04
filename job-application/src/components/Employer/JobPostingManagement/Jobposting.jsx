import React, { useState } from 'react';
import './JobPosting.css'; 
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar'; // Importing the CSS file
import { useNavigate } from 'react-router-dom'; 
const JobPost = ({ job, onSave }) => {
  const [title, setTitle] = useState(job ? job.title : '');
  const [description, setDescription] = useState(job ? job.description : '');
  const [salary, setSalary] = useState(job ? job.salary : '');
  const [location, setLocation] = useState(job ? job.location : '');
  const [employmentType, setEmploymentType] = useState(job ? job.employmentType : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = {
      title,
      description,
      salary,
      location,
      employmentType,
    };
    onSave(updatedJob);
  };
  const navigate = useNavigate();
  const handleViewPosts = () => {
    navigate('/application');  // Redirect to the "previous posts" page
  };
  return (
    <div className="home-page">
    {/* Navbar/Header */}
   <EmployerNavbar/>

    <div className="home-content flex flex-row">
      {/* Sidebar */}
      <EmployerSidebar />
      <div className="button-container">
            <button 
              onClick={() => navigate('/jobposting')} 
              className="nav-button"
            >
              Post Job
          </button>
            <button 
              onClick={handleViewPosts} 
              className="nav-button"
            >
              View Previous Posts
            </button>
          </div>
    <div className="job-post-container">
      <h2 className="header">{job ? 'Edit Job' : 'Post a New Job'}</h2>
      <form className="job-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job responsibilities"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary range"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter job location"
            required
          />
        </div>

        <div className="form-group">
          <label>Employment Type</label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {job ? 'Update Job' : 'Post Job'}
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

// Dummy job data for testing
const dummydata = {
  title: 'Software Engineer',
  description: 'Looking for an experienced software engineer to join our IT team. Work on building scalable applications.',
  salary: '₹50,000 - ₹70,000 ',
  location: 'New York, NY',
  employmentType: 'full-time',
};

export default JobPost;

