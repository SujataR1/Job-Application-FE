import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="bg-[#2c3e50] font-sans">
            <header className="relative flex items-center justify-between px-6 py-4">
                <div className="text-3xl font-bold text-white">
                    <span className="text-[#f4a300]">Job</span>
                    <span className="text-white">Portal</span>
                    <span className="text-[#00a859]">by Transmogrify</span>
                </div>

                <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 mx-auto">
                    <Link to="/about-us" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
                        <FaHome className="mr-2" /> About Us
                    </Link>
                    <Link to="/people" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
                        <FaUsers className="mr-2" /> People
                    </Link>
                    <Link to="/jobs" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
                        <FaBriefcase className="mr-2" /> Jobs
                    </Link>
                    <Link to="/messages" className="text-white font-bold text-lg hover:text-teal-300 flex items-center">
                        <FaEnvelope className="mr-2" /> Messages
                    </Link>
                </nav>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                    <Link to="/login">
                        <button className="text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="text-white border-2 border-gray-300 px-4 py-2 rounded-md hover:bg-teal-700">
                            Signup
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default Header;
