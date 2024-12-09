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
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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
                console.error('Error data from server:', errorData);
                throw new Error(errorData.message || 'Login failed');
            }

            const responseData = await response.json();
            console.log('API response:', responseData); // Log the entire response object

            // Check for user type and authorization before proceeding
            if (!responseData.user_type || !responseData.authorization) {
                throw new Error('User type or authorization is missing from the response');
            }

            console.log('User type:', responseData.user_type);
            console.log('Authorization token:', responseData.authorization);

            // Navigate based on user type
            if (responseData.user_type.toLowerCase() === 'recruiter') {
                navigate('/recruiter');
            } else if (responseData.user_type.toLowerCase() === 'applicant') {
                navigate('/applicant');
            } else {
                console.error('Unexpected user type:', responseData.user_type);
                throw new Error('Unexpected user type');
            }

            // Store the token in localStorage
            localStorage.setItem('authToken', responseData.authorization);

        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
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
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        Don't have an account? <a href="/signup" className="text-teal-600">Signup</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
