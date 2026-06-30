import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import CostCalculator from "../../components/CostCalculator/CostCalculator";
import AmenitiesList from "../../components/AmenitiesList/AmenitiesList";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LocationDetailsPage.css";

function LocationDetailsPage() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  useEffect(() => {
    fetch(`http://localhost:3000/api/listings/public/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAccommodation(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load listing.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!accommodation)
    return <div className="not-found">Listing not found.</div>;

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
    base_price,
    images,
    enhancedCleaning,
    selfCheckIn,
    specificRatings,
  } = accommodation;

  const fixedImages = images.map(
    (img) =>
      `http://localhost:3000/uploads/${img.replace(/\\/g, "/").replace("src/uploads/", "")}`,
  );

  return (
    <div className="details-page">
      <div className="details-heading">
        <h1>{title}</h1>
        <div className="details-subheading">
          <span className="details-rating">⭐ {rating || "New"}</span>
          <span className="dot">·</span>
          <span className="details-reviews">{reviews || 0} reviews</span>
          <span className="dot">·</span>
          <span className="details-location">{location}</span>
        </div>
      </div>

      <ImageGallery images={fixedImages} />

      <div className="details-body">
        <div className="details-left">
          <div className="host-info">
            <div>
              <h2>{type} hosted by Host</h2>
              <p>
                {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms
              </p>
            </div>
            <div className="host-avatar">H</div>
          </div>

          <hr className="details-divider" />

          <div className="highlights">
            {enhancedCleaning && (
              <div className="highlight-item">
                <span className="highlight-icon">✨</span>
                <div>
                  <p className="highlight-title">Enhanced Clean</p>
                  <p className="highlight-desc">
                    Committed to Airbnb's enhanced cleaning process.
                  </p>
                </div>
              </div>
            )}
            {selfCheckIn && (
              <div className="highlight-item">
                <span className="highlight-icon">🔑</span>
                <div>
                  <p className="highlight-title">Self check-in</p>
                  <p className="highlight-desc">
                    Check yourself in with the keypad.
                  </p>
                </div>
              </div>
            )}
            <div className="highlight-item">
              <span className="highlight-icon">🏠</span>
              <div>
                <p className="highlight-title">Entire home</p>
                <p className="highlight-desc">
                  You'll have the apartment to yourself.
                </p>
              </div>
            </div>
          </div>

          <hr className="details-divider" />

          <div className="description">
            <p>{description}</p>
          </div>

          <hr className="details-divider" />

          <div className="sleep-section">
            <h3>Where you'll sleep</h3>
            <div className="bedroom-card">
              <span>🛏️</span>
              <p>Bedroom</p>
              <p>
                {bedrooms} queen bed{bedrooms > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <hr className="details-divider" />

          <AmenitiesList amenities={amenities} />

          <hr className="details-divider" />

          {/* Calendar Section */}
          <div className="calendar-section">
            <h3>{nights > 0 ? `${nights} nights` : "Select dates"}</h3>
            <p className="calendar-subtitle">
              {checkIn && checkOut
                ? `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`
                : "Add your travel dates for exact pricing"}
            </p>
            <div className="details-calendar">
              <DatePicker
                selected={checkIn}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setCheckIn(start);
                  setCheckOut(end);
                }}
                startDate={checkIn}
                endDate={checkOut}
                selectsRange
                inline
                minDate={new Date()}
                monthsShown={2}
              />
            </div>
            {(checkIn || checkOut) && (
              <button
                className="clear-dates-btn"
                onClick={() => {
                  setCheckIn(null);
                  setCheckOut(null);
                }}
              >
                Clear dates
              </button>
            )}
          </div>

          <hr className="details-divider" />

          {/* Static Reviews */}
          <div className="reviews-cards-section">
            <div className="reviews-cards-grid">
              {[
                {
                  name: "Jose",
                  date: "December 2021",
                  comment: "Host was very attentive.",
                },
                {
                  name: "Luke",
                  date: "December 2021",
                  comment: "Nice place to stay!",
                },
                {
                  name: "Shayna",
                  date: "December 2021",
                  comment:
                    "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive.",
                },
                {
                  name: "Josh",
                  date: "November 2021",
                  comment:
                    "Well designed and fun space, neighborhood has lots of energy and amenities.",
                },
              ].map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="reviewer-name">{review.name}</p>
                      <p className="reviewer-date">{review.date}</p>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <button className="show-more-btn">Show more ›</button>
                </div>
              ))}
            </div>
            <button className="show-all-reviews-btn">
              Show all {reviews || 12} reviews
            </button>
          </div>

          <hr className="details-divider" />

          {/* Host Details */}
          <div className="host-details-section">
            <div className="host-details-header">
              <div className="host-details-avatar">
                {accommodation.createdBy?.username?.charAt(0) || "H"}
              </div>
              <div>
                <h3>Hosted by {accommodation.createdBy?.username || "Host"}</h3>
                <p className="host-joined">Joined 2021</p>
              </div>
            </div>
            <div className="host-badges">
              <span>⭐ {reviews || 0} Reviews</span>
              <span>✓ Identity verified</span>
              <span>🏆 Superhost</span>
            </div>
            <p className="host-superhost-title">
              <strong>
                {accommodation.createdBy?.username || "Host"} is a Superhost
              </strong>
            </p>
            <p className="host-superhost-desc">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
            <p className="host-response">Response rate: 100%</p>
            <p className="host-response">Response time: within an hour</p>
            <button className="contact-host-btn">Contact Host</button>
          </div>

          <hr className="details-divider" />

          <div className="things-to-know">
            <h3>Things to know</h3>
            <div className="know-grid">
              <div>
                <h4>House rules</h4>
                <ul>
                  <li>Check-in: After 4:00 PM</li>
                  <li>Checkout: 10:00 AM</li>
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>No parties or events</li>
                </ul>
              </div>
              <div>
                <h4>Health & safety</h4>
                <ul>
                  <li>Enhanced cleaning process</li>
                  <li>Carbon monoxide alarm</li>
                  <li>Smoke alarm</li>
                </ul>
              </div>
              <div>
                <h4>Cancellation policy</h4>
                <ul>
                  <li>Free cancellation before check-in</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="details-right">
          <CostCalculator accommodation={accommodation} />
        </div>
      </div>
    </div>
  );
}

export default LocationDetailsPage;
