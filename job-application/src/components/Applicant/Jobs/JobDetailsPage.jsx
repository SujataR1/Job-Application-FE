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
    const [flagTag, setFlagTag] = useState(""); // Store flag type (e.g., "Spam")
    const [flagReason, setFlagReason] = useState(""); // Store the reason for flagging
    const [selectedCompany, setSelectedCompany] = useState(jobListings[0]); // Assume job is selected
    const [isFlagged, setIsFlagged] = useState(false); // Track if the company is flagged
    const [isFlagFormVisible, setIsFlagFormVisible] = useState(false); // Track if the flag form is visible

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

    // Function to handle flagging company
    const flagCompany = async (event) => {
        event.preventDefault();

        if (!selectedCompany) {
            alert("Please select a company to flag.");
            return;
        }

        if (!flagTag || !flagReason) {
            alert("Please provide a flag type and a reason for flagging the company.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("User authentication token is missing. Please log in again.");
            return;
        }

        try {
            // Ensure companyId is a string
            const response = await fetch('http://localhost:7000/companies/create-flag', {
                method: 'POST',
                headers: {
                    'Authorization': ` ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyId: String(selectedCompany.id), // Ensure the companyId is a string
                    flagTag: flagTag,
                    reasonForFlag: flagReason,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Unable to flag the company.");
            }

            alert("Company flagged successfully.");

            // Store companyId in localStorage after flag creation
            localStorage.setItem('companyId', String(selectedCompany.id)); // Ensure it's a string

            setIsFlagged(true); // Update state to show that the company is flagged
            setIsFlagFormVisible(false); // Hide the form after successful flagging
        } catch (error) {
            console.error("Error flagging company:", error);
            alert(`Error: ${error.message}`);
        }
    };

    // Function to show the flagging form
    const showFlagForm = () => {
        setIsFlagFormVisible(true);
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

                {/* Flag Company Button */}
                <button className="flag-button" onClick={showFlagForm}>
                    {isFlagged ? "Company Flagged" : "Flag Company"}
                </button>
            </div>

            {/* Flagging Form (only visible when isFlagFormVisible is true) */}
            {isFlagFormVisible && (
                <form onSubmit={flagCompany}>
                    <label htmlFor="flagTag">Select Flag Type:</label>
                    <select id="flagTag" value={flagTag} onChange={(e) => setFlagTag(e.target.value)}>
                        <option value="Spam">Spam</option>
                        <option value="Abusive">Abusive Content</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="flagReason">Provide Reason:</label>
                    <textarea
                        id="flagReason"
                        value={flagReason}
                        onChange={(e) => setFlagReason(e.target.value)}
                    ></textarea>

                    <button type="submit">Submit Flag</button>
                </form>
            )}

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
                    <p>You Have applied for this Job. Check the status in your dashboard!</p>
                ) : (
                    <button className="apply-button" onClick={handleApplyClick}>
                        Apply Now
                    </button>
                )}
            </div>

            {/* Modal for confirmation after applying */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thank you for applying!</h2>
                        <p>We will get back to you shortly.</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetailsPage;
