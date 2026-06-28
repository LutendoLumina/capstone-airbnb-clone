process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import mongoose from "mongoose";
import User from "./models/User";
import { Utils } from "./utils/Utils";
import * as dotenv from "dotenv";
import * as dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function seedUser() {
  try {
    const dbUri = process.env.DEV_DB_URI || "";
    await mongoose.connect(dbUri);
    console.log("Connected to database for seeding...");

    // Seed Admin
    const adminExists = await User.findOne({ email: "admin@airbnb.com" });
    if (adminExists) {
      console.log("Admin user already exists in the database.");
    } else {
      const hashedAdminPassword = await Utils.encryptPassword("password123");

      const adminUser = new User({
        username: "Jane Doe",
        email: "admin@airbnb.com",
        password: hashedAdminPassword,
        type: "admin",
        status: "active",
      });
      await adminUser.save();
      console.log("Successfully seeded Administrator account!");
    }

    // Seed Regular User
    const userExists = await User.findOne({ email: "user@airbnb.com" });
    if (userExists) {
      console.log("Regular user already exists in the database.");
    } else {
      const hashedUserPassword = await Utils.encryptPassword("password123");
      const regularUser = new User({
        username: "John Doe",
        email: "user@airbnb.com",
        password: hashedUserPassword,
        type: "user",
        status: "active",
      });
      await regularUser.save();
      console.log("Successfully seeded Regular user account!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedUser();