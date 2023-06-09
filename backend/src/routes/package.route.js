const express = require("express");

const packageController = require("../controllers/package.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, packageController.getAllPackages)
  .post(authController.protect, packageController.createPackage);

router
  .route("/:id")
  .get(authController.protect, packageController.getPackage)
  .put(authController.protect, packageController.updatePackage)
  .delete(authController.protect, packageController.deletePackage);




module.exports = router;
