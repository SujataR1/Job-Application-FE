import React, { useState, useMemo } from 'react';
import './SponsoredCompanies.css'; // Import your CSS for styling

const sponsoredCompaniesData = [
    { name: 'Company A', rating: 4.5, reviews: 1200, type: 'Corporate', founded: 2015, employees: '1001-5000', industry: 'Tech' },
    { name: 'Company B', rating: 4.0, reviews: 850, type: 'Startup', founded: 2019, industry: 'E-Commerce' },
    { name: 'Company C', rating: 4.2, reviews: 500, type: 'Corporate', founded: 2012, employees: '5001-10000', industry: 'Finance' },
    { name: 'Company D', rating: 3.9, reviews: 300, type: 'Startup', founded: 2020, employees: '201-500', industry: 'HealthTech' },
    { name: 'Company E', rating: 4.3, reviews: 1500, type: 'Corporate', founded: 2010, employees: '10001+', industry: 'Manufacturing' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Full Stack Developer', company: 'Company A', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'UX Designer', company: 'Company B', location: 'Delhi', type: 'Full-Time' },
    { title: 'Data Analyst', company: 'Company C', location: 'Mumbai', type: 'Part-Time' },
    { title: 'Product Owner', company: 'Company D', location: 'Hyderabad', type: 'Contract' },
    { title: 'Sales Executive', company: 'Company E', location: 'Gurugram', type: 'Internship' },
];

const SponsoredCompanies = () => {
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
        return sponsoredCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="SponsoredCompanies">
            <h1>Sponsored Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>

                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Startup">Startup</option>
                    <option value="Corporate">Corporate</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Gurugram">Gurugram</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="Tech">Tech</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Finance">Finance</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="Manufacturing">Manufacturing</option>
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

export default SponsoredCompanies;
