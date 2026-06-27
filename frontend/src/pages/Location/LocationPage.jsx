import { useState } from "react";
import AccommodationCard from "../../components/AccomodationCard/AccomodationCard";
import accommodations from "../../data/accomodations";
import "./LocationPage.css";

function LocationPage() {
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    "Free cancellation",
    "Type of place",
    "Price",
    "Instant Book",
    "More filters",
  ];

  return (
    <div className="location-page">
      <h2 className="location-heading">
        {accommodations.length}+ stays in Bordeaux
      </h2>

      {/* Filter Chips */}
      <div className="filter-chips">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter === activeFilter ? null : filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <hr className="divider" />

      {/* Accommodation Cards */}
      <div className="accommodation-list">
        {accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationPage;