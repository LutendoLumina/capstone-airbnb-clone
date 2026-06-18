import mongoose from "mongoose";
import User from "./models/User";
import { Utils } from "./utils/Utils";
import * as dotenv from "dotenv";
import * as dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function seedAdmin() {
  try {
    // Connect to your MongoDB Atlas cluster
    const dbUri = process.env.DEV_DB_URI || "";
    await mongoose.connect(dbUri);
    console.log("Connected to database for seeding...");

    // Check if the admin already exists
    const adminExists = await User.findOne({ email: "admin@airbnb.com" });
    if (adminExists) {
      console.log("Admin user already exists in the database.");
      process.exit(0);
    }

    // Hash the administrative password safely using Bcrypt
    const plainPassword = "password123"; 
    const hashedPassword = await Utils.encryptPassword(plainPassword);

    // Create User
    const adminUser = new User({
      username: "Jane Doe",
      email: "admin@airbnb.com",
      password: hashedPassword,
      type: "admin",
      status: "active"           
    });

    await adminUser.save();
    
    console.log("Successfully seeded Administrator account with a hashed password!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedAdmin();