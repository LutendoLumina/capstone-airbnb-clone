import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import "./AccomodationCard.css";

function AccommodationCard({ accommodation }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const {
    id,
    title,
    type,
    location,
    guests,
    bedrooms,
    bathrooms,
    amenities,
    rating,
    reviews,
    price,
    images,
  } = accommodation;

  return (
    <div className="accommodation-card" onClick={() => navigate(`/listings/${id}`)}>
      {/* Image */}
      <div className="card-image-container">
        <img
          src={images[0]}
          alt={title}
          className="card-image"
        />
      </div>

      {/* Details */}
      <div className="card-details">
        <div className="card-header">
          <div>
            <p className="card-type">{type} in {location}</p>
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
            <span>{rating}</span>
            <span className="reviews">({reviews} reviews)</span>
          </div>
          <div className="card-price">
            <span className="price">${price}</span>
            <span className="per-night"> /night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;