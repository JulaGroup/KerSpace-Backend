const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const authRoutes = require("./routes/auth.js");
const propertyRoutes = require("./routes/property.js");
const favoriteRoutes = require("./routes/favorite.js");
const appointmentRoutes = require("./routes/appointment.js");
const infoRequestRoutes = require("./routes/infoRequest.js");
const adminRoutes = require("./routes/admin.js");
const User = require("./models/User.js");

dotenv.config();

const app = express();
app.use(cors()); // Allow all origins by default
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/requests", infoRequestRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// Fix old schema indexes
async function fixIndexes() {
  try {
    const indexes = await User.collection.getIndexes();
    if (indexes.username_1) {
      console.log("Dropping old username index...");
      await User.collection.dropIndex("username_1");
      console.log("✓ Old username index dropped.");
    }
  } catch (error) {
    console.log("No old indexes to clean up.");
  }
}

// Seed admin function
async function seedAdmin() {
  try {
    const email = "darboedev@gmail.com";
    const password = "SamDarboe";
    const name = "Muhammed Darboe";
    const role = "admin";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("✓ Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role });
    console.log("✓ Admin user seeded successfully!");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // Fix old indexes first
    await fixIndexes();
    // Seed admin after DB connection
    await seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
