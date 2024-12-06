// import React, { useState } from 'react';

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         password: '',
//         userType: '',
//         profile: null,
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleFileChange = (e) => {
//         setFormData({
//             ...formData,
//             profile: e.target.files[0],
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create FormData object to send form data along with file
//         const data = new FormData();
//         data.append('fullName', formData.fullName);
//         data.append('email', formData.email);
//         data.append('phoneNumber', formData.phone);  // Make sure the backend expects 'phoneNumber', not 'phone'
//         data.append('password', formData.password);
//         data.append('userType', formData.userType);
//         data.append('profile', formData.profile);

//         // Handle radio buttons (lookingForApply and lookingForRecruit)
//         if (formData.userType === 'Student') {
//             data.append('lookingForApply', 'yes');
//             data.append('lookingForRecruit', false);
//         } else if (formData.userType === 'Recruiter') {
//             data.append('lookingForRecruit', true);
//             data.append('lookingForApply', 'no');
//         }

//         // Debug: Log FormData to ensure everything is appended correctly
//         for (let pair of data.entries()) {
//             console.log(pair[0] + ": " + pair[1]);
//         }

//         try {
//             // Send POST request to the backend API
//             const response = await fetch('http://localhost:7000/auth/sign-up', {
//                 method: 'POST',
//                 body: data,
//             });

//             // Check if the response is successful
//             if (!response.ok) {
//                 throw new Error('Signup failed');
//             }

//             // Get the JSON response
//             const responseData = await response.json();
//             console.log('Signup successful:', responseData);

//             // Optionally, redirect the user or handle success
//             alert('Signup successful!');
//             // window.location.href = '/login'; // Redirect to login page

//         } catch (error) {
//             console.error('Error during signup:', error);
//             alert('Signup failed. Please try again.');
//         }
//     };


//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//                 <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Full Name</label>
//                         <input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             placeholder="Full Name"
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Phone Number</label>
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Phone Number"
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Password"
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">User Type</label>
//                         <div className="flex space-x-4">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="userType"
//                                     value="Student"
//                                     onChange={handleChange}
//                                     className="mr-2"
//                                 />
//                                 Looking for Apply
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="userType"
//                                     value="Recruiter"
//                                     onChange={handleChange}
//                                     className="mr-2"
//                                 />
//                                 Looking for Recruit
//                             </label>
//                         </div>
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700">Profile</label>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
//                     >
//                         Sign Up
//                     </button>
//                     <p className="text-gray-500 text-sm mt-4 text-center">
//                         Already have an account? <a href="/login" className="text-teal-600">Login</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;


import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: '', // 'Applicant' or 'Recruiter'
        profileImage: null, // To store file input
        lookingToApply: 'false', // Use 'false' as string for non-applicant
        lookingToRecruit: false, // Boolean for recruiter type
    });

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

        // Create FormData object to send form data along with file
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('password', formData.password);
        data.append('userType', formData.userType); // Send userType as 'Applicant' or 'Recruiter'

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
        } catch (error) {
            console.error('Error during signup:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
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
                            name="phoneNumber"
                            value={formData.phoneNumber}
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
                                    value="Applicant"
                                    checked={formData.userType === 'Applicant'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Looking for Apply (Applicant)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="Recruiter"
                                    checked={formData.userType === 'Recruiter'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Looking to Recruit (Recruiter)
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Profile Image</label>
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
