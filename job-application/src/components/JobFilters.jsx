import React from 'react';

const JobFilters = ({ onFilterChange }) => {
    return (
        <div className="p-5 w-1/4">
            <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>

            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="location"
                        value="Delhi NCR"
                        onChange={onFilterChange}
                    /> Delhi NCR
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="location"
                        value="Bangalore"
                        onChange={onFilterChange}
                    /> Bangalore
                </label>
                {/* Add more locations */}
            </div>

            <h3 className="text-lg font-semibold mb-2">Industry</h3>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="industry"
                        value="Frontend Developer"
                        onChange={onFilterChange}
                    /> Frontend Developer
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="industry"
                        value="Backend Developer"
                        onChange={onFilterChange}
                    /> Backend Developer
                </label>
                {/* Add more industries */}
            </div>

            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <div>
                <label>
                    <input
                        type="radio"
                        name="salary"
                        value="0-40k"
                        onChange={onFilterChange}
                    /> 0-40k
                </label>
                <label>
                    <input
                        type="radio"
                        name="salary"
                        value="42-1lakh"
                        onChange={onFilterChange}
                    /> 42-1lakh
                </label>
                {/* Add more salary ranges */}
            </div>
        </div>
    );
};

export default JobFilters;
