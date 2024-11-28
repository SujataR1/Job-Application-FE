<<<<<<< HEAD:job-application/src/components/Home/Homepage.jsx
import React, { useState } from 'react';
=======
import React from 'react';
import Header from '../Header/Header';
>>>>>>> eb45332f263b50696ea6ceeb95eed0800a981d2f:job-application/src/components/Dashboard/Homepage.jsx

// Import the Navbar component

const HomePage = () => {
    const [showMoreJobs, setShowMoreJobs] = useState(false);

    const toggleMoreJobs = () => {
        setShowMoreJobs(!showMoreJobs);
    };

    const jobs = [
        { title: "Frontend Dev", company: "Transmogrify", location: "Kolkata" },
        { title: "Backend Dev", company: "Transmogrify", location: "Kolkata" },
        { title: "UI/UX Designer", company: "Transmogrify", location: "Kolkata" },
        // Add more core jobs here
    ];

    const additionalJobs = [
        { title: "Data Scientist", company: "TechCorp", location: "Delhi" },
        { title: "Product Manager", company: "InnovateInc", location: "Bangalore" },
        { title: "DevOps Engineer", company: "CloudSolutions", location: "Hyderabad" },
        // Add more additional jobs here
    ];

    return (
        <div className="font-sans bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: 'url(/images/background.png)' }}>
<<<<<<< HEAD:job-application/src/components/Home/Homepage.jsx
            {/* Ensure Navbar is placed here */}

=======
         {/* Ensure Navbar is placed here */}
         <Header />
>>>>>>> eb45332f263b50696ea6ceeb95eed0800a981d2f:job-application/src/components/Dashboard/Homepage.jsx
            {/* Main Content */}
            <main className="text-center mt-0">
                <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs">No. 1 Job Hunt Website</span>
                <h1 className="text-5xl font-bold mt-20">
                    Search, Apply &amp; <span className="text-teal-800">Land Your Ideal Job</span>
                </h1>
                <p className="text-gray-500 mt-20 mb-20">
                    Discover your dream job across industries, cities, and companies.
                </p>
                <div className="flex justify-center items-center space-x-2 mb-12">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        className="w-full max-w-lg py-3 px-4 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                    />
                    <button className="bg-teal-600 text-white py-3 px-5 rounded-r-md hover:bg-teal-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-6-6 6-6" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center space-x-6 mb-12">
                    <button className="bg-teal-100 text-teal-600 border border-teal-200 py-3 px-8 rounded-full hover:bg-teal-200">
                        Frontend Developer
                    </button>
                    <button className="bg-teal-100 text-teal-600 border border-teal-200 py-3 px-8 rounded-full hover:bg-teal-200">
                        Backend Developer
                    </button>
                    <button className="bg-teal-100 text-teal-600 border border-teal-200 py-3 px-8 rounded-full hover:bg-teal-200">
                        Fullstack Developer
                    </button>
                </div>
            </main>

            {/* Featured Jobs Section */}
            <section className="mt-20">
                <h2 className="text-2xl font-semibold text-teal-700 text-center">
                    Latest &amp; Top <span className="text-black">Job Openings</span>
                </h2>
                <div className="text-center mt-20">
                    <div className="flex justify-center flex-wrap gap-6">
                        {jobs.map((job, index) => (
                            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                                <p className="text-xl font-bold">{job.title}</p>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-500">{job.location}</p>
                            </div>
                        ))}
                    </div>

                    {/* View More Jobs Button */}
                    <button
                        onClick={toggleMoreJobs}
                        className="mt-4 text-teal-600 hover:underline"
                    >
                        {showMoreJobs ? 'Show Less' : 'View More'}
                    </button>

                    {/* Additional Jobs */}
                    {showMoreJobs && (
                        <div className="flex justify-center flex-wrap gap-6 mt-4">
                            {additionalJobs.map((job, index) => (
                                <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                                    <p className="text-xl font-bold">{job.title}</p>
                                    <p className="text-gray-600">{job.company}</p>
                                    <p className="text-gray-500">{job.location}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Companies Section */}
            <section className="mt-20">
                <h2 className="text-2xl font-semibold text-teal-700 text-center">
                    Featured Companies Actively Hiring
                </h2>
                <div className="text-center mt-10">
                    <div className="flex justify-center flex-wrap gap-6">
                        {[
                            { name: "Navi Technologies", rating: "N/A", description: "Fastest growing financial services companies in India." },
                            { name: "JPMorgan Chase Bank", rating: "4.1", description: "Leader in financial services." },
                            { name: "Standard Chartered", rating: "3.8", description: "Expand your horizons." },
                            
                        ].map((company, index) => (
                            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
                                <p className="text-xl font-bold">{company.name}</p>
                                {company.rating && <p className="text-gray-500">Rating: {company.rating}</p>}
                                <p className="text-gray-600">{company.description}</p>
                                <button className="mt-2 bg-teal-600 text-white py-1 px-3 rounded hover:bg-teal-700">
                                    View jobs
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;


