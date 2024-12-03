// import React, { useState } from "react";
// import "./JobPage.css";

// const JobPage = () => {
//     const [filter, setFilter] = useState({
//         profile: "",
//         location: "",
//         workFromHome: false,
//         partTime: false,
//         minSalary: 0,
//         maxSalary: 10,
//         experience: "",
//         search: "",
//     });

//     // Handle the changes in filter fields
//     const handleFilterChange = (event) => {
//         const { name, value, type, checked } = event.target;
//         setFilter({
//             ...filter,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     // Handle the salary range change
//     const handleSalaryChange = (direction) => {
//         let newSalary = direction === "up" ? filter.minSalary + 2 : filter.minSalary - 2;
//         if (newSalary < 0) newSalary = 0;
//         if (newSalary > 10) newSalary = 10;
//         setFilter({
//             ...filter,
//             minSalary: newSalary,
//         });
//     };

//     // Clear all filters
//     const clearAllFilters = () => {
//         setFilter({
//             profile: "",
//             location: "",
//             workFromHome: false,
//             partTime: false,
//             minSalary: 0,
//             maxSalary: 10,
//             experience: "",
//             search: "",
//         });
//     };

//     return (
//         <div className="job-page">
//             <header className="header">
//                 <h1>Start applying to the latest job vacancies </h1>
//             </header>

//             <section className="filters-section">
//                 <h2>Filters </h2>
//                 <div className="filter-container">
//                     {/* Profile */}
//                     <div className="filter">
//                         <label>Profile</label>
//                         <input
//                             type="text"
//                             name="profile"
//                             value={filter.profile}
//                             onChange={handleFilterChange}
//                             placeholder="e.g. Marketing"
//                         />
//                     </div>

//                     {/* Location */}
//                     <div className="filter">
//                         <label>Location</label>
//                         <input
//                             type="text"
//                             name="location"
//                             value={filter.location}
//                             onChange={handleFilterChange}
//                             placeholder="e.g. Delhi"
//                         />
//                     </div>

//                     {/* Work From Home */}
//                     <div className="filter">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="workFromHome"
//                                 checked={filter.workFromHome}
//                                 onChange={handleFilterChange}
//                             />
//                             Work from home
//                         </label>
//                     </div>

//                     {/* Part-time */}
//                     <div className="filter">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 name="partTime"
//                                 checked={filter.partTime}
//                                 onChange={handleFilterChange}
//                             />
//                             Part-time
//                         </label>
//                     </div>
                    
//                     {/* Annual Salary */}
//                     <div className="filter">
//                         <label>Annual Salary (in lakhs)</label>
//                         <div className="salary-range">
//                             <button type="button" onClick={() => handleSalaryChange("down")}>⬇️</button>
//                             <input
//                                 type="number"
//                                 name="minSalary"
//                                 value={filter.minSalary}
//                                 readOnly
//                             />
//                             <button type="button" onClick={() => handleSalaryChange("up")}>⬆️</button>
//                         </div>
//                     </div>

//                     {/* Years of Experience */}
//                     <div className="filter">
//                         <label>Years of Experience</label>
//                         <input
//                             type="text"
//                             name="experience"
//                             value={filter.experience}
//                             onChange={handleFilterChange}
//                             placeholder=" years of experience"
//                         />
//                     </div>

//                     {/* Clear All */}
//                     <div className="filter">
//                         <button className="clear-all" onClick={clearAllFilters}>Clear all</button>
//                     </div>

//                     {/* OR Divider */}
//                     <div className="or-divider">
//                         <span>OR</span>
//                     </div>

//                     {/* Search */}
//                     <div className="filter">
//                         <label>Search</label>
//                         <div className="search-box">
//                             <input
//                                 type="text"
//                                 name="search"
//                                 value={filter.search}
//                                 onChange={handleFilterChange}
//                                 placeholder="e.g. Design, Mumbai, Infosys"
//                             />
//                             <button type="button">🔍</button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="job-listings">
//                 {/* Job listings will be here */}
//             </section>

//             <section className="courses-section">
//                 {/* Courses section will be here */}
//             </section>
//         </div>
//     );
// };

// export default JobPage;


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

    // Sample job listings data
    const jobListings = [
        {
            id: 1,
            title: "Business Development Executive",
            company: "DV Analytics",
            location: "Bangalore",
            salary: "₹ 3,00,000 - 4,00,000",
            experience: "0-5 years",
            posted: "3 weeks ago",
            isHiring: true,
        },
        {
            id: 2,
            title: "Financial Sales Officer",
            company: "WeMakeScholars",
            location: "Hyderabad",
            salary: "₹ 4,00,000 - 4,30,000",
            experience: "0-1 years",
            posted: "1 week ago",
            isHiring: true,
        },
        {
            id: 3,
            title: "Field Sales Associate",
            company: "Sumridhi.in",
            location: "Uttar Pradesh, Haryana",
            salary: "₹ 2,10,000 - 2,85,000",
            experience: "0-2 years",
            posted: "Just now",
            isHiring: true,
        },
        {
            id: 4,
            title: "Corporate Sales Executive",
            company: "Fz Fitness Factory",
            location: "Dera Bassi",
            salary: "₹ 2,50,000 - 3,50,000",
            experience: "0-3 years",
            posted: "7 days ago",
            isHiring: true,
        },
        {
            id: 5,
            title: "Graphic Designer",
            company: "CRAFX STUDIO",
            location: "Thane, Navi Mumbai, Mumbai",
            salary: "₹ 3,50,000 - 4,00,000",
            experience: "1-2 years",
            posted: "2 weeks ago",
            isHiring: true,
        },
        // Add more jobs as needed
    ];

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

    // Filter the job listings based on selected filters
    const filteredJobs = jobListings.filter((job) => {
        const profileMatch =
            !filter.profile || job.title.toLowerCase().includes(filter.profile.toLowerCase());
        const locationMatch =
            !filter.location || job.location.toLowerCase().includes(filter.location.toLowerCase());
        const experienceMatch =
            !filter.experience || job.experience.toLowerCase().includes(filter.experience.toLowerCase());

        return profileMatch && locationMatch && experienceMatch;
    });

    return (
        <div className="job-page">
            <header className="header">
                <h1>Start applying to the latest job vacancies</h1>
            </header>

            <div className="main-content">
                {/* Filter Section */}
                <section className="filters-section">
                    <h2>Filters</h2>
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

                        {/* Salary Range */}
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

                        {/* Experience */}
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

                        {/* Clear Filters */}
                        <div className="filter">
                            <button className="clear-all" onClick={clearAllFilters}>Clear all</button>
                        </div>

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

                {/* Job Listings Section */}
                <section className="job-listings">
                    <h2>Available Jobs</h2>
                    <div className="job-list">
                        {filteredJobs.length === 0 ? (
                            <p>No jobs found with the selected filters.</p>
                        ) : (
                            filteredJobs.map((job) => (
                                <div key={job.id} className="job-card">
                                    <h3>{job.title}</h3>
                                    <p><strong>Company:</strong> {job.company}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    <p><strong>Experience:</strong> {job.experience}</p>
                                    <p><strong>Posted:</strong> {job.posted}</p>
                                    <button>Apply Now</button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default JobPage;
