import React, { useState } from 'react';
import './InterviewQuestion.css'; // Import CSS for styling

const interviewQuestionsData = {
    Big4: [
        {
            question: "What is your biggest weakness?",
            answer: "My biggest weakness is that I sometimes take on too many projects at once."
        },
        {
            question: "Describe a challenging project you've worked on.",
            answer: "I led a team that migrated data to a new platform."
        },
        {
            question: "How do you handle tight deadlines?",
            answer: "I prioritize my tasks and focus on the most critical ones first."
        },
        {
            question: "Why do you want to work for our company?",
            answer: "I admire your commitment to innovation and growth."
        },
        {
            question: "How do you stay updated on industry trends?",
            answer: "I subscribe to industry publications and attend webinars."
        },
        // Add more Big4 questions
    ],
    MNC: [
        {
            question: "What is your approach to team collaboration?",
            answer: "I believe in open communication and setting clear goals."
        },
        {
            question: "Describe a situation where you resolved a conflict.",
            answer: "I facilitated a meeting to discuss differing opinions and find common ground."
        },
        {
            question: "What motivates you in a work environment?",
            answer: "I am motivated by opportunities for growth and learning."
        },
        // Add more MNC questions
    ],
    Startups: [
        {
            question: "How do you adapt to fast-paced environments?",
            answer: "I prioritize flexibility and maintaining focus on goals."
        },
        {
            question: "What role do you typically take in team projects?",
            answer: "I often take the initiative and lead by example."
        },
        {
            question: "How do you handle ambiguity in your work?",
            answer: "I clarify objectives with stakeholders and take actionable steps."
        },
        // Add more Startup questions
    ],
};

const InterviewQuestion = () => {
    const [selectedCategory, setSelectedCategory] = useState('Big4');
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedQuestionIndex(null); // Reset the selected question index when category changes
    };

    const handleQuestionClick = (index) => {
        setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
    };

    return (
        <div className="InterviewQuestion">
            <h1>Interview Questions</h1>
            <div className="filter">
                <label htmlFor="category-select">Select Category:</label>
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="Big4">Big 4</option>
                    <option value="MNC">MNC</option>
                    <option value="Startups">Startups</option>
                </select>
            </div>
            <div className="questions-list">
                {interviewQuestionsData[selectedCategory].map((item, index) => (
                    <div key={index} className="question-card">
                        <h3 onClick={() => handleQuestionClick(index)} className="question">
                            {item.question}
                        </h3>
                        {selectedQuestionIndex === index && (
                            <p className="answer">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewQuestion;
