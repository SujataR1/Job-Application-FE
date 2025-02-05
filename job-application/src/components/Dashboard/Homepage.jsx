import React from 'react';
import Header from '../Header/Header';

const HomePage = () => {
    return (
        <div className="font-sans bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: 'url(/images/background.png)' }}>
            {/* Ensure Navbar is placed here */}
            <Header />

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
        </div>
    );
};

export default HomePage;
