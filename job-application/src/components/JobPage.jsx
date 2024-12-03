import React, { useState } from "react";
import "./JobPage.css";

const JobPage = () => {
    const [filter, setFilter] = useState({
        profile: "",
        location: "",
        workFromHome: false,
        partTime: false,
        minSalary: 0,
        maxSalary: 10,
        experience: "",
        search: "",
    });

    // Handle the changes in filter fields
    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilter({
            ...filter,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle the salary range change
    const handleSalaryChange = (direction) => {
        let newSalary = direction === "up" ? filter.minSalary + 2 : filter.minSalary - 2;
        if (newSalary < 0) newSalary = 0;
        if (newSalary > 10) newSalary = 10;
        setFilter({
            ...filter,
            minSalary: newSalary,
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        setFilter({
            profile: "",
            location: "",
            workFromHome: false,
            partTime: false,
            minSalary: 0,
            maxSalary: 10,
            experience: "",
            search: "",
        });
    };

    return (
        <div className="job-page">
            <header className="header">
                <h1>Start applying to the latest job vacancies </h1>
            </header>

            <section className="filters-section">
                <h2>Filters </h2>
                <div className="filter-container">
                    {/* Profile */}
                    <div className="filter">
                        <label>Profile</label>
                        <input
                            type="text"
                            name="profile"
                            value={filter.profile}
                            onChange={handleFilterChange}
                            placeholder="e.g. Marketing"
                        />
                    </div>

                    {/* Location */}
                    <div className="filter">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={filter.location}
                            onChange={handleFilterChange}
                            placeholder="e.g. Delhi"
                        />
                    </div>

                    {/* Work From Home */}
                    <div className="filter">
                        <label>
                            <input
                                type="checkbox"
                                name="workFromHome"
                                checked={filter.workFromHome}
                                onChange={handleFilterChange}
                            />
                            Work from home
                        </label>
                    </div>

                    {/* Part-time */}
                    <div className="filter">
                        <label>
                            <input
                                type="checkbox"
                                name="partTime"
                                checked={filter.partTime}
                                onChange={handleFilterChange}
                            />
                            Part-time
                        </label>
                    </div>



                    {/* Annual Salary */}
                    <div className="filter">
                        <label>Annual Salary (in lakhs)</label>
                        <div className="salary-range">
                            <button type="button" onClick={() => handleSalaryChange("down")}>⬇️</button>
                            <input
                                type="number"
                                name="minSalary"
                                value={filter.minSalary}
                                readOnly
                            />
                            <button type="button" onClick={() => handleSalaryChange("up")}>⬆️</button>
                        </div>
                    </div>

                    {/* Years of Experience */}
                    <div className="filter">
                        <label>Years of Experience</label>
                        <input
                            type="text"
                            name="experience"
                            value={filter.experience}
                            onChange={handleFilterChange}
                            placeholder=" years of experience"
                        />
                    </div>

                    {/* Clear All */}
                    <div className="filter">
                        <button className="clear-all" onClick={clearAllFilters}>Clear all</button>
                    </div>

                    {/* OR Divider */}
                    <div className="or-divider">
                        <span>OR</span>
                    </div>

                    {/* Search */}
                    <div className="filter">
                        <label>Search</label>
                        <div className="search-box">
                            <input
                                type="text"
                                name="search"
                                value={filter.search}
                                onChange={handleFilterChange}
                                placeholder="e.g. Design, Mumbai, Infosys"
                            />
                            <button type="button">🔍</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="job-listings">
                {/* Job listings will be here */}
            </section>

            <section className="courses-section">
                {/* Courses section will be here */}
            </section>
        </div>
    );
};

export default JobPage;
