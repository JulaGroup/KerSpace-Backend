const express = require("express");
const infoRequestController = require("../controllers/infoRequestController.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.post("/", isAuthenticated, infoRequestController.requestInfo);
router.get(
  "/admin/requests",
  isAuthenticated,
  isAdmin,
  infoRequestController.getAllInfoRequests
);

module.exports = router;
