const Property = require("../models/Property.js");

exports.getAllProperties = async (req, res) => {
  console.log("Fetching all properties");
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
  console.log("Fetching all featured properties");
  const properties = await Property.find({ featured: true });
  res.json(properties);
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
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
  console.log("Deleting property");
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json({ message: "Property deleted" });
};
