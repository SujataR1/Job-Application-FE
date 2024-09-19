import React, { useState, useMemo } from 'react';
import './DataScience.css'; // Import your CSS for styling
import DataModal from '../DataModal/DataModal'; // Import the Modal component

function DataScienceJobs() {
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
    { id: 1, title: 'Lead Data Science Consultant', company: 'Wells Fargo', location: 'Hyderabad', salary: 'Not disclosed', experience: '8-9 Yrs', rating: '4.0', reviews: '5636 Reviews', description: 'Proven experience in digital marketing with a focus on digital campaigns, consumer behavior, and brand strategy.' },
    { id: 2, title: 'Data Science Senior Analyst', company: 'Pepsico', location: 'Hyderabad', salary: 'Not disclosed', experience: '8-10 Yrs', rating: '4.1', reviews: '2305 Reviews', description: 'The Data Science Pillar in DA&AI will be the organization where Data Scientists and ML Engineers collaborate to drive insights.' },
    { id: 3, title: 'Senior Business Analyst - Data Science', company: 'Saisystems Technology', location: 'Pune', salary: '5-10 Lacs PA', experience: '5-10 Yrs', rating: '3.0', reviews: '43 Reviews', description: 'Basic graduation requirements, Project management certification (e.g., PMP) is a plus. Experience with data visualization tools.' },
    { id: 4, title: 'Data Science Analytics Sr Analyst', company: 'Accenture', location: 'Kolkata', salary: 'Not disclosed', experience: '5-8 Yrs', rating: '4.0', reviews: '49631 Reviews', description: 'Skill required: Tech for Operations - Microsoft Robotic Process Automation. Analyzing large datasets for actionable insights.' },
    { id: 5, title: 'Data Scientist', company: 'Amazon', location: 'Bengaluru', salary: '12-15 Lacs PA', experience: '3-5 Yrs', rating: '4.5', reviews: '12500 Reviews', description: 'Work with large datasets to develop models that drive business improvements. Strong programming skills required.' },
    { id: 6, title: 'Machine Learning Engineer', company: 'Google', location: 'Hyderabad', salary: '15-20 Lacs PA', experience: '4-6 Yrs', rating: '4.7', reviews: '18000 Reviews', description: 'Design and implement machine learning algorithms. Proficiency in Python and TensorFlow required.' },
    { id: 7, title: 'Data Analyst', company: 'Flipkart', location: 'Bengaluru', salary: '6-8 Lacs PA', experience: '1-3 Yrs', rating: '4.3', reviews: '9500 Reviews', description: 'Analyze data and create reports to support business decisions. Experience with SQL and data visualization tools preferred.' },
    { id: 8, title: 'AI Research Scientist', company: 'NVIDIA', location: 'Pune', salary: '18-22 Lacs PA', experience: '5-7 Yrs', rating: '4.6', reviews: '3000 Reviews', description: 'Conduct research in AI and deep learning. Strong background in mathematics and computer science required.' },
    { id: 9, title: 'Data Engineer', company: 'Zomato', location: 'Delhi / NCR', salary: '10-14 Lacs PA', experience: '3-5 Yrs', rating: '4.4', reviews: '6200 Reviews', description: 'Build data pipelines and ETL processes. Experience with Big Data technologies is a plus.' },
    { id: 10, title: 'Business Intelligence Developer', company: 'IBM', location: 'Mumbai', salary: '8-12 Lacs PA', experience: '2-4 Yrs', rating: '4.2', reviews: '4000 Reviews', description: 'Develop BI solutions and dashboards to support business needs. Familiarity with BI tools like Tableau and Power BI is required.' },
  ], []);

  const [filteredJobs] = useState(allJobs);

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

  return (
    <div className="data-science-jobs-container">
      <div className="filters-section">
        <h2>All Filters</h2>
        <div className="filter-section">
          <h3>Applied</h3>
          <p>Applied ({filters.department.length})</p>
        </div>
        <hr />

        {/* Department Filter */}
        <div className="filter-section">
          <h3>Department</h3>
          {['Data Science & Analytics', 'Engineering - Software & QA', 'Marketing & Communication', 'Sales & Business Development'].map((dept, index) => (
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
          {['Full Time', 'Part Time', 'Internship'].map((category, index) => (
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
          {['<5K', '5K-10K', '10K-20K', '>20K'].map((stipend, index) => (
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
          {['<3 Months', '3-6 Months', '6-12 Months'].map((duration, index) => (
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
          {['Bachelors', 'Masters', 'PhD'].map((education, index) => (
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
          {['Recruiters', 'Employee Referrals', 'Job Portals'].map((postedBy, index) => (
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
          {['Google', 'Amazon', 'IBM', 'Accenture'].map((company, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`topCompanies${index}`}
                onChange={() => handleFilterChange('topCompanies', company)}
              />
              <label htmlFor={`topCompanies${index}`}>{company}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="jobs-section">
        <h2>Data Science Jobs</h2>
        <div className="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
                <p><strong>Rating:</strong> {job.rating} ({job.reviews})</p>
                <p>{job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      {showModal && (
        <DataModal
          closeModal={() => setShowModal(false)}
          type={modalType}
        />
      )}
    </div>
  );
}

export default DataScienceJobs;
