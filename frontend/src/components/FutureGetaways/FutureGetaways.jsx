import { useState } from "react";
import "./FutureGetaways.css";

const tabs = [
  "Destinations for arts & culture",
  "Destinations for outdoor adventure",
  "Mountain cabins",
  "Beach destinations",
  "Popular destinations",
  "Unique Stays",
];

const destinations = {
  "Destinations for arts & culture": [
    { city: "Phoenix", region: "Arizona" },
    { city: "Hot Springs", region: "Arkansas" },
    { city: "Los Angeles", region: "California" },
    { city: "San Diego", region: "California" },
    { city: "San Francisco", region: "California" },
    { city: "Barcelona", region: "Catalonia" },
    { city: "Prague", region: "Czechia" },
    { city: "Washington", region: "District of Columbia" },
    { city: "Keswick", region: "England" },
    { city: "London", region: "England" },
    { city: "Scarborough", region: "England" },
  ],
};

function FutureGetaways() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const currentDestinations = destinations[activeTab] || destinations[tabs[0]];

  return (
    <section className="getaways-section">
      <h2>Inspiration for future getaways</h2>
      <div className="getaways-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="getaways-grid">
        {currentDestinations.map((dest, index) => (
          <div key={index} className="destination-item">
            <p className="destination-city">{dest.city}</p>
            <p className="destination-region">{dest.region}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FutureGetaways;