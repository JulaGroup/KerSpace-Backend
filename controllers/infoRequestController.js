const InfoRequest = require("../models/InfoRequest.js");

exports.requestInfo = async (req, res) => {
  const { propertyId, message, status } = req.body;
  const infoRequest = await InfoRequest.create({
    userId: req.user._id,
    propertyId,
    message,
    status: status || "pending",
  });
  res.status(201).json(infoRequest);
};

exports.getAllInfoRequests = async (req, res) => {
  const requests = await InfoRequest.find().populate("userId propertyId");
  res.json(requests);
};
