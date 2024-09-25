import React, { useState, useMemo } from 'react';
import './FintechCompanies.css'; // Import your CSS for styling

const fintechCompaniesData = [
    { name: 'Upstox', rating: 4.2, reviews: 1200, type: 'Corporate', founded: 2012, employees: '501-1000', industry: 'FinTech' },
    { name: 'Razorpay', rating: 4.5, reviews: 2000, type: 'Startup', founded: 2014, employees: '1001-5000', industry: 'FinTech' },
    { name: 'Paytm', rating: 4.0, reviews: 5000, type: 'Startup', founded: 2010, employees: '5001-10000', industry: 'FinTech' },
    { name: 'KreditBee', rating: 3.8, reviews: 800, type: 'Startup', founded: 2018, employees: '201-500', industry: 'FinTech' },
    { name: 'Policybazaar', rating: 3.9, reviews: 3000, type: 'Corporate', founded: 2014, employees: '1001-5000', industry: 'Insurance' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Financial Analyst', company: 'Upstox', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Product Designer', company: 'Razorpay', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Software Developer', company: 'Paytm', location: 'Noida', type: 'Internship' },
    { title: 'Marketing Manager', company: 'KreditBee', location: 'Delhi', type: 'Full-Time' },
    { title: 'Data Scientist', company: 'Policybazaar', location: 'Gurugram', type: 'Full-Time' },
];

const FintechCompanies = () => {
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
        return fintechCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="FintechCompanies">
            <h1>Fintech Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>
                
                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Startup">Startup (4)</option>
                    <option value="Corporate">Corporate (2)</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Mumbai">Mumbai (2)</option>
                    <option value="Bengaluru">Bengaluru (1)</option>
                    <option value="Noida">Noida (1)</option>
                    <option value="Delhi">Delhi (1)</option>
                    <option value="Gurugram">Gurugram (1)</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="FinTech">FinTech (4)</option>
                    <option value="Insurance">Insurance (1)</option>
                </select>

                {/* Department Filter */}
                <h3>Department</h3>
                <select name="department" onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering (4)</option>
                    <option value="Marketing">Marketing (1)</option>
                    <option value="Data Science">Data Science (1)</option>
                </select>

                {/* Experience Filter */}
                <h3>Experience</h3>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">All Experience Levels</option>
                    <option value="Experienced">Experienced (4)</option>
                    <option value="Entry Level">Entry Level (1)</option>
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

export default FintechCompanies;
