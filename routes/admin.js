const express = require("express");
const adminController = require("../controllers/adminController.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.get(
  "/properties",
  isAuthenticated,
  isAdmin,
  adminController.getAllProperties
);
router.get("/users", isAuthenticated, isAdmin, adminController.getAllUsers);
router.get(
  "/appointments",
  isAuthenticated,
  isAdmin,
  adminController.getAllAppointments
);
router.get(
  "/requests",
  isAuthenticated,
  isAdmin,
  adminController.getAllInfoRequests
);

module.exports = router;
