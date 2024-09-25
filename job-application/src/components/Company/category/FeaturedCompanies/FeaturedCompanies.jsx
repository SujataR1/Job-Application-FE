import React, { useState, useMemo } from 'react';
import './FeaturedCompanies.css'; // Import your CSS for styling

const featuredCompaniesData = [
    { name: 'Tata Consultancy Services', rating: 4.5, reviews: 1200, type: 'Corporate', founded: 1968, employees: '5001-10000', industry: 'IT Services' },
    { name: 'Flipkart', rating: 4.2, reviews: 980, type: 'Startup', founded: 2007, employees: '1001-5000', industry: 'E-commerce' },
    { name: 'Wipro', rating: 4.1, reviews: 850, type: 'Corporate', founded: 1945, employees: '10000+', industry: 'IT Services' },
    { name: 'Paytm', rating: 3.9, reviews: 750, type: 'Startup', founded: 2010, employees: '1001-5000', industry: 'FinTech' },
    { name: 'HDFC Bank', rating: 4.6, reviews: 1300, type: 'Corporate', founded: 1994, employees: '50000+', industry: 'Banking' },
    { name: 'Zomato', rating: 4.0, reviews: 2000, type: 'Startup', founded: 2008, employees: '1001-5000', industry: 'Food Delivery' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Developer', company: 'Tata Consultancy Services', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Data Analyst', company: 'Flipkart', location: 'Bengaluru', type: 'Full-Time' },
    { title: 'System Administrator', company: 'Wipro', location: 'Pune', type: 'Full-Time' },
    { title: 'Business Analyst', company: 'Paytm', location: 'Noida', type: 'Internship' },
    { title: 'Relationship Manager', company: 'HDFC Bank', location: 'Delhi', type: 'Full-Time' },
];

const FeaturedCompanies = () => {
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
        return featuredCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="UnicornCompanies">
            <h1>Featured Companies Hiring Now</h1>

            <div className="sidebar">
                <h2>All Filters</h2>

                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Startup">Startup (3)</option>
                    <option value="Corporate">Corporate (3)</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Mumbai">Mumbai (All Areas)</option>
                    <option value="Bengaluru">Bengaluru (All Areas)</option>
                    <option value="Pune">Pune (All Areas)</option>
                    <option value="Noida">Noida (All Areas)</option>
                    <option value="Delhi">Delhi (All Areas)</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="IT Services">IT Services (2)</option>
                    <option value="E-commerce">E-commerce (1)</option>
                    <option value="FinTech">FinTech (1)</option>
                    <option value="Banking">Banking (1)</option>
                </select>

                {/* Experience Filter */}
                <h3>Experience</h3>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">All Experience Levels</option>
                    <option value="Experienced">Experienced (5)</option>
                    <option value="Entry Level">Entry Level (2)</option>
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

export default FeaturedCompanies;
