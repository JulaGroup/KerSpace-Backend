const express = require("express");
const appointmentController = require("../controllers/appointmentController.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.post("/", isAuthenticated, appointmentController.bookAppointment);
router.get("/", isAuthenticated, appointmentController.getUserAppointments);
router.get(
  "/admin/appointments",
  isAuthenticated,
  isAdmin,
  appointmentController.getAllAppointments
);

module.exports = router;
