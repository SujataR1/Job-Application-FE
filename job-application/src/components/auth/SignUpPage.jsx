import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: '', // 'Applicant' or 'Recruiter'
        about: '',
        profileImage: null, // To store file input
        countryCode: '+91', // Fixed country code (India)
    });

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            profileImage: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine country code (+91) with the phone number
        const fullPhoneNumber = formData.countryCode + formData.phoneNumber;

        // Create FormData object to send form data along with file
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phoneNumber', fullPhoneNumber); // Send full phone number with country code
        data.append('password', formData.password);
        data.append('userType', formData.userType);
        data.append('about', formData.about);

        // Append the profile image correctly if selected
        if (formData.profileImage) {
            data.append('profileImage', formData.profileImage);
        }

        // Handle lookingToApply and lookingToRecruit based on userType
        if (formData.userType === 'Applicant') {
            data.append('lookingToApply', 'false'); // Applicant will not be looking to apply
            data.append('lookingToRecruit', false); // Applicant is not a recruiter
        } else if (formData.userType === 'Recruiter') {
            data.append('lookingToRecruit', true); // Recruiter is looking to recruit
            data.append('lookingToApply', 'false'); // Recruiter will not be looking to apply
        }


        // Ensure that 'userType' is selected
        if (!formData.userType) {
            alert('Please select a user type (Applicant or Recruiter)');
            return;
        }

        try {
            // Send POST request with FormData
            const response = await fetch('http://localhost:7000/auth/sign-up', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const responseData = await response.json();
            console.log('Signup successful:', responseData);
            alert('Signup successful!');

            // After successful signup, redirect to login page
            navigate('/login'); // Use navigate to redirect

        } catch (error) {
            console.error('Error during signup:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
            {/* Main Content */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full" style={{ marginLeft: '200px' }}>

                {/* Header Section */}
                <header className="bg-teal-600 text-white py-6 text-center shadow-lg mb-8">
                    <h1 className="text-3xl font-semibold">Sign Up to Join Us</h1>
                    <p className="mt-2 text-lg">Create an account and get started</p>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Full Name and Email fields side by side */}
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
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
                        <div>
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
                    </div>

                    {/* Password and Phone Number fields side by side */}
                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
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
                        <div>
                            <label className="block text-gray-700">Phone Number</label>
                            <div className="flex gap-2">
                                {/* Country Code is fixed as +91 */}

                                <select className="p-3 border border-gray-300 rounded-l w-1/3 bg-gray-200 text-gray-500"> <option value="+91">+91 (India)</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+61">+61 (Australia)</option>
                                    <option value="+81">+81 (Japan)</option></select>

                                {/* Phone Number Input */}
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit phone number"
                                    maxLength="10"
                                    className="w-2/3 p-3 border border-gray-300 rounded-r"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">About</label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            className="w-full p-3 border border-gray-300 rounded"
                            rows="3"
                        />
                    </div>

                    {/* Profile Image Upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* User Type Select Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700">User Type</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded"
                        >
                            <option value="">Select User Type</option>
                            <option value="Applicant">Looking to Apply (Applicant)</option>
                            <option value="Recruiter">Looking to Recruit (Recruiter)</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 "
                        style={{ width: '200px', marginLeft: '300px' }}
                    >
                        Sign Up
                    </button>

                    {/* Link to Login page */}
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        Already have an account? <a href="/login" className="text-teal-600">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;