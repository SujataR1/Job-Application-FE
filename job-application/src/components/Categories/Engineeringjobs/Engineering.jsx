import React, { useState, useMemo } from 'react';
import './Engineering.css'; // Import your CSS for styling
import Modal from '../../model/Modal';

function Engineering() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: [],
    workMode: [],
    location: [],
    salary: [],
    companyType: [],
    roleCategory: [],
    stipend: [],
    duration: [],
    education: [],
    postedBy: [],
    industry: [],
    topCompanies: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [experience, setExperience] = useState(0);

  // Sample job data for demonstration
  const allJobs = useMemo(() => [
    { id: 1, title: 'Lead Software Engineer', company: 'Intel', location: 'Bengaluru', salary: 'Not disclosed', experience: '8-10 Yrs', rating: '4.5', reviews: '1500 Reviews', description: 'Experience with software development and leading teams. Strong programming skills in C++ and Python.' },
    { id: 2, title: 'Senior Software Engineer', company: 'Microsoft', location: 'Hyderabad', salary: '20-25 Lacs PA', experience: '6-8 Yrs', rating: '4.6', reviews: '2200 Reviews', description: 'Design and develop scalable software solutions. Experience with cloud technologies preferred.' },
    { id: 3, title: 'Software Development Engineer', company: 'Amazon', location: 'Bengaluru', salary: '15-18 Lacs PA', experience: '3-5 Yrs', rating: '4.4', reviews: '3000 Reviews', description: 'Develop and maintain software applications. Proficiency in Java and AWS required.' },
    { id: 4, title: 'Backend Engineer', company: 'Google', location: 'Hyderabad', salary: '18-22 Lacs PA', experience: '5-7 Yrs', rating: '4.7', reviews: '1800 Reviews', description: 'Backend development and database management. Experience with distributed systems is a plus.' },
    { id: 5, title: 'Frontend Engineer', company: 'Facebook', location: 'Mumbai', salary: '12-15 Lacs PA', experience: '3-5 Yrs', rating: '4.3', reviews: '2000 Reviews', description: 'Develop user interfaces and enhance user experience. Strong skills in React and TypeScript required.' },
    { id: 6, title: 'Full Stack Engineer', company: 'Adobe', location: 'Pune', salary: '14-17 Lacs PA', experience: '4-6 Yrs', rating: '4.5', reviews: '1700 Reviews', description: 'Work on both frontend and backend systems. Knowledge of modern frameworks and cloud services required.' },
    { id: 7, title: 'Software Engineer in Test', company: 'TCS', location: 'Chennai', salary: '10-12 Lacs PA', experience: '2-4 Yrs', rating: '4.0', reviews: '1300 Reviews', description: 'Design and execute test plans. Experience with test automation tools is required.' },
    { id: 8, title: 'DevOps Engineer', company: 'Infosys', location: 'Delhi / NCR', salary: '16-20 Lacs PA', experience: '4-6 Yrs', rating: '4.2', reviews: '1400 Reviews', description: 'Manage and automate deployment pipelines. Proficiency in Docker and Kubernetes required.' },
    { id: 9, title: 'Site Reliability Engineer', company: 'Oracle', location: 'Bengaluru', salary: '20-25 Lacs PA', experience: '5-8 Yrs', rating: '4.6', reviews: '1600 Reviews', description: 'Ensure reliability and performance of systems. Experience with monitoring and incident management is a plus.' },
    { id: 10, title: 'Machine Learning Engineer', company: 'Samsung', location: 'Hyderabad', salary: '18-22 Lacs PA', experience: '3-5 Yrs', rating: '4.4', reviews: '1500 Reviews', description: 'Develop and implement machine learning algorithms. Strong programming skills in Python and TensorFlow required.' },
  ], []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType].push(value);
      }
      return newFilters;
    });
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredJobs = allJobs; // Replace with actual filtering logic if needed

  return (
    <div className="engineering-jobs-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        {/* Department Filter */}
        <div className="filter-section">
          <h3>Department</h3>
          {['Engineering - Software & QA', 'Data Science & Analytics', 'Marketing & Communication', 'Sales & Business Development'].map((dept, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`department${index}`}
                onChange={() => handleFilterChange('department', dept)}
              />
              <label htmlFor={`department${index}`}>{dept} (12584)</label>
            </div>
          ))}
          <button className="view-more-button" onClick={() => openModal('departments')}>
            View More
          </button>
          {showModal && modalType === 'departments' && (
            <Modal closeModal={closeModal} />
          )}
        </div>
        <hr />

        {/* Work Mode Filter */}
        <div className="filter-section">
          <h3>Work Mode</h3>
          {['Work from office', 'Hybrid', 'Remote'].map((mode, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`workMode${index}`}
                onChange={() => handleFilterChange('workMode', mode)}
              />
              <label htmlFor={`workMode${index}`}>{mode}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Experience Filter */}
        <div className="filter-section">
          <h3>Experience</h3>
          <div className="experience-slider">
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="slider"
              id="experienceRange"
            />
            <div className="slider-labels">
              <span>{experience} Years to </span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
        <hr />

        {/* Location Filter */}
        <div className="filter-section">
          <h3>Location</h3>
          {['Bengaluru', 'Delhi / NCR', 'Hyderabad', 'Mumbai (All Areas)'].map((loc, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`location${index}`}
                onChange={() => handleFilterChange('location', loc)}
              />
              <label htmlFor={`location${index}`}>{loc} (4550)</label>
            </div>
          ))}
          <button className="view-more-button" onClick={() => openModal('locations')}>
            View More
          </button>
        </div>
        <hr />

        {/* Salary Filter */}
        <div className="filter-section">
          <h3>Salary</h3>
          {['0-3 Lakhs', '3-6 Lakhs', '6-10 Lakhs', '10-15 Lakhs'].map((salary, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`salary${index}`}
                onChange={() => handleFilterChange('salary', salary)}
              />
              <label htmlFor={`salary${index}`}>{salary}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Company Type Filter */}
        <div className="filter-section">
          <h3>Company Type</h3>
          {['Corporate', 'Indian MNC', 'Startup', 'Foreign MNC'].map((type, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`companyType${index}`}
                onChange={() => handleFilterChange('companyType', type)}
              />
              <label htmlFor={`companyType${index}`}>{type}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Role Category Filter */}
        <div className="filter-section">
          <h3>Role Category</h3>
          {['Technology', 'Engineering', 'Management', 'Consulting'].map((category, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`roleCategory${index}`}
                onChange={() => handleFilterChange('roleCategory', category)}
              />
              <label htmlFor={`roleCategory${index}`}>{category}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Stipend Filter */}
        <div className="filter-section">
          <h3>Stipend</h3>
          {['0-5K', '5-10K', '10-15K', '15-20K'].map((stipend, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`stipend${index}`}
                onChange={() => handleFilterChange('stipend', stipend)}
              />
              <label htmlFor={`stipend${index}`}>{stipend}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Duration Filter */}
        <div className="filter-section">
          <h3>Duration</h3>
          {['0-3 Months', '3-6 Months', '6-12 Months', '12-18 Months'].map((duration, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`duration${index}`}
                onChange={() => handleFilterChange('duration', duration)}
              />
              <label htmlFor={`duration${index}`}>{duration}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Education Filter */}
        <div className="filter-section">
          <h3>Education</h3>
          {['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'].map((education, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`education${index}`}
                onChange={() => handleFilterChange('education', education)}
              />
              <label htmlFor={`education${index}`}>{education}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Posted By Filter */}
        <div className="filter-section">
          <h3>Posted By</h3>
          {['Recruiter', 'Employee', 'Company Page'].map((postedBy, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`postedBy${index}`}
                onChange={() => handleFilterChange('postedBy', postedBy)}
              />
              <label htmlFor={`postedBy${index}`}>{postedBy}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Industry Filter */}
        <div className="filter-section">
          <h3>Industry</h3>
          {['IT', 'Finance', 'Healthcare', 'Education'].map((industry, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`industry${index}`}
                onChange={() => handleFilterChange('industry', industry)}
              />
              <label htmlFor={`industry${index}`}>{industry}</label>
            </div>
          ))}
        </div>
        <hr />

        {/* Top Companies Filter */}
        <div className="filter-section">
          <h3>Top Companies</h3>
          {['Google', 'Amazon', 'Microsoft', 'Apple'].map((company, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`topCompanies${index}`}
                onChange={() => handleFilterChange('topCompanies', company)}
              />
              <label htmlFor={`topCompanies${index}`}>{company}</label>
            </div>
          ))}
          <button className="view-more-button" onClick={() => openModal('topCompanies')}>
            View More
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-section">
        <h2>Engineering Jobs</h2>
        <div className="jobs-list">
          {filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Rating:</strong> {job.rating} ({job.reviews})</p>
              <p><strong>Description:</strong> {job.description}</p>
              <button className="apply-button">Apply Now</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Engineering;
