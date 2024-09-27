import React from 'react';
import './ResumeDisplay.css'; // Import your CSS for styling

const ResumeDisplay = () => {
    const resumeData = {
        name: "John Doe",
        title: "Software Engineer",
        location: "Bengaluru, India",
        experience: [
            {
                company: "Tech Corp",
                role: "Full Stack Developer",
                duration: "Jan 2020 - Present",
                description: "Developed and maintained web applications using React and Node.js."
            },
            {
                company: "Web Solutions",
                role: "Frontend Developer",
                duration: "Jun 2018 - Dec 2019",
                description: "Created user-friendly interfaces with HTML, CSS, and JavaScript."
            }
        ],
        education: [
            {
                institution: "ABC University",
                degree: "Bachelor of Technology in Computer Science",
                year: "2014 - 2018"
            }
        ],
        skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"],
    };

    return (
        <div className="resume-display">
            <h1>{resumeData.name}</h1>
            <h2>{resumeData.title}</h2>
            <p className="location">{resumeData.location}</p>

            <section className="experience">
                <h3>Experience</h3>
                {resumeData.experience.map((job, index) => (
                    <div key={index} className="job">
                        <h4>{job.role} at {job.company}</h4>
                        <p><strong>Duration:</strong> {job.duration}</p>
                        <p>{job.description}</p>
                    </div>
                ))}
            </section>

            <section className="education">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="edu">
                        <h4>{edu.degree}</h4>
                        <p><strong>{edu.institution}</strong> ({edu.year})</p>
                    </div>
                ))}
            </section>

            <section className="skills">
                <h3>Skills</h3>
                <ul>
                    {resumeData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ResumeDisplay;
