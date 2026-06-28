import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaStar } from 'react-icons/fa';

function AccommodationCard({ accommodation }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const {
    _id,
    title,
    type,
    location,
    guests,
    bedrooms,
    bathrooms,
    amenities,
    rating,
    reviews,
    base_price,
    images,
  } = accommodation;

  const imageUrl = images?.[0]
    ? `http://localhost:3000/uploads/${images[0].replace(/\\/g, "/").replace("src/uploads/", "")}`
    : "/images/placeholder.jpg";

  return (
    <div
      className="accommodation-card"
      onClick={() => navigate(`/listings/${_id}`)}
    >
      <div className="card-image-container">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>

      <div className="card-details">
        <div className="card-header">
          <div>
            <p className="card-type">
              {type} in {location}
            </p>
            <h3 className="card-title">{title}</h3>
          </div>
          <button
            className="wishlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
          >
            {isWishlisted ? (
              <FaHeart className="heart-icon filled" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
          </button>
        </div>

        <hr className="card-divider" />

        <p className="card-specs">
          {guests} guests · {type} · {bedrooms} beds · {bathrooms} bath
        </p>
        <p className="card-amenities">{amenities.join(" · ")}</p>

        <hr className="card-divider" />

        <div className="card-footer">
          <div className="card-rating">
            <FaStar className="star-icon" />
            <span>{rating || "New"}</span>
            <span className="reviews">({reviews || 0} reviews)</span>
          </div>
          <div className="card-price">
            <span className="price">${base_price}</span>
            <span className="per-night"> /night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
