import React, { useState } from 'react';
import './ResumeCritique.css'; // Import your CSS for styling

const ResumeCritique = () => {
    const [resume, setResume] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setResume(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulating feedback submission
        setFeedback("Your resume has been submitted for critique. Expect feedback within 24 hours.");
        setSubmitted(true);
        setResume('');
    };

    return (
        <div className="resume-critique">
            <h1>Resume Critique Service</h1>
            <p>Submit your resume for a professional critique and improve your chances of landing your dream job.</p>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={resume}
                    onChange={handleInputChange}
                    placeholder="Paste your resume text here..."
                    rows="10"
                    required
                />
                <button type="submit">Submit Resume</button>
            </form>

            {submitted && (
                <div className="feedback-message">
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
};

export default ResumeCritique;
