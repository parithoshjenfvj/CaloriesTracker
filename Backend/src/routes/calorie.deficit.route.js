const express = require("express");
const router = express.Router();
const calorieDeficitController = require("../controllers/calorie.deficit.controller");
const authMiddleware = require("../middlewares/user.auth.middleware")
router.post("/calorie-deficit", authMiddleware.isLogged, calorieDeficitController.createCalorieDeficit)
module.exports = router;