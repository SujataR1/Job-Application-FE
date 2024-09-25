import React from 'react';
import './ResumeQualityScore.css';

const ResumeQualityScore = () => {
    const plans = [
        { name: 'Basic', price: 0, score: '50%', features: ['Basic resume analysis', '1 free revision'] },
        { name: 'Pro', price: 199, score: '75%', features: ['In-depth resume analysis', '3 free revisions', 'Interview tips'] },
        { name: 'Premium', price: 399, score: '90%', features: ['Comprehensive resume analysis', 'Unlimited revisions', 'Personalized coaching'] },
    ];

    return (
        <div className="ResumeQualityScore">
            <h1>Resume Quality Score Plans</h1>
            <div className="plans-container">
                {plans.map((plan, index) => (
                    <div key={index} className="plan-card">
                        <h2>{plan.name}</h2>
                        <p className="price">${plan.price}</p>
                        <p className="score">Quality Score: <strong>{plan.score}</strong></p>
                        <h3>Features:</h3>
                        <ul>
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                        <button className="buy-button">Choose Plan</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeQualityScore;
