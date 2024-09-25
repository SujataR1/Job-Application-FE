import React, { useState, useMemo } from 'react';
import './TopCompanies.css'; // Import your CSS for styling

const topCompaniesData = [
    { name: 'Tata Consultancy Services', rating: 4.2, reviews: 2500, type: 'Corporate', founded: 1968, employees: '450000+', industry: 'IT Services' },
    { name: 'Infosys', rating: 4.0, reviews: 1800, type: 'Corporate', founded: 1981, employees: '250000+', industry: 'IT Services' },
    { name: 'Wipro', rating: 3.9, reviews: 1300, type: 'Corporate', founded: 1945, employees: '220000+', industry: 'IT Services' },
    { name: 'HCL Technologies', rating: 3.8, reviews: 1000, type: 'Corporate', founded: 1976, employees: '150000+', industry: 'IT Services' },
    { name: 'Accenture', rating: 4.3, reviews: 2000, type: 'Corporate', founded: 1989, employees: '500000+', industry: 'Consulting' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Developer', company: 'TCS', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Business Analyst', company: 'Infosys', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Project Manager', company: 'Wipro', location: 'Pune', type: 'Full-Time' },
    { title: 'Data Analyst', company: 'HCL Technologies', location: 'Chennai', type: 'Internship' },
    { title: 'Consultant', company: 'Accenture', location: 'Hyderabad', type: 'Full-Time' },
];

const TopCompanies = () => {
    const [filters, setFilters] = useState({
        companyType: '',
        location: '',
        industry: '',
        department: '',
        experience: '',
        natureOfBusiness: '',
        jobPostingDate: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredCompanies = useMemo(() => {
        return topCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="TopCompanies">
            <h1>Top Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>
                
                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Startup">Startup (54)</option>
                    <option value="Corporate">Corporate (24)</option>
                    <option value="Foreign MNC">Foreign MNC (13)</option>
                    <option value="Indian MNC">Indian MNC (3)</option>
                    <option value="Others">Others (2)</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru (72)</option>
                    <option value="Delhi/NCR">Delhi / NCR (55)</option>
                    <option value="Mumbai">Mumbai (All Areas) (54)</option>
                    <option value="Hyderabad">Hyderabad (40)</option>
                    <option value="Pune">Pune (37)</option>
                    <option value="Chennai">Chennai (35)</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="IT Services">IT Services (25)</option>
                    <option value="Consulting">Consulting (19)</option>
                    <option value="E-Learning">E-Learning (7)</option>
                </select>

                {/* Department Filter */}
                <h3>Department</h3>
                <select name="department" onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering (67)</option>
                    <option value="Sales">Sales (57)</option>
                    <option value="Data Science">Data Science (34)</option>
                </select>

                {/* Experience Filter */}
                <h3>Experience</h3>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">All Experience Levels</option>
                    <option value="Experienced">Experienced (94)</option>
                    <option value="Entry Level">Entry Level (47)</option>
                </select>

                {/* Nature of Business Filter */}
                <h3>Nature of Business</h3>
                <select name="natureOfBusiness" onChange={handleFilterChange}>
                    <option value="">All Nature of Business</option>
                    <option value="B2B">B2B (65)</option>
                    <option value="B2C">B2C (53)</option>
                </select>

                {/* Job Posting Date Filter */}
                <h3>Job Posting Date</h3>
                <select name="jobPostingDate" onChange={handleFilterChange}>
                    <option value="">All Dates</option>
                    <option value="<7 Days">Posted in last 7 days</option>
                    <option value="<15 Days">Posted in last 15 days</option>
                </select>
            </div>

            <div className="companies-list">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company, index) => (
                        <div key={index} className="company-card">
                            <h3>{company.name}</h3>
                            <p><strong>Rating:</strong> {company.rating} ({company.reviews} reviews)</p>
                            <p><strong>Type:</strong> {company.type}</p>
                            <p><strong>Founded:</strong> {company.founded}</p>
                            <p><strong>Employees:</strong> {company.employees}</p>
                            <p><strong>Industry:</strong> {company.industry}</p>
                        </div>
                    ))
                ) : (
                    <p>No companies found.</p>
                )}
            </div>

            <div className="job-postings">
                <h2>Job Postings</h2>
                {jobPostingsData.length > 0 ? (
                    <ul>
                        {jobPostingsData.map((job, index) => (
                            <li key={index}>
                                <strong>{job.title}</strong> at {job.company} - {job.location} ({job.type})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No job postings available.</p>
                )}
            </div>
        </div>
    );
};

export default TopCompanies;
