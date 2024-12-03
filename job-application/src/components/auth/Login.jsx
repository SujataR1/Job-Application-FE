import React, { useState } from 'react';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData); // Here, you can send the login data to your backend for authentication
    };

    return (
        
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url(/images/background.png)'}}>
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
