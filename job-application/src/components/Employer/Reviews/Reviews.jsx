import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  const dummyReviews = [
    { name: 'Alice', comment: 'Great employer! Really supportive.', rating: 5 },
    { name: 'Bob', comment: 'Had a fantastic experience working with them.', rating: 4 },
    { name: 'Charlie', comment: 'Good environment but room for improvement.', rating: 3 },
    { name: 'David', comment: 'Very professional and welcoming team.', rating: 5 },
    { name: 'Eva', comment: 'Great place to work but could improve communication.', rating: 4 }
  ];

  useEffect(() => {
    setReviews(dummyReviews);
  }, []);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="flex">
        <EmployerSidebar />
        <div className="flex-1 p-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Employer Reviews
              </h2>

              <div className="text-center mb-8">
                <h4 className="text-xl font-semibold text-gray-700">
                  Average Rating: {calculateAverageRating()}
                </h4>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 sm:mb-0">
                          {review.name}
                        </h3>
                        <div className="flex space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No reviews yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;