import React, { useState } from 'react';
import './JobPosting.css';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const JobPost = ({ job, onSave }) => {
  const [title, setTitle] = useState(job ? job.title : '');
  const [description, setDescription] = useState(job ? job.description : '');
  const [salary, setSalary] = useState(job ? job.salary : '');
  const [location, setLocation] = useState(job ? job.location : '');
  const [employmentType, setEmploymentType] = useState(job ? job.employmentType : '');
  const [questions, setQuestions] = useState(job ? job.questions : ['']);
  const [activePage, setActivePage] = useState('post'); // Track active page state

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = {
      title,
      description,
      salary,
      location,
      employmentType,
      questions,
    };
    onSave(updatedJob);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const navigate = useNavigate();

  const handleViewPosts = () => {
    setActivePage('view'); // Set "view" as active page when navigating to view posts
    navigate('/application');  // Redirect to the "previous posts" page
  };

  const handlePostJob = () => {
    setActivePage('post'); // Set "post" as active page when staying on the job post page
    navigate('/jobposting');  // Keep the user on the same page
  };

  return (
    <div className="home-page">
      {/* Navbar/Header */}
      <EmployerNavbar />

      <div className="home-content flex flex-row">
        {/* Sidebar */}
        <EmployerSidebar />
        <div className="button-container">
          <button
            onClick={handlePostJob}
            className={`nav-button ${activePage === 'post' ? 'active' : ''}`} // Apply 'active' class if the page is 'post'
          >
            Post Job
          </button>
          <button
            onClick={handleViewPosts}
            className={`nav-button ${activePage === 'view' ? 'active' : ''}`} // Apply 'active' class if the page is 'view'
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

            {/* Add Question Section */}
            <div className="form-group">
              <label>Job Questions</label>
              {questions.map((question, index) => (
                <div key={index} className="question-container">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    placeholder={`Enter question #${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="remove-question-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="add-question-button"
              >
                Add Question
              </button>
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
  questions: ['What is your experience with React?', 'How do you handle tight deadlines?'],
};

export default JobPost;
