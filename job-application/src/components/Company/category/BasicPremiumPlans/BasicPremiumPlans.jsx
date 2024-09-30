import React, { useState, useMemo } from 'react';
import './BasicPremiumPlans.css'; // Import your CSS for styling

const basicPremiumPlansData = [
    { name: 'Basic Plan', features: ['Feature 1', 'Feature 2'], price: '$10/month' },
    { name: 'Standard Plan', features: ['Feature 1', 'Feature 2', 'Feature 3'], price: '$20/month' },
    { name: 'Premium Plan', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], price: '$30/month' },
];

const BasicPremiumPlans = () => {
    const [filters, setFilters] = useState({
        planType: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const filteredPlans = useMemo(() => {
        return basicPremiumPlansData.filter((plan) => {
            return (
                !filters.planType || plan.name.toLowerCase().includes(filters.planType.toLowerCase())
            );
        });
    }, [filters]);

    return (
        <div className="BasicPremiumPlans">
            <h1>Basic and Premium Plans</h1>

            <div className="sidebar">
                <h2>All Filters</h2>
                
                {/* Plan Type Filter */}
                <h3>Plan Type</h3>
                <input 
                    type="text" 
                    name="planType" 
                    placeholder="Search Plan Type" 
                    onChange={handleFilterChange} 
                />
            </div>

            <div className="plans-list">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan, index) => (
                        <div key={index} className="plan-card">
                            <h3>{plan.name}</h3>
                            <p><strong>Price:</strong> {plan.price}</p>
                            <h4>Features:</h4>
                            <ul>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No plans found.</p>
                )}
            </div>
        </div>
    );
};

export default BasicPremiumPlans;
