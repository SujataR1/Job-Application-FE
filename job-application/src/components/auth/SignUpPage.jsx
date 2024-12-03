import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        userType: '',
        profile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Here, you can send data to your backend or handle submission
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)'}}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">User Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="Student"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Student
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="Recruiter"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Recruiter
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Profile</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
                    >
                        Sign Up
                    </button>
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        Already have an account? <a href="/login" className="text-teal-600">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
