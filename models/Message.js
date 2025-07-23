const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    sender: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
