const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/user.auth.middleware")
router.post("/create", authMiddleware.isLogged, foodController.createFoodItem)
router.get("/dashboard", authMiddleware.isLogged, foodController.getFoodItems)
router.get("/recents", authMiddleware.isLogged, foodController.getRecentFoodItems)
router.post("/add-recent/:id", authMiddleware.isLogged, foodController.addRecentItem)
router.get("/monthly-summary", authMiddleware.isLogged, foodController.getMonthlySummary)
router.post("/get-ai-nutrition", authMiddleware.isLogged, foodController.getAINutrition)
module.exports = router;