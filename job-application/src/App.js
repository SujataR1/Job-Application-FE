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
import Marketing from './components/Categories/Marketingjobs/Marketing';
import DataScienceJobs from './components/Categories/DataScience/DataScience'
import HR from './components/Categories/HR/HR';
import SkilledManPowerjobs from './components/Categories/SkilledmanPower/Skilled';
import Engineering from './components/Categories/Engineeringjobs/Engineering';
import JobsInDelhi from './components/Categories/JobInDelhi/JobsInDelhi';
import JobsInMumbai from './components/Categories/jobsinmumbai/JobsInMumbai';
import JobsInBangalore from './components/Categories/jobsinbangalore/JobsInBangalore';
import JobsInHyderabad from './components/Categories/jobsinhyderabad/JobsInHyderabad';
import JobsInChennai from './components/Categories/jobsinchennai/JobsInChennai';
import JobsInPune from './components/Categories/jobsinpune/JobsInPune';
import MncJobs from './components/Categories/mncjobs/MncJobs';
import RemoteJobs from './components/Categories/remotejob/RemoteJobs';
import WorkFromHomeJobs from './components/Categories/workfromhomejobs/WorkFromHomeJobs';
import WalkInJobs from './components/Categories/walkinjobs/WalkInJobs';
import PartTimeJobs from './components/Categories/parttimejobs/PartTimeJobs';

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
                <Route path="/marketing-jobs" element={<Marketing />} />
                <Route path="/data-science-jobs" element={<DataScienceJobs />} />
                <Route path="/hr-jobs" element={<HR />} />
                <Route path="/manpower-jobs" element={<SkilledManPowerjobs />} />
                <Route path="/engineering-jobs" element={<Engineering />} />
                <Route path="/jobs-in-delhi" element={<JobsInDelhi />} />
                <Route path="/jobs-in-mumbai" element={<JobsInMumbai />} />
                <Route path="/jobs-in-bangalore" element={<JobsInBangalore />} />
                <Route path="/jobs-in-hyderabad" element={<JobsInHyderabad />} />
                <Route path="/jobs-in-chennai" element={<JobsInChennai />} />
                <Route path="/jobs-in-pune" element={<JobsInPune />} />
                <Route path="/mnc-jobs" element={<MncJobs />} /> {/* Route for MNC Jobs */}
                <Route path="/remote-jobs" element={<RemoteJobs />} />
                <Route path="/work-from-home-jobs" element ={<WorkFromHomeJobs />} />
                <Route path="/walk-in-jobs" element ={<WalkInJobs />} />
                <Route path="/part-time-jobs" element={<PartTimeJobs />} />

                {/* Add more routes here as needed */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
