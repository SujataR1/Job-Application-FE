import React, { useState, useMemo } from 'react';
import './Internet.css'; // Import your CSS for styling

const internetCompaniesData = [
    { name: 'Food Hub Software Solutions', rating: 4, reviews: 48, type: 'Startup', founded: 2021, employees: '1-5000', industry: 'Internet', hires: ['Software Engineer', 'Data Analyst'] },
    { name: 'Vidaxl', rating: 2.5, reviews: 5, type: 'Corporate', founded: 2006, employees: '1001-5000', industry: 'E-commerce', hires: ['Sales Executive'] },
    { name: 'Practo', rating: 3.2, reviews: 464, type: 'Corporate', founded: 2008, employees: '501-1000', industry: 'Healthcare', hires: ['Product Manager'] },
    { name: 'Tech Solutions', rating: 4.0, reviews: 120, type: 'Startup', founded: 2019, employees: '51-200', industry: 'Internet', hires: ['Web Developer'] },
    { name: 'Data Analytics Co.', rating: 4.5, reviews: 150, type: 'Corporate', founded: 2015, employees: '201-500', industry: 'Internet', hires: ['Data Scientist'] },
    { name: 'GreenTech Innovations', rating: 3.8, reviews: 300, type: 'Startup', founded: 2020, employees: '11-50', industry: 'Internet', hires: ['UX Designer'] },
];

const jobPostingsData = [
    { title: 'Software Engineer', company: 'Food Hub Software Solutions', location: 'Delhi', type: 'Full-Time' },
    { title: 'Sales Executive', company: 'Vidaxl', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Product Manager', company: 'Practo', location: 'Bengaluru', type: 'Contract' },
    { title: 'Web Developer', company: 'Tech Solutions', location: 'Pune', type: 'Full-Time' },
    { title: 'Data Scientist', company: 'Data Analytics Co.', location: 'Hyderabad', type: 'Remote' },
    { title: 'UX Designer', company: 'GreenTech Innovations', location: 'Chennai', type: 'Part-Time' },
];

const InternetCompanies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        companyType: '',
        industry: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredCompanies = useMemo(() => {
        return internetCompaniesData.filter((company) => {
            return (
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [searchTerm, filters]);

    return (
        <div className="InternetCompanies">
            <h1>Internet Companies Actively Hiring</h1>
            <div className="content">
                <div className="filters-section">
                    <h2>All Filters</h2>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search Companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Company Type Filter */}
                    <h3>Company Type</h3>
                    <select name="companyType" onChange={handleFilterChange}>
                        <option value="">All Company Types</option>
                        <option value="Startup">Startup</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Indian MNC">Indian MNC</option>
                    </select>

                    {/* Industry Filter */}
                    <h3>Industry</h3>
                    <select name="industry" onChange={handleFilterChange}>
                        <option value="">All Industries</option>
                        <option value="Internet">Internet</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Healthcare">Healthcare</option>
                        {/* Add more industries as needed */}
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
                                <p><strong>Hiring for:</strong> {company.hires.join(', ')}</p>
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

export default InternetCompanies;
