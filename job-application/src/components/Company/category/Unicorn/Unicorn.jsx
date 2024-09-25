import React, { useState, useMemo } from 'react';
import './Unicorn.css'; // Import your CSS for styling

const unicornCompaniesData = [
    { name: 'Ola', rating: 3.4, reviews: 1900, type: 'Corporate', founded: 2010, employees: '5001-10000', industry: 'B2C' },
    { name: 'Digit Insurance', rating: 3.9, reviews: 760, type: 'Startup', founded: 2016, industry: 'Insurance' },
    { name: 'Swiggy', rating: 3.8, reviews: 3700, type: 'Startup', founded: 2014, employees: '5001-10000', industry: 'Internet' },
    { name: 'Pristyn Care', rating: 3.9, reviews: 1000, type: 'Startup', founded: 2018, employees: '201-500', industry: 'Medical Services' },
    { name: 'Upstox', rating: 3.8, reviews: 142, type: 'Corporate', founded: 2011, employees: '51-200', industry: 'FinTech' },
    { name: 'Zomato', rating: 3.8, reviews: 2000, type: 'Corporate', founded: 2008, employees: '1001-5000', industry: 'Internet' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Engineer', company: 'Ola', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Data Scientist', company: 'Swiggy', location: 'Delhi', type: 'Full-Time' },
    { title: 'Product Manager', company: 'Zomato', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Marketing Associate', company: 'Upstox', location: 'Hyderabad', type: 'Internship' },
    { title: 'Customer Success Manager', company: 'Digit Insurance', location: 'Gurugram', type: 'Full-Time' },
];

const UnicornCompanies = () => {
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
        return unicornCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="UnicornCompanies">
            <h1>Unicorn Companies Actively Hiring</h1>

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
                    <option value="Mumbai">Mumbai (46)</option>
                    <option value="Hyderabad">Hyderabad (40)</option>
                    <option value="Pune">Pune (37)</option>
                    <option value="Chennai">Chennai (35)</option>
                    <option value="Gurugram">Gurugram (33)</option>
                    <option value="New Delhi">New Delhi (31)</option>
                    <option value="Kolkata">Kolkata (29)</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="Internet">Internet (25)</option>
                    <option value="Software Product">Software Product (19)</option>
                    <option value="FinTech / Payments">FinTech / Payments (11)</option>
                    <option value="E-Learning / EdTech">E-Learning / EdTech (7)</option>
                    <option value="IT Services & Consulting">IT Services & Consulting (4)</option>
                    <option value="Financial Services">Financial Services (4)</option>
                    <option value="Courier / Logistics">Courier / Logistics (3)</option>
                    <option value="Emerging Technologies">Emerging Technologies (2)</option>
                    <option value="Insurance">Insurance (2)</option>
                    <option value="NBFC">NBFC (2)</option>
                </select>

                {/* Department Filter */}
                <h3>Department</h3>
                <select name="department" onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering - Software & QA (67)</option>
                    <option value="Sales">Sales & Business Development (57)</option>
                    <option value="Customer Success">Customer Success, Service & Operations (49)</option>
                    <option value="Finance">Finance & Accounting (46)</option>
                    <option value="Marketing">Marketing & Communication (44)</option>
                    <option value="Data Science">Data Science & Analytics (34)</option>
                    <option value="Human Resources">Human Resources (31)</option>
                    <option value="Product Management">Product Management (30)</option>
                    <option value="UX">UX, Design & Architecture (28)</option>
                    <option value="Project Management">Project & Program Management (27)</option>
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
                    <option value="SaaS">SaaS (25)</option>
                    <option value="D2C">D2C (3)</option>
                    <option value="PaaS">PaaS (1)</option>
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

export default UnicornCompanies;
