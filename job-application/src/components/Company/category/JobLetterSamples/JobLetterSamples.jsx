import React from 'react';
import './JobLetterSamples.css'; // Import your CSS for styling

const jobLetterSamples = [
    {
        title: 'Software Engineer',
        company: 'Tech Corp',
        sampleText: `Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position at Tech Corp. With my skills in JavaScript and React, I believe I would be a great fit for your team.\n\nThank you for considering my application.\n\nSincerely,\nJohn Doe`
    },
    {
        title: 'Data Scientist',
        company: 'Data Solutions',
        sampleText: `Dear Hiring Manager,\n\nI am excited to apply for the Data Scientist position at Data Solutions. My experience in data analysis and machine learning makes me a strong candidate for this role.\n\nLooking forward to discussing further.\n\nBest regards,\nJane Smith`
    },
    {
        title: 'Product Manager',
        company: 'Innovate Inc',
        sampleText: `Dear Hiring Manager,\n\nI am interested in the Product Manager position at Innovate Inc. My background in product development and project management equips me to contribute effectively.\n\nThank you for your time.\n\nBest,\nEmily Johnson`
    },
];

const JobLetterSamples = () => {
    return (
        <div className="JobLetterSamples">
            <h1>Job Letter Samples</h1>
            <div className="letter-samples-list">
                {jobLetterSamples.map((sample, index) => (
                    <div key={index} className="letter-sample-card">
                        <h2>{sample.title} at {sample.company}</h2>
                        <pre className="sample-text">{sample.sampleText}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobLetterSamples;
