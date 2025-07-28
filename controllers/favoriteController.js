const User = require("../models/User.js");
const Property = require("../models/Property.js");

exports.removeFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== req.params.propertyId
  );
  await user.save();
  res.json({ message: "Removed from favorites" });
};

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
