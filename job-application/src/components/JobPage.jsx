import React from 'react';
import JobFilters from '../components/JobFilters';
import JobList from '../components/JobList';

const initialJobs = [
    { title: 'Frontend Developer', company: 'Company A', location: 'Delhi NCR', salary: '0-40k' },
    { title: 'Backend Developer', company: 'Company B', location: 'Bangalore', salary: '42-1lakh' },
    { title: 'FullStack Developer', company: 'Company C', location: 'Hyderabad', salary: '1lakh to 5lakh' },
    // Add more jobs here
];

const Jobs = () => {
    // If you don't need to use `filters` or `setJobs`, remove them
    // const [filters, setFilters] = useState({});
    // const [jobs, setJobs] = useState(initialJobs);

    return (
        <div className="flex">
            <JobFilters />
            <JobList jobs={initialJobs} />
        </div>
    );
};

export default Jobs;
