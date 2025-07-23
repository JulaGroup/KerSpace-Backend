const Property = require("../models/Property.js");
const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");
const InfoRequest = require("../models/InfoRequest.js");

exports.getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("userId propertyId");
  res.json(appointments);
};

exports.getAllInfoRequests = async (req, res) => {
  const requests = await InfoRequest.find().populate("userId propertyId");
  res.json(requests);
};
