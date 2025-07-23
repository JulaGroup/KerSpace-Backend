const express = require("express");
const favoriteController = require("../controllers/favoriteController.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.post("/:propertyId", isAuthenticated, favoriteController.addFavorite);
router.get("/", isAuthenticated, favoriteController.getFavorites);

module.exports = router;
