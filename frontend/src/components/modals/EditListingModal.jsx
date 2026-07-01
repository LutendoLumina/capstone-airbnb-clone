import React, { useState, useEffect } from "react";
import "./EditListingModal.css";

export default function EditListingModal({
  listing,
  onClose,
  onUpdateSuccess,
}) {
  const [updateFormData, setUpdateFormData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (listing) {
      setUpdateFormData({
        title: listing.title || "",
        location: listing.location || "",
        description: listing.description || "",
        type: listing.type || "",
        bedrooms: listing.bedrooms || 0,
        bathrooms: listing.bathrooms || 0,
        guests: listing.guests || 1,
        base_price: listing.base_price || 0,
        cleaning_fee: listing.cleaning_fee || 0,
        service_fee: listing.service_fee || 0,
        occupancy_taxes: listing.occupancy_taxes || 0,
        weekly_discount: listing.weekly_discount || 0,
        amenities: listing.amenities ? listing.amenities.join(", ") : "",
      });
      setSelectedFiles([]);
    }
  }, [listing]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(updateFormData).forEach((key) => {
        if (key !== "amenities") {
          formData.append(key, updateFormData[key]);
        }
      });

      if (updateFormData.amenities) {
        formData.append("amenities", updateFormData.amenities);
      }

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await fetch(`/api/listings/update/${listing._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Listing updated successfully!");
        onUpdateSuccess(result.data);
      } else {
        alert(`Update Failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Message: ", err);
      alert("Network error occurred.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  return (
    <div className="modal_overlay">
      <div className="modal_container modal_scrollable">
        <h3>Modify Property Details</h3>

        <form onSubmit={handleUpdateSubmit} className="modal_form">
          <div className="modal_field">
            <label>Property Title</label>
            <input
              type="text"
              name="title"
              value={updateFormData.title || ""}
              onChange={handleChange}
            />
          </div>

          <div className="modal_grid_2col">
            <div className="modal_field">
              <label>Location Address</label>
              <select
                name="location"
                value={updateFormData.location || ""}
                onChange={handleChange}
              >
                <option value="">Select city...</option>
                <option value="Johannesburg">Johannesburg</option>
                <option value="Cape Town">Cape Town</option>
                <option value="Durban">Durban</option>
                <option value="Pretoria">Pretoria</option>
                <option value="Sandton">Sandton</option>
                <option value="Port Elizabeth">
                  Gqeberha (Port Elizabeth)
                </option>
              </select>
            </div>
            <div className="modal_field">
              <label>Property Type</label>
              <input
                type="text"
                name="type"
                value={updateFormData.type || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal_grid_3col">
            <div className="modal_field">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={updateFormData.bedrooms || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="modal_field">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={updateFormData.bathrooms || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="modal_field">
              <label>Max Guests</label>
              <input
                type="number"
                name="guests"
                value={updateFormData.guests || 1}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="modal_grid_3col">
            <div className="modal_field">
              <label>Base Price (R)</label>
              <input
                type="number"
                name="base_price"
                value={updateFormData.base_price || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="modal_field">
              <label>Cleaning Fee (R)</label>
              <input
                type="number"
                name="cleaning_fee"
                value={updateFormData.cleaning_fee || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="modal_field">
              <label>Service Fee (R)</label>
              <input
                type="number"
                name="service_fee"
                value={updateFormData.service_fee || 0}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="modal_grid_2col">
            <div className="modal_field">
              <label>Occupancy Taxes (R)</label>
              <input
                type="text"
                name="occupancy_taxes"
                value={updateFormData.occupancy_taxes || ""}
                onChange={handleChange}
              />
            </div>
            <div className="modal_field">
              <label>Weekly Discount (%)</label>
              <input
                type="number"
                name="weekly_discount"
                value={updateFormData.weekly_discount || 0}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="modal_field">
            <label>Amenities (Comma separated)</label>
            <input
              type="text"
              name="amenities"
              value={updateFormData.amenities || ""}
              onChange={handleChange}
            />
          </div>

          <div className="modal_field">
            <label className="file_upload_label">
              Replace Showcase Images (Max 5 files)
            </label>
            <div className="file_input_container">
              <div className="upload_box_text">
                <span>Click to choose files</span>
              </div>
              <input
                type="file"
                id="update-images"
                accept="image/*, image/avif"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {selectedFiles.length > 0 && (
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
            )}

            <p className="file_count">
              Selected: {selectedFiles.length} file(s)
            </p>
          </div>

          <div className="modal_field">
            <label>Description Narrative</label>
            <textarea
              rows="3"
              name="description"
              value={updateFormData.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="modal_buttons">
            <button
              type="button"
              className="modal_btn btn_dismiss"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal_btn btn_save_changes">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
