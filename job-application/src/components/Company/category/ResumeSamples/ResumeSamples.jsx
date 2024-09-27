import React from 'react';
import './ResumeSamples.css'; // Import your CSS for styling

const resumeSamplesData = [
    { title: 'Software Engineer Resume', link: '#', description: 'A well-structured resume for software engineers highlighting technical skills.' },
    { title: 'Data Scientist Resume', link: '#', description: 'An effective resume template for data scientists focusing on analytics and data manipulation.' },
    { title: 'Product Manager Resume', link: '#', description: 'A detailed resume for product managers emphasizing project management and product design.' },
    { title: 'Graphic Designer Resume', link: '#', description: 'A creative resume template for graphic designers showcasing design skills and portfolio.' },
    { title: 'Marketing Specialist Resume', link: '#', description: 'A targeted resume for marketing specialists with a focus on marketing strategies and campaigns.' },
];

const ResumeSamples = () => {
    return (
        <div className="resume-samples">
            <h1>Resume Samples</h1>
            <p>Explore our curated list of resume samples to help you create your own standout resume.</p>

            <div className="resume-list">
                {resumeSamplesData.map((sample, index) => (
                    <div key={index} className="resume-card">
                        <h3>{sample.title}</h3>
                        <p>{sample.description}</p>
                        <a href={sample.link} className="download-link">Download Sample</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeSamples;
