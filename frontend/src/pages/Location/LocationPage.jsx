import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AccommodationCard from "../../components/AccomodationCard/AccomodationCard";
import "./LocationPage.css";

function LocationPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location");

  const filters = [
    "Free cancellation",
    "Type of place",
    "Price",
    "Instant Book",
    "More filters",
  ];

  const filtered =
    locationParam && locationParam !== "All Locations"
      ? accommodations.filter((a) =>
          a.location.toLowerCase().includes(locationParam.toLowerCase()),
        )
      : accommodations;

  useEffect(() => {
    fetch("/api/listings/public")
      .then((res) => res.json())
      .then((data) => {
        setAccommodations(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load listings.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading listings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="location_page">
      <h2 className="location_heading">
        {filtered.length}+ stays{" "}
        {locationParam ? `in ${locationParam}` : "available"}
      </h2>

      {/* Filter Chips */}
      <div className="filter_chips">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter_chip ${activeFilter === filter ? "active" : ""}`}
            onClick={() =>
              setActiveFilter(filter === activeFilter ? null : filter)
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <hr className="divider" />

      {/* Accommodation Cards */}
      <div className="accommodation_list">
        {filtered.map((accommodation) => (
          <AccommodationCard
            key={accommodation._id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationPage;
