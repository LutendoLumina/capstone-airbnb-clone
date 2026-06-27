import "./ReviewsSection.css";

function ReviewsSection({ rating, reviews, specificRatings }) {
  const ratingCategories = [
    { label: "Cleanliness", value: specificRatings.cleanliness },
    { label: "Communication", value: specificRatings.communication },
    { label: "Check-in", value: specificRatings.checkIn },
    { label: "Accuracy", value: specificRatings.accuracy },
    { label: "Location", value: specificRatings.location },
    { label: "Value", value: specificRatings.value },
  ];

  return (
    <div className="reviews-section">
      <h3>⭐ {rating} · {reviews} reviews</h3>
      <div className="rating-categories">
        {ratingCategories.map((cat) => (
          <div key={cat.label} className="rating-category">
            <span className="category-label">{cat.label}</span>
            <div className="rating-bar-container">
              <div
                className="rating-bar"
                style={{ width: `${(cat.value / 5) * 100}%` }}
              />
            </div>
            <span className="category-value">{cat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;