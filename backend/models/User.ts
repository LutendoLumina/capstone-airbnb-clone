import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  photo: { type: String, required: false },
  type: { type: String, required: true, default: "customer" },
  status: { type: String, required: true, default: "active" },
  account_verified: { type: Boolean, required: true, default: false },
  verification_token: { type: String, required: false },
  verification_token_time: { type: Date, required: false },
  reset_password_token: { type: String, required: false },
  reset_password_token_time: { type: Date, required: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;