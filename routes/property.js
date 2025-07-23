const express = require("express");
const propertyController = require("../controllers/propertyController.js");
const { isAuthenticated, isAdmin } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", propertyController.getAllProperties);
router.get("/featured", propertyController.getAllFeaturedProperties);
router.get("/:id", propertyController.getPropertyById);
router.post("/", isAuthenticated, isAdmin, propertyController.addProperty);
router.put("/:id", isAuthenticated, isAdmin, propertyController.editProperty);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  propertyController.deleteProperty
);

module.exports = router;
