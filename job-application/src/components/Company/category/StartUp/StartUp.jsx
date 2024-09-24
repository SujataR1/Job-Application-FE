import React, { useState, useMemo } from 'react';
import './StartUp.css'; // Import your CSS for styling

const startupCompaniesData = [
    { name: 'Company A', rating: 4.2, reviews: 2500, type: 'Startup', founded: 2020, employees: '51-200', industry: 'Tech' },
    { name: 'Company B', rating: 4.5, reviews: 1800, type: 'Startup', founded: 2019, employees: '201-500', industry: 'E-Commerce' },
    { name: 'Company C', rating: 3.9, reviews: 1200, type: 'Startup', founded: 2021, employees: '201-500', industry: 'Healthcare' },
    { name: 'Company D', rating: 4.0, reviews: 800, type: 'Startup', founded: 2022, employees: '1-50', industry: 'FinTech' },
    { name: 'Company E', rating: 3.8, reviews: 500, type: 'Startup', founded: 2018, employees: '501-1000', industry: 'Travel' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Frontend Developer', company: 'Company A', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Backend Developer', company: 'Company B', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Product Designer', company: 'Company C', location: 'Hyderabad', type: 'Internship' },
    { title: 'Business Analyst', company: 'Company D', location: 'Delhi', type: 'Full-Time' },
    { title: 'Digital Marketer', company: 'Company E', location: 'Pune', type: 'Contract' },
];

const StartUpCompanies = () => {
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
        return startupCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="StartUpCompanies">
            <h1>Startup Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>
                
                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Startup">Startup</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="Tech">Tech</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Travel">Travel</option>
                </select>

                {/* Experience Filter */}
                <h3>Experience</h3>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">All Experience Levels</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Entry Level">Entry Level</option>
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

export default StartUpCompanies;
