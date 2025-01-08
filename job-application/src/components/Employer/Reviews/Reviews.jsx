import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; // For star icons
import './Reviews.css';
import EmployerNavbar  from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  // Dummy data for reviews
  const dummyReviews = [
    { name: 'Alice', comment: 'Great employer! Really supportive.', rating: 5 },
    { name: 'Bob', comment: 'Had a fantastic experience working with them.', rating: 4 },
    { name: 'Charlie', comment: 'Good environment but room for improvement.', rating: 3 },
    { name: 'David', comment: 'Very professional and welcoming team.', rating: 5 },
    { name: 'Eva', comment: 'Great place to work but could improve communication.', rating: 4 }
  ];

  // Simulate fetching reviews
  useEffect(() => {
    // Here you can replace the dummy data with API fetching logic
    setReviews(dummyReviews);
  }, []);

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place
  };

  return (
    <div className="network-page">
      <EmployerNavbar />
      <div className="network-content">
        <EmployerSidebar />
    <div className="reviews-page">
      <div className="reviews-container">
        <h2>Employer Reviews</h2>

        {/* Display Average Rating */}
        <div className="average-rating">
          <h4>Average Rating: {calculateAverageRating()}</h4>
        </div>

        {/* Display Reviews List */}
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <div className="review-rating">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ReviewsPage;
