const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    size: Number,
    bedrooms: Number,
    bathrooms: Number,
    type: { type: String, enum: ["apartment", "house", "office", "land"] },
    status: { type: String, enum: ["for-sale", "for-rent"] },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      phone: String,
    },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
    totalUnits: { type: Number }, // for apartments
    availableUnits: { type: Number }, // for apartments
    // vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // vendorName: String,
    // vendorContact: String,
    // approvalStatus: {
    //   type: String,
    //   enum: ["approved", "pending", "rejected"],
    //   default: "pending",
    // },
    featured: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
