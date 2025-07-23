const express = require("express");
const authController = require("../controllers/authController.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuthenticated, authController.getMe);

module.exports = router;
