const express = require('express');
const router = express.Router();
const gameController = require("../../controllers/GameController")

router.get("/games",gameController.games)
router.get("/game/:id",gameController.game)
router.post("/game",gameController.newGame)
router.delete("/game/:id",gameController.destroy)
router.put("/game/:id",gameController.update)
router.patch("/game/:id",gameController.updateParcial)

module.exports = router