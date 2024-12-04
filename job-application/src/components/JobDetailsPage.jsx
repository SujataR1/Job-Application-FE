import React from "react";
import { useParams } from "react-router-dom";

const JobDetailsPage = () => {
    const { jobId } = useParams(); // Get job ID from URL

    // Sample job listings data for fetching the job details
    const jobListings = [
        {
            id: 1,
            title: "Business Development Executive",
            company: "DV Analytics",
            location: "Bangalore",
            salary: "₹ 3,00,000 - 4,00,000",
            experience: "0-5 years",
            posted: "3 weeks ago",
            description: "This is a detailed job description for Business Development Executive.",
            isHiring: true,
        },
        {
            id: 2,
            title: "Financial Sales Officer",
            company: "WeMakeScholars",
            location: "Hyderabad",
            salary: "₹ 4,00,000 - 4,30,000",
            experience: "0-1 years",
            posted: "1 week ago",
            description: "This is a detailed job description for Financial Sales Officer.",
            isHiring: true,
        },
        // Add more jobs as needed
    ];

    // Find the job by ID
    const job = jobListings.find((job) => job.id === parseInt(jobId));

    if (!job) {
        return <p>Job not found</p>;
    }

    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Posted:</strong> {job.posted}</p>
            <h3>Job Description</h3>
            <p>{job.description}</p>
        </div>
    );
};

export default JobDetailsPage;
