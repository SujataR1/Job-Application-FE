import React from 'react';
import './VisualResume.css';

const VisualResume = () => {
    const personalInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        location: 'Bengaluru, India',
        profilePicture: 'https://via.placeholder.com/150', // Replace with actual image URL
    };

    const educationData = [
        { degree: 'Bachelor of Technology', major: 'Computer Science', university: 'ABC University', year: '2014 - 2018' },
        { degree: 'High School', major: 'Science', university: 'XYZ High School', year: '2012 - 2014' },
    ];

    const experienceData = [
        { title: 'Software Engineer', company: 'Tech Solutions', year: '2018 - Present', description: 'Developing web applications using React and Node.js.' },
        { title: 'Intern', company: 'ABC Corp', year: '2017 - 2018', description: 'Assisted in developing internal tools and applications.' },
    ];

    const skillsData = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'];

    return (
        <div className="visual-resume">
            <header className="resume-header">
                <img src={personalInfo.profilePicture} alt="Profile" className="profile-picture" />
                <h1>{personalInfo.name}</h1>
                <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
            </header>

            <section className="resume-section">
                <h2>Education</h2>
                <ul>
                    {educationData.map((edu, index) => (
                        <li key={index}>
                            <strong>{edu.degree} in {edu.major}</strong> - {edu.university} ({edu.year})
                        </li>
                    ))}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Experience</h2>
                <ul>
                    {experienceData.map((exp, index) => (
                        <li key={index}>
                            <strong>{exp.title}</strong> at {exp.company} ({exp.year})<br />
                            <span>{exp.description}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Skills</h2>
                <ul className="skills-list">
                    {skillsData.map((skill, index) => (
                        <li key={index} className="skill-item">{skill}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default VisualResume;
