import React from 'react';
import ReviewMessage from './ReviewMessage';
const CustomerReviews: React.FC = () => {
  const totalReviews = (Math.random() * 500 + 1).toFixed(0);
  const averageRating = parseFloat((Math.random() * 4 + 1).toFixed(1));
  const ratingDistribution = [
    { stars: 5, percentage: 56 },
    { stars: 4, percentage: 19 },
    { stars: 3, percentage: 12 },
    { stars: 2, percentage: 7 },
    { stars: 1, percentage: 6 },
  ];

  // Function to generate star icons based on the average rating
  const renderStars = () => {
    const fullStars = Math.floor(averageRating); // Number of full stars
    const hasHalfStar = averageRating % 1 >= 0.5; // Determine if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex text-emerald-500 text-2xl">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index}>★</span> 
        ))}
        {hasHalfStar && <span>☆</span>} 
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index}>☆</span> 
        ))}
      </div>
    );
  };

  return (
    <div className="max-w items-center">
      <h2 className="text-xl font-semibold mb-4 text-emerald-600">Customer reviews</h2>
      <div className="flex gap-14 justify-between">
        {/* Left Side - Average Rating */}
        <div className="flex flex-col items-center mr-6">
          <div className="flex">
            <div className="text-4xl font-bold">{averageRating}</div>
            <div className="text-gray-500 text-3xl"> / 5</div>
          </div>
          <div>{renderStars()}</div>
          <div className="text-gray-500 text-sm">{totalReviews} reviews</div>
        </div>

        {/* Right Side - Rating Distribution */}
        <div className="flex flex-col justify-center space-y-2 flex-1">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center">
              <div className="text-gray-600 w-8">{rating.stars}★</div>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden mx-2">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>
              <div className="text-gray-600 w-8 text-right">{rating.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
      <ReviewMessage/>
    </div>
  );
};

export default CustomerReviews;
