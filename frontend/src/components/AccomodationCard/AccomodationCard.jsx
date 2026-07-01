import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import "./AccomodationCard.css";

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
    ? `/uploads/${images[0].replace(/\\/g, "/").replace("src/uploads/", "")}`
    : "/images/placeholder.jpg";

  return (
    <div
      className="accommodation_card"
      onClick={() => navigate(`/listings/${_id}`)}
    >
      <div className="card_image_container">
        <img src={imageUrl} alt={title} className="card_image" />
      </div>

      <div className="card_details">
        <div className="card_header">
          <div>
            <p className="card_type">
              {type} in {location}
            </p>
            <h3 className="card_title">{title}</h3>
          </div>
          <button
            className="wishlist_btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
          >
            {isWishlisted ? (
              <FaHeart className="heart_icon filled" />
            ) : (
              <FaRegHeart className="heart_icon" />
            )}
          </button>
        </div>

        <hr className="card_divider" />

        <p className="card_specs">
          {guests} guests · {type} · {bedrooms} beds · {bathrooms} bath
        </p>
        <p className="card_amenities">{amenities.join(" · ")}</p>

        <hr className="card_divider" />

        <div className="card_footer">
          <div className="card_rating">
            <FaStar className="star_icon" />
            <span>{rating || "New"}</span>
            <span className="reviews">({reviews || 0} reviews)</span>
          </div>
          <div className="card_price">
            <span className="price">R{base_price}</span>
            <span className="per_night"> /night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
