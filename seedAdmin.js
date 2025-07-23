const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User.js");

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = "darboedev@gmail.com";
  const password = "SamDarboe";
  const name = "Muhammed Darboe";
  const role = "admin";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword, role });
  console.log("Admin user seeded.");
  process.exit(0);
}

seedAdmin();
