// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Make sure you have react-router-dom installed for navigation

// const Login = () => {
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: '',

//     });

//     const [error, setError] = useState('');
//     const navigate = useNavigate();  // Use this hook for redirection

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Clear any previous errors
//         setError('');

//         try {
//             // Send the login request to the backend API
//             const response = await fetch('http://localhost:7000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: loginData.email,
//                     password: loginData.password,
//                 }),
//             });

//             // If the response is not OK, throw an error
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Login failed');
//             }

//             // Get the response data (typically the JWT token and user info)
//             const responseData = await response.json();

//             console.log('Login successful:', responseData);

//             // Store JWT token in localStorage (or sessionStorage)
//             localStorage.setItem('authToken', responseData.token);

//             // Redirect to the dashboard
//             navigate('/dashboard'); // Replace '/dashboard' with the actual route for your dashboard page

//         } catch (error) {
//             console.error('Error during login:', error);
//             setError(error.message); // Show error message
//         }
//     };
//     return (

//         <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)'}}>
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
import { jwtDecode } from 'jwt-decode';  // Correct way to import jwtDecode

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // New state for forgot password
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle for forgot password form
    const navigate = useNavigate();  // Use this hook for redirection

    // Handle change of input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    // Handle forgot password form submission
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Send forgot password request to backend
            const response = await fetch('http://localhost:7000/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Password recovery failed');
            }

            // Inform the user that the password reset link was sent
            alert('Password recovery link sent to your email.');

            // Close the forgot password form and show login form again
            setIsForgotPassword(false);
        } catch (error) {
            console.error('Error during password recovery:', error);
            setError(error.message);  // Show error message if any
        }
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear previous error message

        try {
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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const token = response.headers.get('authorization')?.replace('Bearer ', '').trim();

            if (!token) {
                throw new Error('Invalid token received');
            }

            // Store the JWT token in localStorage
            localStorage.setItem('authToken', token);

            // Decode the token to check user type
            const decodedToken = jwtDecode(token);
            console.log('Decoded token:', decodedToken);

            const userType = decodedToken?.userType;

            if (userType === 'Applicant') {
                navigate('/applicant-dashboard');  // Redirect to Applicant Dashboard
            } else if (userType === 'Recruiter') {
                navigate('/recruiter-dashboard');  // Redirect to Recruiter Dashboard
            } else {
                throw new Error('Invalid user type');
            }

        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message);  // Set the error message to be shown in UI
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {!isForgotPassword ? (
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
                        <button
                            type="submit"
                            className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
                        >
                            Login
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <p
                            onClick={() => setIsForgotPassword(true)}
                            className="text-teal-600 text-sm mt-4 text-center cursor-pointer"
                        >
                            Forgot Password?
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPasswordSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Enter your email</label>
                            <input
                                type="email"
                                name="forgotPasswordEmail"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full"
                        >
                            Send Reset Link
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <p
                            onClick={() => setIsForgotPassword(false)}
                            className="text-teal-600 text-sm mt-4 text-center cursor-pointer"
                        >
                            Back to Login
                        </p>
                    </form>
                )}
                <p className="text-gray-500 text-sm mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-teal-600">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
