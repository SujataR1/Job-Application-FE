import React, { useState } from 'react';
import './CompanyReviews.css'; // Import your CSS for styling

const companyData = {
    name: 'Ola',
    rating: 3.4,
    reviews: 1900,
    industry: 'B2C',
    description: 'Ola is a leading ride-hailing service in India. It provides transportation services across various cities.',
    reviewsList: [
        { user: 'John Doe', rating: 4, comment: 'Great company to work with. Good work-life balance.' },
        { user: 'Jane Smith', rating: 3, comment: 'Decent workplace, but management needs improvement.' },
        { user: 'Alice Johnson', rating: 5, comment: 'Amazing culture and supportive colleagues.' },
        { user: 'Michael Brown', rating: 2, comment: 'Not a great place for growth, but good salary.' },
        { user: 'Emma Wilson', rating: 4, comment: 'Loved the team dynamics and company events.' },
        { user: 'James Taylor', rating: 3, comment: 'Okay experience, but could be better.' },
        { user: 'Sophia Davis', rating: 5, comment: 'Fantastic work environment with great benefits.' },
        { user: 'William Garcia', rating: 1, comment: 'Horrible management. I wouldn’t recommend it.' },
        { user: 'Olivia Martinez', rating: 4, comment: 'Solid company with good projects.' },
        { user: 'Liam Anderson', rating: 3, comment: 'Workload can be overwhelming at times.' },
    ],
};

const CompanyReviews = () => {
    const [newReview, setNewReview] = useState({ user: '', rating: '', comment: '' });
    const [reviews, setReviews] = useState(companyData.reviewsList);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReviews([...reviews, newReview]);
        setNewReview({ user: '', rating: '', comment: '' });
    };

    return (
        <div className="company-reviews">
            <h1>{companyData.name} Reviews</h1>
            <div className="company-details">
                <p><strong>Industry:</strong> {companyData.industry}</p>
                <p><strong>Average Rating:</strong> {companyData.rating} ({companyData.reviews} reviews)</p>
                <p>{companyData.description}</p>
            </div>

            <h2>User Reviews</h2>
            <div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <h4>{review.user} <span className="review-rating">({review.rating} ★)</span></h4>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            <h2>Add Your Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <input
                    type="text"
                    name="user"
                    placeholder="Your Name"
                    value={newReview.user}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    required
                />
                <textarea
                    name="comment"
                    placeholder="Your Review"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default CompanyReviews;
