import React, { useState } from "react";
import "./CreateListing.css";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Entire home");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [guests, setGuests] = useState("");

  const [cleaningFee, setCleaningFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [occupancyTaxes, setOccupancyTaxes] = useState("");
  const [weeklyDiscount, setWeeklyDiscount] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add or remove items from the amenities array list
  const handleAmenityChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("guests", guests);
    formData.append("base_price", price);
    formData.append("cleaning_fee", cleaningFee || "0");
    formData.append("service_fee", serviceFee || "0");
    formData.append("occupancy_taxes", occupancyTaxes || "0");
    formData.append("weekly_discount", weeklyDiscount || "0");
    formData.append("amenities", JSON.stringify(amenities));

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/listings/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Success! Accommodation listing created in MongoDB cluster.");
        console.log("Database Response Data Document:", result.data);

        // Reset states cleanly on success
        setTitle("");
        setLocation("");
        setDescription("");
        setPrice("");
        setBedrooms("");
        setBathrooms("");
        setGuests("");
        setCleaningFee("");
        setServiceFee("");
        setOccupancyTaxes("");
        setWeeklyDiscount("");
        setAmenities([]);
        setSelectedFiles([]);
      } else {
        alert(`Validation Failure: ${result.message}`);
      }
    } catch (e) {
      console.error("Network Error Connecting To Backend:", e);
      alert("Network communication dropped. Check server status logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <h2>Create New Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Property Title</label>
          <input
            type="text"
            placeholder="e.g., Luxury Sandton Apartment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form_group">
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g., Johannesburg, South Africa"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form_group">
          <label>Description</label>
          <textarea
            placeholder="Provide details about the spaces, views, and surroundings..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form_row">
          <div className="form_group">
            <label>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Entire home">Entire home</option>
              <option value="Private room">Private room</option>
              <option value="Shared room">Shared room</option>
              <option value="Hotel room">Hotel room</option>
            </select>
          </div>

          <div className="form_group">
            <label>Price per Night (R)</label>
            <input
              type="number"
              placeholder="1200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form_row">
          <div className="form_group">
            <label>Bedrooms</label>
            <input
              type="number"
              placeholder="2"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />
          </div>
          <div className="form_group">
            <label>Bathrooms</label>
            <input
              type="number"
              placeholder="1"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              required
            />
          </div>
          <div className="form_group">
            <label>Max Guests</label>
            <input
              type="number"
              placeholder="4"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form_row">
          <div className="form_group">
            <label>Cleaning Fee (R)</label>
            <input
              type="number"
              placeholder="250"
              value={cleaningFee}
              onChange={(e) => setCleaningFee(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label>Service Fee (R)</label>
            <input
              type="number"
              placeholder="100"
              value={serviceFee}
              onChange={(e) => setServiceFee(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label>Occupancy Taxes (R)</label>
            <input
              type="number"
              placeholder="50"
              value={occupancyTaxes}
              onChange={(e) => setOccupancyTaxes(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label>Weekly Discount (%)</label>
            <input
              type="number"
              placeholder="10"
              value={weeklyDiscount}
              onChange={(e) => setWeeklyDiscount(e.target.value)}
            />
          </div>
        </div>

        <div className="amenities_section">
          <label className="section_title">Amenities Available</label>
          <div className="checkbox_grid">
            <label>
              <input
                type="checkbox"
                value="Wifi"
                checked={amenities.includes("Wifi")}
                onChange={handleAmenityChange}
              />{" "}
              Wifi
            </label>
            <label>
              <input
                type="checkbox"
                value="Kitchen"
                checked={amenities.includes("Kitchen")}
                onChange={handleAmenityChange}
              />{" "}
              Kitchen
            </label>
            <label>
              <input
                type="checkbox"
                value="Free Parking"
                checked={amenities.includes("Free Parking")}
                onChange={handleAmenityChange}
              />{" "}
              Free Parking
            </label>
            <label>
              <input
                type="checkbox"
                value="Pool"
                checked={amenities.includes("Pool")}
                onChange={handleAmenityChange}
              />{" "}
              Pool
            </label>
            <label>
              <input
                type="checkbox"
                value="Air conditioning"
                checked={amenities.includes("Air Conditioning")}
                onChange={handleAmenityChange}
              />{" "}
              Air Con
            </label>
          </div>
        </div>

        <div className="form_group file_upload_group">
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Property Showcase Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Selected: {selectedFiles.length} file(s)
          </p>
        </div>

        <button type="submit" className="submit_btn" disabled={loading}>
          {loading ? "Processing Upload..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}
