const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/user.auth.middleware")
router.post("/create", authMiddleware.isLogged, foodController.createFoodItem)
router.get("/dashboard", authMiddleware.isLogged, foodController.getFoodItems)
router.get("/recents", authMiddleware.isLogged, foodController.getRecentFoodItems)
router.post("/add-recent/:id", authMiddleware.isLogged, foodController.addRecentItem)
module.exports = router;