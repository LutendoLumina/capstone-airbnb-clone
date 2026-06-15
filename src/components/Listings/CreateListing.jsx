import React, { useState } from "react";
import "./CreateListing.css";

export default function CreateListing() {
  // Setup local state for every single field from the project brief
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Entire home");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [guests, setGuests] = useState("");
  
  // Fees and extra metrics
  const [cleaningFee, setCleaningFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [occupancyTaxes, setOccupancyTaxes] = useState("");
  const [weeklyDiscount, setWeeklyDiscount] = useState("");

  // Amenities array tracker
  const [amenities, setAmenities] = useState([]);

  // Add or remove items from the amenities array list
  const handleAmenityChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the dummy data object to show exactly what we will send to the backend later
    const mockListingData = {
      title,
      location,
      description,
      type,
      price: Number(price),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      guests: Number(guests),
      cleaningFee: Number(cleaningFee || 0),
      serviceFee: Number(serviceFee || 0),
      occupancyTaxes: Number(occupancyTaxes || 0),
      weeklyDiscount: Number(weeklyDiscount || 0),
      amenities,
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"] // temporary hardcoded image link
    };

    console.log("Mock Listing Captured Successfully:", mockListingData);
    alert("Listing Form Validated! Check your browser console to view the saved object structure.");
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
            <input type="number" placeholder="2" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
          </div>
          <div className="form_group">
            <label>Bathrooms</label>
            <input type="number" placeholder="1" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
          </div>
          <div className="form_group">
            <label>Max Guests</label>
            <input type="number" placeholder="4" value={guests} onChange={(e) => setGuests(e.target.value)} required />
          </div>
        </div>

        <div className="form_row">
          <div className="form_group">
            <label>Cleaning Fee (R)</label>
            <input type="number" placeholder="250" value={cleaningFee} onChange={(e) => setCleaningFee(e.target.value)} />
          </div>
          <div className="form_group">
            <label>Service Fee (R)</label>
            <input type="number" placeholder="100" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} />
          </div>
          <div className="form_group">
            <label>Occupancy Taxes (R)</label>
            <input type="number" placeholder="50" value={occupancyTaxes} onChange={(e) => setOccupancyTaxes(e.target.value)} />
          </div>
          <div className="form_group">
            <label>Weekly Discount (%)</label>
            <input type="number" placeholder="10" value={weeklyDiscount} onChange={(e) => setWeeklyDiscount(e.target.value)} />
          </div>
        </div>

        <div className="amenities_section">
          <label className="section_title">Amenities Available</label>
          <div className="checkbox_grid">
            <label><input type="checkbox" value="Wifi" onChange={handleAmenityChange} /> Wifi</label>
            <label><input type="checkbox" value="Kitchen" onChange={handleAmenityChange} /> Kitchen</label>
            <label><input type="checkbox" value="Free Parking" onChange={handleAmenityChange} /> Free Parking</label>
            <label><input type="checkbox" value="Pool" onChange={handleAmenityChange} /> Pool</label>
            <label><input type="checkbox" value="Air conditioning" onChange={handleAmenityChange} /> Air Con</label>
          </div>
        </div>

        <button type="submit" className="submit_btn">Create Listing</button>
      </form>
    </div>
  );
}