const express = require("express");
const foodModel = require("../models/food.model");
async function createFoodItem(req, res) {
    let { itemName, calories, protein, fat, fiber } = req.body;
    let foodItem = await foodModel.create({
        userId: req.user._id,
        itemName,
        calories,
        protein,
        fat,
        fiber
    })
    res.status(201).json({
        message: "food item created",
        foodItem
    })
}
module.exports = {
    createFoodItem
}