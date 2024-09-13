import React from 'react';

const HomePage = () => {
    return (
        <div className="font-sans bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: 'url(/images/background.png)' }}>
            {/* Navbar */}
            <header className="flex justify-between items-center p-5">
                <div className="text-3xl font-bold text-black">
                    Job<span className="text-teal-500">Portal</span>
                </div>
                <nav className="space-x-8">
                    <a href="/" className="text-black font-bold text-lg hover:text-teal-800">Home</a>
                    <a href="/" className="text-black font-bold text-lg hover:text-teal-800">Jobs</a>
                    <a href="/" className="text-black font-bold text-lg hover:text-teal-800">Browse</a>
                </nav>
                <div className="space-x-4">
                    <button className="text-black border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">Login</button>
                    <button className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700">Signup</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="text-center mt-10">
                <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs">No. 1 Job Hunt Website</span>
                <h1 className="text-5xl font-bold mt-20">
                    Search, Apply &amp; <span className="text-teal-800">Land Your Ideal Job</span>
                </h1>
                <p className="text-gray-500 mt-20 mb-8">
                    Discover your dream job across industries, cities, and companies.
                </p>
                <div className="flex justify-center items-center space-x-2 mb-12">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        className="w-full max-w-lg py-3 px-4 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none"
                    />
                   <button className="bg-teal-600 text-white py-3 px-5 rounded-r-md hover:bg-teal-700 flex items-center justify-center">
                   <button className="bg-teal-600 text-white py-3 px-5 rounded-r-md hover:bg-teal-700 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-6-6 6-6" />
        </svg>
    </button>
    </button>
                </div>

                <div className="flex justify-center space-x-6">
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
                        <div className="p-4 bg-white shadow-md rounded-lg">
                            <p className="text-xl font-bold">Frontend Dev</p>
                            <p className="text-gray-600">Transmogrify</p>
                            <p className="text-gray-500">Kolkata</p>
                        </div>
                        <div className="p-4 bg-white shadow-md rounded-lg">
                            <p className="text-xl font-bold">Backend Dev</p>
                            <p className="text-gray-600">Transmogrify</p>
                            <p className="text-gray-500">Kolkata</p>
                        </div>
                        <div className="p-4 bg-white shadow-md rounded-lg">
                            <p className="text-xl font-bold">UI/UX Designer</p>
                            <p className="text-gray-600">Transmogrify</p>
                            <p className="text-gray-500">Kolkata</p>
                        </div>
                        {/* Add more job openings here */}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center p-5 border-t-2 border-gray-100">
                <div className="text-gray-500">
                    © 2024 Transmogrify. All rights reserved.
                </div>
                <div className="flex justify-center space-x-12 mt-6">
                    <a href="/" className="text-gray-400 hover:text-gray-600">
                        <i className="fab fa-facebook-f fa-2x"></i>
                    </a>
                    <a href="/" className="text-gray-400 hover:text-gray-600">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="/" className="text-gray-400 hover:text-gray-600">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
