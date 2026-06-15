import accommodations from "../data/accomodations";

const AccomodationCard = ({ place }) => {
  return (
    <div className="accom_card">
      {/* Left side: Image */}
      <div className="card_image">
        <img src={place.img} alt={place.title} />
      </div>

      {/* Right side: content */}
      <div className="card_content">
        {/* Top Content group */}
        <div className="card_header_details">
          <div className="card_meta">
            <span className="accom_type">{place_type}</span>
            <button>{place.isFavorite ? "❤️" : "🤍"} </button>
          </div>
        </div>

        <h3 className="accom_title">{place.title}</h3>
        <p className="accom_desc">{place.description}</p>
        <p className="accom_amenities">{place.amenities}</p>
      </div>

      {/* bottom content group */}
      <div className="card_footer">
        {/* rating */}
        <div className="accom_rating">
          <span className="rating_score">{place.rating.toFixed(1)}</span>
          <span className="rating_star">★</span>
          <span className="rating_count">({place.reviews} reviews)</span>
        </div>

        {/* price */}
        <div className="accom_price">
            <strong className="price_amount">${place.price}</strong>
            <span className="price_unit">/night</span>
        </div>
      </div>
    </div>
  );
};

export default AccomodationCard;
