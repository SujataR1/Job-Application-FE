import React, { useState } from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './TextResume.css'; // Import your CSS for styling

const TextResume = () => {
    const [resumeData, setResumeData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+123 456 7890",
        address: "1234 Main St, New York, NY 10001",
        objective: "A highly motivated software engineer with 5 years of experience in full-stack development. Seeking to apply technical skills in a dynamic work environment.",
        experience: [
            {
                title: "Senior Software Engineer",
                company: "TechCorp",
                duration: "Jan 2020 - Present",
                description: "Lead the front-end development team, built scalable React applications, and collaborated with cross-functional teams."
            }
        ],
        education: [
            {
                degree: "Bachelor of Technology in Computer Science",
                university: "ABC University",
                duration: "2013 - 2017",
                grade: "CGPA: 8.6/10"
            }
        ],
        skills: [
            "JavaScript", "React", "Node.js", "HTML", "CSS", "MongoDB", "SQL"
        ]
    });

    // Add new experience entry
    const addExperience = () => {
        setResumeData(prevState => ({
            ...prevState,
            experience: [...prevState.experience, { title: '', company: '', duration: '', description: '' }]
        }));
    };

    // Add new education entry
    const addEducation = () => {
        setResumeData(prevState => ({
            ...prevState,
            education: [...prevState.education, { degree: '', university: '', duration: '', grade: '' }]
        }));
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExperienceChange = (e, index, field) => {
        const { value } = e.target;
        const updatedExperience = [...resumeData.experience];
        updatedExperience[index][field] = value;
        setResumeData(prevState => ({
            ...prevState,
            experience: updatedExperience
        }));
    };

    const handleEducationChange = (e, index, field) => {
        const { value } = e.target;
        const updatedEducation = [...resumeData.education];
        updatedEducation[index][field] = value;
        setResumeData(prevState => ({
            ...prevState,
            education: updatedEducation
        }));
    };

    const handleSkillsChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...resumeData.skills];
        updatedSkills[index] = value;
        setResumeData(prevState => ({
            ...prevState,
            skills: updatedSkills
        }));
    };

    // Download PDF
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'resume',
    });

    return (
        <div className="text-resume-container">
            <div ref={componentRef}>
                <header className="resume-header">
                    <input
                        type="text"
                        name="name"
                        value={resumeData.name}
                        onChange={handleChange}
                        className="editable-input"
                    />
                    <input
                        type="email"
                        name="email"
                        value={resumeData.email}
                        onChange={handleChange}
                        className="editable-input"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={resumeData.phone}
                        onChange={handleChange}
                        className="editable-input"
                    />
                    <input
                        type="text"
                        name="address"
                        value={resumeData.address}
                        onChange={handleChange}
                        className="editable-input"
                    />
                </header>

                <section className="resume-section">
                    <h2>Objective</h2>
                    <textarea
                        name="objective"
                        value={resumeData.objective}
                        onChange={handleChange}
                        className="editable-textarea"
                    />
                </section>

                <section className="resume-section">
                    <h2>Experience</h2>
                    {resumeData.experience.map((exp, index) => (
                        <div key={index} className="resume-item">
                            <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => handleExperienceChange(e, index, 'title')}
                                className="editable-input"
                            />
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(e, index, 'company')}
                                className="editable-input"
                            />
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleExperienceChange(e, index, 'duration')}
                                className="editable-input"
                            />
                            <textarea
                                value={exp.description}
                                onChange={(e) => handleExperienceChange(e, index, 'description')}
                                className="editable-textarea"
                            />
                        </div>
                    ))}
                    <button onClick={addExperience} className="add-btn">Add More Experience</button>
                </section>

                <section className="resume-section">
                    <h2>Education</h2>
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="resume-item">
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(e, index, 'degree')}
                                className="editable-input"
                            />
                            <input
                                type="text"
                                value={edu.university}
                                onChange={(e) => handleEducationChange(e, index, 'university')}
                                className="editable-input"
                            />
                            <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => handleEducationChange(e, index, 'duration')}
                                className="editable-input"
                            />
                            <input
                                type="text"
                                value={edu.grade}
                                onChange={(e) => handleEducationChange(e, index, 'grade')}
                                className="editable-input"
                            />
                        </div>
                    ))}
                    <button onClick={addEducation} className="add-btn">Add More Education</button>
                </section>

                <section className="resume-section">
                    <h2>Skills</h2>
                    <ul className="skills-list">
                        {resumeData.skills.map((skill, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleSkillsChange(e, index)}
                                    className="editable-input"
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <button onClick={handlePrint} className="download-btn">Download Resume as PDF</button>
        </div>
    );
};

export default TextResume;
