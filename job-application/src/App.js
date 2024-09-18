import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import Sales from './components/Categories/SalesJobs/Sales';
import IT from './components/Categories/ITjobs/ITjobs';
import Jobs from './components/JobPage';
import SignUpPage from './components/auth/SignUpPage'; // The new SignUp component
import Login from './components/auth/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // Import Footer
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataScience from './components/DataScience/DataScience';
const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/it-jobs" element={<IT />} />
                <Route path="/sales-jobs" element={<Sales />} /> {/* SalesJobs component */}
                <Route path="//data-science-jobs" element={<DataScience />} />
                {/* Add more routes here as needed */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
