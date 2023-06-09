const express = require("express");

const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.route("/").get(authController.protect,userController.getAllUsers);
router.route("/:id").get(authController.protect,userController.getUser);
router.route("/:id/reviews").post(authController.protect,userController.createReview);

module.exports = router;