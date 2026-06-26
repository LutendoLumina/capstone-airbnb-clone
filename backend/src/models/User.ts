import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);

export default User;


