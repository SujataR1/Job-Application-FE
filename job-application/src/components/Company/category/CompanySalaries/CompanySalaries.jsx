import React, { useState, useMemo } from 'react';
import './CompanySalaries.css'; // Import your CSS for styling

const salaryData = [
    { company: 'Ola', averageSalary: 900000, jobCount: 120 },
    { company: 'Swiggy', averageSalary: 850000, jobCount: 95 },
    { company: 'Zomato', averageSalary: 800000, jobCount: 110 },
    { company: 'Digit Insurance', averageSalary: 950000, jobCount: 80 },
    { company: 'Pristyn Care', averageSalary: 700000, jobCount: 60 },
    { company: 'Upstox', averageSalary: 720000, jobCount: 45 },
];

const CompanySalaries = () => {
    const [filters, setFilters] = useState({
        jobCount: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredSalaries = useMemo(() => {
        return salaryData.filter((salary) => {
            return (
                (!filters.jobCount || salary.jobCount >= parseInt(filters.jobCount))
            );
        });
    }, [filters]);

    return (
        <div className="CompanySalaries">
            <h1>Company Salaries</h1>

            <div className="sidebar">
                <h2>Filters</h2>
                <h3>Job Count</h3>
                <select name="jobCount" onChange={handleFilterChange}>
                    <option value="">All Job Counts</option>
                    <option value="50">50+</option>
                    <option value="100">100+</option>
                    <option value="150">150+</option>
                </select>
            </div>

            <div className="salaries-list">
                {filteredSalaries.length > 0 ? (
                    filteredSalaries.map((salary, index) => (
                        <div key={index} className="salary-card">
                            <h3>{salary.company}</h3>
                            <p><strong>Average Salary:</strong> ₹{salary.averageSalary.toLocaleString()}</p>
                            <p><strong>Job Openings:</strong> {salary.jobCount}</p>
                        </div>
                    ))
                ) : (
                    <p>No salary data found.</p>
                )}
            </div>
        </div>
    );
};

export default CompanySalaries;
