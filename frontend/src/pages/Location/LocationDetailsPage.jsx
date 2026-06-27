import { useParams } from "react-router-dom";
import accommodations from "../../data/accomodations";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import CostCalculator from "../../components/CostCalculator/CostCalculator";
import AmenitiesList from "../../components/AmenitiesList/AmenitiesList";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import "./LocationDetailsPage.css";

function LocationDetailsPage() {
  const { id } = useParams();
  const accommodation = accommodations.find((a) => a.id === parseInt(id));

  if (!accommodation) {
    return <div className="not-found">Listing not found.</div>;
  }

  const {
    title,
    type,
    location,
    description,
    guests,
    bedrooms,
    bathrooms,
    amenities,
    rating,
    reviews,
    price,
    images,
    host,
    enhancedCleaning,
    selfCheckIn,
    specificRatings,
  } = accommodation;

  return (
    <div className="details-page">
      {/* Heading */}
      <div className="details-heading">
        <h1>{title}</h1>
        <div className="details-subheading">
          <span className="details-rating">⭐ {rating}</span>
          <span className="dot">·</span>
          <span className="details-reviews">{reviews} reviews</span>
          <span className="dot">·</span>
          <span className="details-location">{location}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} />

      {/* Two Column Layout */}
      <div className="details-body">
        {/* Left Column */}
        <div className="details-left">
          {/* Host Info */}
          <div className="host-info">
            <div>
              <h2>{type} hosted by {host}</h2>
              <p>{guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms</p>
            </div>
            <div className="host-avatar">{host.charAt(0)}</div>
          </div>

          <hr className="details-divider" />

          {/* Highlights */}
          <div className="highlights">
            {enhancedCleaning && (
              <div className="highlight-item">
                <span className="highlight-icon">✨</span>
                <div>
                  <p className="highlight-title">Enhanced Clean</p>
                  <p className="highlight-desc">This host committed to Airbnb's enhanced cleaning process.</p>
                </div>
              </div>
            )}
            {selfCheckIn && (
              <div className="highlight-item">
                <span className="highlight-icon">🔑</span>
                <div>
                  <p className="highlight-title">Self check-in</p>
                  <p className="highlight-desc">Check yourself in with the keypad.</p>
                </div>
              </div>
            )}
            <div className="highlight-item">
              <span className="highlight-icon">🏠</span>
              <div>
                <p className="highlight-title">Entire home</p>
                <p className="highlight-desc">You'll have the apartment to yourself.</p>
              </div>
            </div>
          </div>

          <hr className="details-divider" />

          {/* Description */}
          <div className="description">
            <p>{description}</p>
          </div>

          <hr className="details-divider" />

          {/* Where you'll sleep */}
          <div className="sleep-section">
            <h3>Where you'll sleep</h3>
            <div className="bedroom-card">
              <span>🛏️</span>
              <p>Bedroom</p>
              <p>{bedrooms} queen bed{bedrooms > 1 ? "s" : ""}</p>
            </div>
          </div>

          <hr className="details-divider" />

          {/* Amenities */}
          <AmenitiesList amenities={amenities} />

          <hr className="details-divider" />

          {/* Reviews */}
          <ReviewsSection
            rating={rating}
            reviews={reviews}
            specificRatings={specificRatings}
          />

          <hr className="details-divider" />

          {/* Things to know */}
          <div className="things-to-know">
            <h3>Things to know</h3>
            <div className="know-grid">
              <div>
                <h4>House rules</h4>
                <ul>
                  <li>Check-in: After 4:00 PM</li>
                  <li>Checkout: 10:00 AM</li>
                  <li>Self check-in with lockbox</li>
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>No parties or events</li>
                </ul>
              </div>
              <div>
                <h4>Health & safety</h4>
                <ul>
                  <li>Enhanced cleaning process</li>
                  <li>Social distancing guidelines apply</li>
                  <li>Carbon monoxide alarm</li>
                  <li>Smoke alarm</li>
                </ul>
              </div>
              <div>
                <h4>Cancellation policy</h4>
                <ul>
                  <li>Free cancellation before Feb 14</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Cost Calculator */}
        <div className="details-right">
          <CostCalculator accommodation={accommodation} />
        </div>
      </div>
    </div>
  );
}

export default LocationDetailsPage;