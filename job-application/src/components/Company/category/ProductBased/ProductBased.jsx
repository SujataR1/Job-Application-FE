import React, { useState, useMemo } from 'react';
import './ProductBased.css'; // Import your CSS for styling

const productBasedCompaniesData = [
    { name: 'Google', rating: 4.5, reviews: 2500, type: 'Corporate', founded: 1998, employees: '100001+', industry: 'Tech' },
    { name: 'Microsoft', rating: 4.3, reviews: 2300, type: 'Corporate', founded: 1975, employees: '100001+', industry: 'Tech' },
    { name: 'Apple', rating: 4.7, reviews: 3000, type: 'Corporate', founded: 1976, employees: '100001+', industry: 'Tech' },
    { name: 'Amazon', rating: 4.1, reviews: 4000, type: 'Corporate', founded: 1994, employees: '100001+', industry: 'E-commerce' },
    { name: 'Salesforce', rating: 4.6, reviews: 1200, type: 'Corporate', founded: 1999, employees: '5001-10000', industry: 'Cloud Computing' },
];

// Dummy job postings data
const jobPostingsData = [
    { title: 'Software Developer', company: 'Google', location: 'Mountain View', type: 'Full-Time' },
    { title: 'Product Designer', company: 'Apple', location: 'Cupertino', type: 'Full-Time' },
    { title: 'Data Analyst', company: 'Amazon', location: 'Seattle', type: 'Internship' },
    { title: 'Marketing Specialist', company: 'Salesforce', location: 'San Francisco', type: 'Full-Time' },
];

const ProductBased = () => {
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
        return productBasedCompaniesData.filter((company) => {
            return (
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [filters]);

    return (
        <div className="ProductBasedCompanies">
            <h1>Product-Based Companies Actively Hiring</h1>

            <div className="sidebar">
                <h2>All Filters</h2>

                {/* Company Type Filter */}
                <h3>Company Type</h3>
                <select name="companyType" onChange={handleFilterChange}>
                    <option value="">All Company Types</option>
                    <option value="Corporate">Corporate (50)</option>
                </select>

                {/* Location Filter */}
                <h3>Location</h3>
                <select name="location" onChange={handleFilterChange}>
                    <option value="">All Locations</option>
                    <option value="Mountain View">Mountain View (10)</option>
                    <option value="Seattle">Seattle (20)</option>
                    <option value="Cupertino">Cupertino (15)</option>
                </select>

                {/* Industry Filter */}
                <h3>Industry</h3>
                <select name="industry" onChange={handleFilterChange}>
                    <option value="">All Industries</option>
                    <option value="Tech">Tech (30)</option>
                    <option value="E-commerce">E-commerce (10)</option>
                    <option value="Cloud Computing">Cloud Computing (5)</option>
                </select>

                {/* Additional Filters can be added here... */}

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

export default ProductBased;
