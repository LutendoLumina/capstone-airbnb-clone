import React, { useState, useEffect } from "react";
import EditListingModal from "../../components/Modals/EditListingModal";
import "./ViewListings.css";

export default function ViewListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingListing, setEditingListing] = useState(null);

  // fetch live properties database
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/listings/viewListings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();

        if (response.ok) {
          setListings(result.data);
        } else {
          throw new Error(result.message || "Failed to pull property entries.");
        }
      } catch (err) {
        console.error("Error retrieving dashboard context:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing permanently?",
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/listings/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Success! Listing removed from database.");
        setListings(listings.filter((item) => item._id !== id));
      } else {
        alert(`Deletion Failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Error communicating with delete endpoint:", err);
      alert("Network communication error. Check server logs.");
    }
  };

  const handleUpdateSuccess = (updatedItem) => {
    setListings(
      listings.map((item) => {
        if (item._id === updatedItem._id) {
          return {
            ...updatedItem,
            image: updatedItem.image || updatedItem.images || item.image,
          };
        }
        return item;
      }),
    );
    setEditingListing(null);
  };

  const getImageUrl = (imageArray) => {
    if (!imageArray || imageArray.length === 0) {
      return "https://images.unsplash.com/photo-1570129477492-45c003edd2be";
    }
    const cleanPath = imageArray[0].replace(/\\/g, "/");
    return `http://localhost:3000/${cleanPath}?t=${new Date().getTime()}`;
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading Properties...
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="listings_container">
      <h2>My Property Listings</h2>

      {listings.length === 0 ? (
        <p className="no_listings">
          No accommodations available. Create a listing to see it here!
        </p>
      ) : (
        <div className="listings_grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing_card">
              {/* Property Image Cover */}
              <div className="card_image_wrapper">
                <img src={getImageUrl(listing.image)} alt={listing.title} />
                <span className="property_type_badge">{listing.type}</span>
              </div>

              {/* Property Text Content Details */}
              <div className="card_content">
                <h3 className="property_title">{listing.title}</h3>
                <p className="property_location">{listing.location}</p>

                <p className="property_specs">
                  {listing.guests} guests · {listing.bedrooms} beds ·{" "}
                  {listing.bathrooms} bath
                </p>

                <div className="card_amenities">
                  {listing.amenities?.map((amenity, index) => (
                    <span key={index} className="amenity_tag">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="card_footer">
                  <p className="property_price">
                    <strong>R {listing.base_price}</strong> / night
                  </p>

                  {/* Administrative Action Control Panel */}
                  <div className="admin_actions">
                    <button
                      className="action_btn update_btn"
                      onClick={() => setEditingListing(listing)}
                    >
                      Update
                    </button>
                    <button
                      className="action_btn delete_btn"
                      onClick={() => handleDeleteClick(listing._id)}
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
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
