import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./JobDetailsPage.css"; // Import the custom CSS file

const JobDetailsPage = () => {
    const { jobId } = useParams(); // Get job ID from URL

    // Sample job listings data
    const jobListings = [
        {
            id: 1,
            title: "Artificial Intelligence (AI) Work From Home Internship",
            company: "Attribution Private Limited",
            location: "Work from home",
            stipend: "₹ 8,500/month",
            duration: "6 Months",
            startDate: "Immediately",
            applyBy: "3 Jan' 25",
            description:
                "Selected intern's day-to-day responsibilities include developing voice and chat agents using Generative AI via Google Vertex AI, integrating systems, and training Generative AI Agents using machine learning tools in Python and prompt engineering.",
            responsibilities: [
                "Develop voice and chat agents using Generative AI via Google Vertex AI",
                "Integrate systems to function seamlessly",
                "Train Generative AI Agents using machine learning tools in Python and using prompt engineering",
            ],
            skills: [
                "Artificial Intelligence", "BIG DATA ANALYTICS", "Cloud Firestore", "CRM", "Data Science",
                "Data Structures", "Deep Learning", "Firebase", "Machine Learning", "MEAN/MERN Stack",
                "Natural Language Processing (NLP)", "Neural Networks", "Next.js", "Python", "Salesforce",
                "SQL", "Tailwind CSS", "WordPress",
            ],
            certifications: [
                "Learn Python", "Learn Voice App Development", "Learn WordPress", "Learn SQL",
                "Learn Data Structures", "Learn Machine Learning", "Learn Data Science",
                "Learn Neural Networks", "Learn Deep Learning",
            ],
            eligibility: [
                "Available for the work from home job/internship",
                "Can start between 2nd Dec'24 and 6th Jan'25",
                "Available for the duration of 6 months",
                "Have relevant skills and interests",
                "Women wanting to start/restart their career can also apply",
            ],
            otherRequirements:
                "You should have a passion for AI and be hungry to learn and build for the future, now. This is the future of our world, only those who understand this truth need apply for this internship. This is expected to turn into a job, then a career.",
            perks: ["Certificate", "Letter of recommendation", "Job offer"],
            additionalInfo:
                "On successful conversion to a permanent employee, the candidate can expect a salary of Rs. 300000 to 500000 per year.",
            openings: 2,
            companyDescription:
                "At Attribution, we are paving the way for AI in the medical field. With easy-to-configure affordable voice, SMS, video, and social media AI, we augment traditional staff capabilities and create impeccable patient experiences.",
            activity: {
                hiringSince: "November 2024",
                opportunitiesPosted: 2,
                candidatesHired: 1,
            },
        },
    ];

    // Ensure useState is called unconditionally, at the top of the component
    const [isApplied, setIsApplied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

    // Find the job by ID
    const job = jobListings.find((job) => job.id === parseInt(jobId));

    if (!job) {
        return <p>Job not found</p>;
    }

    // Handle Apply Now button click
    const handleApplyClick = () => {
        setIsApplied(true);
        setIsModalOpen(true); // Open the modal
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="job-details">
            <div className="job-header">
                <h1 className="job-title">{job.title}</h1>
                <div className="job-info">
                    <p><strong>{job.company}</strong></p>
                    <p>{job.location}</p>
                    <p>Start Date: {job.startDate} | Duration: {job.duration} | Stipend: {job.stipend}</p>
                    <p>APPLY BY: {job.applyBy}</p>
                </div>
            </div>

            <div className="job-actions">
                <button className="contact-hr-button">Contact HR</button>
                <button className="save-button">Save</button>
                <button className="share-button">Share</button>
            </div>

            <hr />

            <div className="job-description">
                <h2>About the work from home job/internship</h2>
                <ul>
                    {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="skills-required">
                <h2>Skills Required</h2>
                <p>{job.skills.join(", ")}</p>
            </div>

            <div className="certifications">
                <h2>Earn certifications in these skills</h2>
                <ul>
                    {job.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                    ))}
                </ul>
            </div>

            <div className="eligibility">
                <h2>Who can apply</h2>
                <ul>
                    {job.eligibility.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="other-requirements">
                <h2>Other requirements</h2>
                <p>{job.otherRequirements}</p>
            </div>

            <div className="perks">
                <h2>Perks</h2>
                <ul>
                    {job.perks.map((perk, index) => (
                        <li key={index}>{perk}</li>
                    ))}
                </ul>
            </div>

            <div className="additional-info">
                <h2>Additional Information</h2>
                <p>{job.additionalInfo}</p>
            </div>

            <div className="company-info">
                <h2>About Attribution Private Limited</h2>
                <p>{job.companyDescription}</p>
            </div>

            <div className="activity-box">
                <h2>Activity on Jobs</h2>
                <p>Hiring since {job.activity.hiringSince}</p>
                <p>{job.activity.opportunitiesPosted} opportunities posted</p>
                <p>{job.activity.candidatesHired} candidate hired</p>
            </div>

            <div className="job-actions">
                {isApplied ? (
                    <p>You Have applied for this Job. Will Get Back to you shortly</p>
                ) : (
                    <button className="apply-button" onClick={handleApplyClick}>Apply Now</button>
                )}
            </div>

            {/* Modal Pop-up */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="checkmark">✔</div> {/* Green checkmark */}
                        <h2>Applied Done</h2>
                        <p>You have successfully applied for the job!</p>
                        <button className="close-modal-button" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetailsPage;
