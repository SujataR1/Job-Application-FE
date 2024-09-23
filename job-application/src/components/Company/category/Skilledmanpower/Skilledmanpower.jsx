import React, { useState, useMemo } from 'react';
import './Skilledmanpower.css'; // Import your CSS for styling

const skilledCompaniesData = [
    { name: 'ABC Builders', rating: 3.6, reviews: 1500, type: 'Startup', founded: 2015, employees: '201-500', industry: 'Construction', hires: ['Construction Worker', 'Labourer'] },
    { name: 'XYZ Electricals', rating: 4.2, reviews: 800, type: 'Corporate', founded: 2012, employees: '1001-5000', industry: 'Electrical Services', hires: ['Electrician'] },
    { name: 'WeldTech', rating: 4.0, reviews: 600, type: 'Indian MNC', founded: 2018, employees: '501-1000', industry: 'Manufacturing', hires: ['Welder'] },
    { name: 'PlumbRight', rating: 3.8, reviews: 500, type: 'Startup', founded: 2019, employees: '51-200', industry: 'Plumbing Services', hires: ['Plumber'] },
    { name: 'Tech Innovations', rating: 4.5, reviews: 300, type: 'Corporate', founded: 2010, employees: '1001-5000', industry: 'Technology', hires: ['Software Engineer'] },
];

const jobPostingsData = [
    { title: 'Construction Worker', company: 'ABC Builders', location: 'Delhi', type: 'Full-Time' },
    { title: 'Electrician', company: 'XYZ Electricals', location: 'Mumbai', type: 'Full-Time' },
    { title: 'Welder', company: 'WeldTech', location: 'Bengaluru', type: 'Contract' },
    { title: 'Plumber', company: 'PlumbRight', location: 'Hyderabad', type: 'Part-Time' },
    { title: 'Labourer', company: 'ABC Builders', location: 'Delhi', type: 'Full-Time' },
];

const SkilledManpowerCompanies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        companyType: '',
        location: '',
        industry: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredCompanies = useMemo(() => {
        return skilledCompaniesData.filter((company) => {
            return (
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filters.companyType || company.type === filters.companyType) &&
                (!filters.industry || company.industry === filters.industry)
            );
        });
    }, [searchTerm, filters]);

    return (
        <div className="SkilledManpowerCompanies">
            <h1>Skilled Manpower Companies Actively Hiring</h1>
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
                        <option value="Construction">Construction</option>
                        <option value="Electrical Services">Electrical Services</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Plumbing Services">Plumbing Services</option>
                        <option value="Technology">Technology</option>
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

export default SkilledManpowerCompanies;
