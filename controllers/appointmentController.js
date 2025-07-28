const Appointment = require("../models/Appointment.js");

exports.editAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  if (!appointment) {
    return res
      .status(404)
      .json({ message: "Appointment not found or not authorized" });
  }
  res.json(appointment);
};

// Delete an appointment (user can only delete their own appointment)
exports.deleteAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!appointment) {
    return res
      .status(404)
      .json({ message: "Appointment not found or not authorized" });
  }
  res.json({ message: "Appointment deleted" });
};

exports.getUserAppointmentForProperty = async (req, res) => {
  const propertyId = req.params.id;
  const appointment = await Appointment.findOne({
    userId: req.user._id,
    propertyId,
  }).populate("propertyId");
  if (!appointment) {
    return res
      .status(404)
      .json({ message: "No appointment found for this property" });
  }
  res.json(appointment);
};

exports.bookAppointment = async (req, res) => {
  const { propertyId, date, time, message, email, phone, status, name } =
    req.body;
  const appointment = await Appointment.create({
    userId: req.user._id,
    propertyId,
    date,
    time,
    name,
    message,
    email,
    phone,
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
