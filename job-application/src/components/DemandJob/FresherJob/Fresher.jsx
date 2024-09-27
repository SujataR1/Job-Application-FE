import React, { useState, useMemo } from 'react';
import './Fresher.css'; // Import your CSS for styling
import FresherModal from '../FresherModal/FresherModal'; // Import the Modal component

const jobCategories = [
    'Foreign MNCs Jobs',
    'IT Jobs',
    'Work from home Jobs',
    'HR Jobs',
    'Sales Jobs',
    'Supply Chain Jobs',
    'Analytics & BI Jobs',
    'Data Science Jobs',
];

const FresherJobs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        location: [],
        roleCategory: [],
        salary: [],
        education: [],
    });

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

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

    const allJobs = useMemo(() => [
        { id: 1, title: 'Data Analyst Intern', company: 'Tech Corp', location: 'Bengaluru', salary: 'Not disclosed', education: 'Bachelors', description: 'Seeking a motivated data analyst intern to assist with data collection and analysis.' },
        { id: 2, title: 'Junior Software Developer', company: 'Start-Up X', location: 'Delhi', salary: '3-5 Lacs PA', education: 'Bachelors', description: 'Looking for a junior developer with skills in Java and React.' },
        { id: 3, title: 'Marketing Intern', company: 'Innovate LLC', location: 'Hyderabad', salary: '5-8 K PA', education: 'Bachelors', description: 'Assist with digital marketing campaigns and social media management.' },
        { id: 4, title: 'HR Trainee', company: 'Global Inc', location: 'Mumbai', salary: '3-4 Lacs PA', education: 'Bachelors', description: 'Support HR team in recruitment and onboarding processes.' },
        { id: 5, title: 'Data Scientist Intern', company: 'AI Solutions', location: 'Pune', salary: 'Not disclosed', education: 'Masters', description: 'Join our team to work on data modeling and analysis.' },
        { id: 6, title: 'Product Management Intern', company: 'Innovate Tech', location: 'Gurgaon', salary: '4-6 Lacs PA', education: 'Bachelors', description: 'Collaborate with the product team to analyze market trends.' },
        // Add more jobs as needed
    ], []);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            const matchesLocation = filters.location.length === 0 || filters.location.includes(job.location);
            const matchesRoleCategory = filters.roleCategory.length === 0 || filters.roleCategory.includes('Internship');
            const matchesSalary = filters.salary.length === 0 || filters.salary.includes(job.salary);
            const matchesEducation = filters.education.length === 0 || filters.education.includes(job.education);
            return matchesLocation && matchesRoleCategory && matchesSalary && matchesEducation;
        });
    }, [allJobs, filters]);

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    // Slice jobs for the current page
    const displayedJobs = filteredJobs.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

    const handleNextPage = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <div className="Fresher">
            <div className="fresher-jobs-container" style={{
                maxWidth: '1200px',
                margin: '30px auto',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: '#f0f4f8',
                color: '#2c3e50',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                gap: '20px'
            }}>
                
                {/* Filters Section */}
                <div className="filters-section" style={{ flex: '1', minWidth: '300px' }}>
                    <h2>Filters</h2>
                    
                    {/* Location Filter */}
                    <div className="filter-section">
                        <h3>Location</h3>
                        {['Bengaluru', 'Delhi', 'Hyderabad', 'Mumbai'].map((loc, index) => (
                            <div key={index} className="filter-item">
                                <input
                                    type="checkbox"
                                    id={`location${index}`}
                                    onChange={() => handleFilterChange('location', loc)}
                                />
                                <label htmlFor={`location${index}`}>{loc}</label>
                            </div>
                        ))}
                    </div>

                    <hr />

                    {/* Role Category Filter */}
                    <div className="filter-section">
                        <h3>Role Category</h3>
                        {['Internship', 'Full Time', 'Part Time'].map((category, index) => (
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

                    {/* Salary Filter */}
                    <div className="filter-section">
                        <h3>Salary</h3>
                        {['0-3 Lakhs', '3-5 Lakhs', '5-8 Lakhs', 'Not disclosed'].map((salary, index) => (
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

                    {/* Education Filter */}
                    <div className="filter-section">
                        <h3>Education</h3>
                        {['Bachelors', 'Masters'].map((education, index) => (
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

                    {/* Job Categories Filter */}
                    <div className="filter-section">
                        <h3>Job Categories</h3>
                        {jobCategories.map((category, index) => (
                            <div key={index} className="filter-item">
                                <input
                                    type="checkbox"
                                    id={`jobCategory${index}`}
                                    onChange={() => handleFilterChange('roleCategory', category)}
                                />
                                <label htmlFor={`jobCategory${index}`}>{category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="jobs-section" style={{ flex: '2' }}>
                    <h2>Fresher Jobs</h2>
                    <div className="jobs-list">
                        {displayedJobs.length > 0 ? (
                            displayedJobs.map((job) => (
                                <div key={job.id} className="job-item">
                                    <h3>{job.title}</h3>
                                    <p><strong>Company:</strong> {job.company}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    <button onClick={() => openModal(job.id)} className="view-details-button">View Details</button>
                                </div>
                            ))
                        ) : (
                            <p>No jobs found matching the filters.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={handlePrevPage} disabled={currentIndex === 0}>
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={currentIndex >= totalPages - 1}>
                            Next
                        </button>
                    </div>

                    {/* Modal for Job Details */}
                    <FresherModal show={showModal} handleClose={() => setShowModal(false)} jobId={modalType} />
                </div>
            </div>
        </div>
    );
};

export default FresherJobs;
