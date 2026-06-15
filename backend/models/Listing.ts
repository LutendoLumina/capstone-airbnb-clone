import * as mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true }, 
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  cleaning_fee: { type: Number, required: false, default: 0 },
  service_fee: { type: Number, required: false, default: 0 },
  occupancy_taxes: { type: Number, required: false, default: 0 },
  weekly_discount: { type: Number, required: false, default: 0 },
  amenities: [{ type: String }], 
  images: [{ type: String }],    
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;