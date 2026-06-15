import React, { useState } from "react";
import "./ViewListings.css";

export default function ViewListings() {
  // Hardcoded array of properties to display on the screen layout
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Sandton City Luxury Apartment",
      location: "Johannesburg, South Africa",
      type: "Entire home",
      price: 1200,
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      amenities: ["Wifi", "Kitchen", "Free Parking"],
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
    },
    {
      id: 2,
      title: "Charming Waterfront Condo",
      location: "Cape Town, South Africa",
      type: "Private room",
      price: 850,
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      amenities: ["Wifi", "Air Con", "Pool"],
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    }
  ]);

  const handleUpdateClick = (id) => {
    alert(`Update button clicked for Listing ID: ${id}. (We will connect this functionality later!)`);
  };

  const handleDeleteClick = (id) => {
    // Basic local state delete simulation
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (confirmed) {
      setListings(listings.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="listings_container">
      <h2>My Property Listings</h2>
      
      {listings.length === 0 ? (
        <p className="no_listings">No accommodations available. Create a listing to see it here!</p>
      ) : (
        <div className="listings_grid">
          {listings.map((listing) => (
            <div key={listing.id} className="listing_card">
              {/* Property Image Cover */}
              <div className="card_image_wrapper">
                <img src={listing.image} alt={listing.title} />
                <span className="property_type_badge">{listing.type}</span>
              </div>

              {/* Property Text Content Details */}
              <div className="card_content">
                <h3 className="property_title">{listing.title}</h3>
                <p className="property_location">{listing.location}</p>
                
                <p className="property_specs">
                  {listing.guests} guests · {listing.bedrooms} beds · {listing.bathrooms} bath
                </p>

                <div className="card_amenities">
                  {listing.amenities.map((amenity, index) => (
                    <span key={index} className="amenity_tag">{amenity}</span>
                  ))}
                </div>

                <div className="card_footer">
                  <p className="property_price">
                    <strong>R {listing.price}</strong> / night
                  </p>
                  
                  {/* Administrative Action Control Panel */}
                  <div className="admin_actions">
                    <button 
                      className="action_btn update_btn" 
                      onClick={() => handleUpdateClick(listing.id)}
                    >
                      Update
                    </button>
                    <button 
                      className="action_btn delete_btn" 
                      onClick={() => handleDeleteClick(listing.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}