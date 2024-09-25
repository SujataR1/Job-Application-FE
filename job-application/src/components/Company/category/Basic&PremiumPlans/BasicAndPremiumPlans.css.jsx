import React from 'react';
import './BasicAndPremiumPlans.css'; // Import your CSS for styling

const plansData = [
    {
        type: 'Basic Plan',
        price: '$0/month',
        features: [
            'Access to basic job listings',
            'Apply to jobs without a premium account',
            'Receive job alerts via email',
        ],
    },
    {
        type: 'Premium Plan',
        price: '$29/month',
        features: [
            'Access to all job listings',
            'Featured applications for increased visibility',
            'Priority customer support',
            'View salary insights',
            'Get interview preparation resources',
        ],
    },
];

const BasicAndPremiumPlans = () => {
    return (
        <div className="plans-container">
            <h1>Choose Your Plan</h1>
            <div className="plans-list">
                {plansData.map((plan, index) => (
                    <div key={index} className="plan-card">
                        <h2>{plan.type}</h2>
                        <p className="plan-price">{plan.price}</p>
                        <ul className="features-list">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="feature-item">{feature}</li>
                            ))}
                        </ul>
                        <button className="subscribe-button">Subscribe Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BasicAndPremiumPlans;
