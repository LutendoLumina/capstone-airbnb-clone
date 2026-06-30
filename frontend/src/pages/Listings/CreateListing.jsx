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
  const [amenityInput, setAmenityInput] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddAmenity = (e) => {
    e.preventDefault();
    if (amenityInput.trim() !== "") {
      // Avoid duplicate tags
      if (!amenities.includes(amenityInput.trim())) {
        setAmenities([...amenities, amenityInput.trim()]);
      }
      setAmenityInput(""); // Clear the input field
    }
  };

  const handleRemoveAmenity = (indexToRemove) => {
    setAmenities(amenities.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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
        alert("Success! Accommodation listing created successfully.");
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
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select a city...</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Durban">Durban</option>
            <option value="Pretoris">Pretoria</option>
            <option value="Sandton">Sandton</option>
            <option value="Port Elizabeth">Gqeberha (Port Elizabeth)</option>
            <option value="Polokwane">Polokwane</option>
            <option value="Bloemfontein">Bloemfontein</option>
          </select>
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
              <option value="Hotel room">Apartment</option>
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

        <div className="form_group amenities_section">
          <label className="section_title">Amenities</label>
          <div className="amenities_input_row">
            <input
              type="text"
              placeholder="e.g., Pool, Wifi, Kitchen"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
            />
            <button
              type="button"
              className="add_amenity_btn"
              onClick={handleAddAmenity}
            >
              Add
            </button>
          </div>

          {/* Render the dynamic tags under the input */}
          {amenities.length > 0 && (
            <div className="amenities_tags_container">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity_tag">
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form_group file_upload_group">
          <label className="section_title">Images</label>

          <input
            id="file-input-id"
            type="file"
            accept="image/*, image/avif"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <label htmlFor="file-input-id" className="custom_upload_btn">
            Upload Image
          </label>

          <div className="selected_files">
            {selectedFiles.map((file, index) => (
              <div key={index} className="selected_file_item">
                <span>{file.name}</span>
                <button
                  type="button"
                  className="remove_file_btn"
                  onClick={() => handleRemoveFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form_actions">
          <button
            type="submit"
            className="action_btn_create"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create"}
          </button>
          <button
            type="button"
            className="action_btn_cancel"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
