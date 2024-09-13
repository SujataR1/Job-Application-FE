import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Jobs from './components/JobPage';
import SignUpPage from "./components/auth/SignUpPage"; // The new SignUp component
import Login from './pages/Login';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Page */}
                <Route path="/login" element={<Login />} />
                {/* Add more routes here as needed */}
            </Routes>
        </Router>
    );
};

export default App;
