const mongoose = require("mongoose");
const Property = require("../models/Property.js");

exports.searchProperties = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // default 10 items per page
  const offset = parseInt(req.query.offset) || 0;

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
  const totalProperties = await Property.countDocuments(query);
  const properties = await Property.find(query)
    .limit(limit)
    .skip(offset)
    .sort({ createdAt: -1 }); // newest first

  res.json({
    properties,
    pagination: {
      total: totalProperties,
      offset,
      limit,
      hasMore: offset + properties.length < totalProperties,
    },
  });
};

exports.getAllProperties = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const totalProperties = await Property.countDocuments();
  const properties = await Property.find()
    .limit(limit)
    .skip(offset)
    .sort({ createdAt: -1 });

  // Only send the first image for each property
  const result = properties.map((property) => {
    const obj = property.toObject();
    obj.images = obj.images && obj.images.length > 0 ? [obj.images[0]] : [];
    return obj;
  });
  res.json({
    properties: result,
    pagination: {
      total: totalProperties,
      offset,
      limit,
      hasMore: offset + properties.length < totalProperties,
    },
  });
};

exports.getAllFeaturedProperties = async (req, res) => {
  const properties = await Property.find({ featured: true });
  res.json(properties);
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Page does not exist or invalid property ID." });
  }
  const property = await Property.findById(id);
  if (!property)
    return res.status(404).json({ message: "Listing not available" });
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
  // Ensure images is always an array if provided
  let updateData = { ...req.body };
  if (updateData.images && !Array.isArray(updateData.images)) {
    updateData.images = [updateData.images];
  }

  const property = await Property.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json(property);
};

exports.deleteProperty = async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json({ message: "Property deleted" });
};
