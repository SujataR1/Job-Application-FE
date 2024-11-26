// import React, { useState } from 'react';

// const Login = () => {
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: '',
//         userType: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(loginData); // Here,
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//                 <h2 className="text-2xl font-bold mb-6">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={loginData.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             className="w-full p-3 border border-gray-300 rounded"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={loginData.password}
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
//                                 Looking For Apply
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="userType"
//                                     value="Recruiter"
//                                     onChange={handleChange}
//                                     className="mr-2"
//                                 />
//                                 Looking For Recruit
//                             </label>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
//                     >
//                         Login
//                     </button>
//                     <p className="text-gray-500 text-sm mt-4 text-center">
//                         Don't have an account? <a href="/signup" className="text-teal-600">Signup</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Make sure you have react-router-dom installed for navigation

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        userType: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();  // Use this hook for redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any previous errors
        setError('');

        try {
            // Send the login request to the backend API
            const response = await fetch('http://localhost:7000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                }),
            });

            // If the response is not OK, throw an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            // Get the response data (typically the JWT token and user info)
            const responseData = await response.json();

            console.log('Login successful:', responseData);

            // Store JWT token in localStorage (or sessionStorage)
            localStorage.setItem('authToken', responseData.token);

            // Redirect to the dashboard
            navigate('/dashboard'); // Replace '/dashboard' with the actual route for your dashboard page

        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message); // Show error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
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
                                Looking For Apply
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="userType"
                                    value="Recruiter"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Looking For Recruit
                            </label>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-600 text-sm mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
                    >
                        Login
                    </button>
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        Don't have an account? <a href="/signup" className="text-teal-600">Signup</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
