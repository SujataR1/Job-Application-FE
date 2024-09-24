import React, { useState, useMemo } from 'react';
import './ItCompanies.css'; // Import your CSS for styling

const itCompaniesData = [
    { name: 'TCS', rating: 4.0, reviews: 3000, type: 'Corporate', founded: 1968, employees: '50000+', industry: 'IT Services' },
    { name: 'Infosys', rating: 3.9, reviews: 2500, type: 'Corporate', founded: 1981, employees: '20000+', industry: 'IT Services' },
    { name: 'Wipro', rating: 3.7, reviews: 2200, type: 'Corporate', founded: 1945, employees: '20000+', industry: 'IT Services' },
    { name: 'HCL', rating: 3.6, reviews: 1800, type: 'Corporate', founded: 1976, employees: '20000+', industry: 'IT Services' },
    { name: 'Tech Mahindra', rating: 3.8, reviews: 1500, type: 'Corporate', founded: 1986, employees: '10000+', industry: 'IT Services' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Engineer', company: 'TCS', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Data Analyst', company: 'Infosys', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Project Manager', company: 'Wipro', location: 'Hyderabad', type: 'Full-Time' },
    { title: 'DevOps Engineer', company: 'HCL', location: 'Chennai', type: 'Internship' },
    { title: 'QA Tester', company: 'Tech Mahindra', location: 'Pune', type: 'Full-Time' },
];

const ItCompanies = () => {
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
        return itCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="ItCompanies">
            <h1>IT Companies Actively Hiring</h1>

            <div className="content">
                <div className="sidebar">
                    <h2>All Filters</h2>
                    <h3>Company Type</h3>
                    <select name="companyType" onChange={handleFilterChange}>
                        <option value="">All Company Types</option>
                        <option value="Startup">Startup (54)</option>
                        <option value="Corporate">Corporate (24)</option>
                        <option value="Foreign MNC">Foreign MNC (13)</option>
                        <option value="Indian MNC">Indian MNC (3)</option>
                        <option value="Others">Others (2)</option>
                    </select>

                    <h3>Location</h3>
                    <select name="location" onChange={handleFilterChange}>
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai (All Areas) (54)</option>
                        <option value="Bengaluru">Bengaluru (72)</option>
                        <option value="Hyderabad">Hyderabad (40)</option>
                        <option value="Pune">Pune (37)</option>
                        <option value="Chennai">Chennai (35)</option>
                    </select>

                    <h3>Industry</h3>
                    <select name="industry" onChange={handleFilterChange}>
                        <option value="">All Industries</option>
                        <option value="IT Services">IT Services (10)</option>
                        <option value="Software Product">Software Product (19)</option>
                        <option value="FinTech / Payments">FinTech / Payments (11)</option>
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
        </div>
    );
};

export default ItCompanies;
