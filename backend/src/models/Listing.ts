import * as mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    base_price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    cleaning_fee: { type: Number, required: false, default: 0 },
    service_fee: { type: Number, required: false, default: 0 },
    occupancy_taxes: { type: Number, required: false, default: 0 },
    weekly_discount: { type: Number, required: false, default: 0 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Listing = mongoose.model("listings", listingSchema);

export default Listing;
