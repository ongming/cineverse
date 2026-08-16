const express = require("express");
const router = express.Router();
const actorsController = require("./actors.controller.js");

router.get("/top", actorsController.getTopActors);
router.get("/:id", actorsController.getActorById);
module.exports = router;
