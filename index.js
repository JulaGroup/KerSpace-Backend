const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const propertyRoutes = require("./routes/property.js");
const favoriteRoutes = require("./routes/favorite.js");
const appointmentRoutes = require("./routes/appointment.js");
const infoRequestRoutes = require("./routes/infoRequest.js");
const adminRoutes = require("./routes/admin.js");

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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
