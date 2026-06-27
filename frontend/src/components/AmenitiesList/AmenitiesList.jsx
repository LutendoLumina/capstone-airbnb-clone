import "./AmenitiesList.css";

function AmenitiesList({ amenities }) {
  return (
    <div className="amenities-section">
      <h3>What this place offers</h3>
      <div className="amenities-grid">
        {amenities.map((amenity, index) => (
          <div key={index} className="amenity-item">
            <span>✓</span>
            <p>{amenity}</p>
          </div>
        ))}
      </div>
      <button className="show-all-amenities-btn">
        Show all {amenities.length} amenities
      </button>
    </div>
  );
}

export default AmenitiesList;