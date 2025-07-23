const Appointment = require("../models/Appointment.js");

exports.bookAppointment = async (req, res) => {
  const { propertyId, date, status } = req.body;
  const appointment = await Appointment.create({
    userId: req.user._id,
    propertyId,
    date,
    status: status || "pending",
  });
  res.status(201).json(appointment);
};

exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    userId: req.user._id,
  }).populate("propertyId");
  res.json(appointments);
};

exports.getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("userId propertyId");
  res.json(appointments);
};
