import * as mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    listing_id: {
      type: mongoose.Types.ObjectId,
      ref: "listings",
      required: true,
    },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true, default: "confirmed" },
  },
  { timestamps: true },
);

const reservation = mongoose.model("reservations", reservationSchema);

export default reservation;
