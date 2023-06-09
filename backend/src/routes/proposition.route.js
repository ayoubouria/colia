const express = require("express");

const propositionController = require("../controllers/proposition.controller");

const router = express.Router();

router
  .route("/")
  .get(propositionController.getAllPropositions)
  .post(propositionController.createProposition);

router
  .route("/:id")
  .get(propositionController.getProposition)


router
  .route("userFrom/:id")
  .get(propositionController.getPropositionsByUserFrom);

router.route("userTo/:id").get(propositionController.getPropositionsByUserTo);


module.exports = router;