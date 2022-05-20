const express = require('express');
const router = express.Router();
const gameController = require("../../controllers/GameController")

router.get("/games",gameController.games)
router.get("/game/:id",gameController.game)

module.exports = router