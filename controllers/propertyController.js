const Property = require("../models/Property.js");

exports.searchProperties = async (req, res) => {
  const query = {};
  if (req.query.type) query.type = req.query.type;
  if (req.query.status) query.status = req.query.status;
  if (req.query.location) {
    query.$or = [
      { "location.city": { $regex: req.query.location, $options: "i" } },
      { "location.state": { $regex: req.query.location, $options: "i" } },
      { "location.address": { $regex: req.query.location, $options: "i" } },
    ];
  }
  if (req.query.bedrooms) query.bedrooms = { $gte: Number(req.query.bedrooms) };
  if (req.query.bathrooms)
    query.bathrooms = { $gte: Number(req.query.bathrooms) };
  if (req.query.priceMin || req.query.priceMax) {
    query.price = {};
    if (req.query.priceMin) query.price.$gte = Number(req.query.priceMin);
    if (req.query.priceMax) query.price.$lte = Number(req.query.priceMax);
  }
  if (req.query.sizeMin || req.query.sizeMax) {
    query.size = {};
    if (req.query.sizeMin) query.size.$gte = Number(req.query.sizeMin);
    if (req.query.sizeMax) query.size.$lte = Number(req.query.sizeMax);
  }
  const properties = await Property.find(query);
  res.json(properties);
};

exports.getAllProperties = async (req, res) => {
  const properties = await Property.find();
  // Only send the first image for each property
  const result = properties.map((property) => {
    const obj = property.toObject();
    obj.images = obj.images && obj.images.length > 0 ? [obj.images[0]] : [];
    return obj;
  });
  res.json(result);
};

exports.getAllFeaturedProperties = async (req, res) => {
  const properties = await Property.find({ featured: true });
  res.json(properties);
};

exports.getPropertyById = async (req, res) => {
  let property;
  try {
    property = await Property.findById(req.params.id);
  } catch (err) {
    return res.status(404).json({ message: "Listing not available" });
  }
  if (!property) return res.status(404).json({ message: "Listing not available" });
  res.json(property);
};

exports.addProperty = async (req, res) => {
  // Accept all new fields from req.body
  // Ensure images is always an array
  let images = req.body.images;
  if (images && !Array.isArray(images)) {
    images = [images];
  }
  const propertyData = { ...req.body, images };
  const property = await Property.create(propertyData);
  res.status(201).json(property);
};

exports.editProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json(property);
};

exports.deleteProperty = async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json({ message: "Property deleted" });
};
