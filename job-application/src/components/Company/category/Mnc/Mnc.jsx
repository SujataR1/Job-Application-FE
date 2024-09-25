import React, { useState, useMemo } from 'react';
import './Mnc.css'; // Import your CSS for styling

const mncCompaniesData = [
    { name: 'Infosys', rating: 4.2, reviews: 4000, type: 'MNC', founded: 1981, employees: '20001+', industry: 'IT Services' },
    { name: 'Tata Consultancy Services', rating: 4.1, reviews: 5000, type: 'MNC', founded: 1968, employees: '45000+', industry: 'IT Services' },
    { name: 'Wipro', rating: 4.0, reviews: 3000, type: 'MNC', founded: 1945, employees: '20001+', industry: 'IT Services' },
    { name: 'Accenture', rating: 4.3, reviews: 2800, type: 'MNC', founded: 1989, employees: '50000+', industry: 'Consulting' },
    { name: 'Cognizant', rating: 4.0, reviews: 2500, type: 'MNC', founded: 1994, employees: '30001+', industry: 'IT Services' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Engineer', company: 'Infosys', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'Project Manager', company: 'Tata Consultancy Services', location: 'Hyderabad', type: 'Full-Time' },
    { title: 'Business Analyst', company: 'Wipro', location: 'Pune', type: 'Internship' },
    { title: 'Data Analyst', company: 'Accenture', location: 'Chennai', type: 'Full-Time' },
    { title: 'HR Manager', company: 'Cognizant', location: 'Delhi', type: 'Full-Time' },
];

const MncCompanies = () => {
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
        return mncCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="MncCompanies">
            <h1>MNC Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>
                
                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="MNC">MNC</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chennai">Chennai</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Consulting">Consulting</option>
                </select>

                {/* Department Filter */}
                <h3>Department</h3>
                <select name="department" onChange={handleFilterChange}>
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                </select>

                {/* Experience Filter */}
                <h3>Experience</h3>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">All Experience Levels</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Entry Level">Entry Level</option>
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

export default MncCompanies;
