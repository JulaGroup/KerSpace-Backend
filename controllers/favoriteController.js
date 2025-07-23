const User = require("../models/User.js");
const Property = require("../models/Property.js");

exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.favorites.includes(req.params.propertyId)) {
    user.favorites.push(req.params.propertyId);
    await user.save();
  }
  res.json({ message: "Added to favorites" });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.json(user.favorites);
};
