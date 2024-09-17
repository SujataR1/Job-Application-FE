// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/Home/Homepage';
// import Jobs from './components/JobPage';
// import SignUpPage from "./components/auth/SignUpPage"; // The new SignUp component
// import Login from './components/auth/Login';
// import Navbar from './components/Navbar/Navbar';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const App = () => {
//     return (
//         <Router>
             
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/jobs" element={<Jobs />} />
//                 <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Page */}
//                 <Route path="/login" element={<Login />} />
//                 {/* Add more routes here as needed */}
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import Sales from './components/Categories/SalesJobs/Sales';

import Jobs from './components/JobPage';
import SignUpPage from './components/auth/SignUpPage'; // The new SignUp component
import Login from './components/auth/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // Import Footer
import '@fortawesome/fontawesome-free/css/all.min.css';
const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/sales-jobs" element={<Sales />} /> {/* SalesJobs component */}
                {/* Add more routes here as needed */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
