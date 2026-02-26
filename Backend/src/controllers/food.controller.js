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

async function getFoodItems(req,res){
    try{
        const today=new Date();
        today.setHours(0,0,0,0);
        const tomorrow=new Date(today);
        tomorrow.setDate(today.getDate()+1);
        const foodItems=await foodModel.find({
            userId:req.user._id,
            createdAt:{$gte:today,$lt:tomorrow}
        })
        let totalCalories = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalFiber = 0;
        for (let i = 0; i < foodItems.length; i++) {
            totalCalories += foodItems[i].calories;
            totalProtein += foodItems[i].protein;
            totalFat += foodItems[i].fat;
            totalFiber += foodItems[i].fiber;
        }
        res.status(200).json({
            foodItems,
            totals: {
            calories: totalCalories,
            protein: totalProtein,
            fat: totalFat,
            fiber: totalFiber
        }
    });
    }catch(error){
        res.status(500).json({ message: "Error loading dashboard" });
    }
}


async function getRecentFoodItems(req,res){
    try{
        const today = new Date();
        today.setHours(0,0,0,0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const foodItems=await foodModel.find({
            userId:req.user._id,
            createdAt:{$gte:yesterday,$lt:today}
        })
        res.status(200).json({
            foodItems
        });
    }catch(error){
        res.status(500).json({ message: "Error loading recents tab" });
    }
}

async function addRecentItem(req,res){
    try{
        const foodItem=await foodModel.findById(req.params.id);
        if(!foodItem){
            return res.status(404).json({ message: "Food item not found" });
        }
        const recentItem=await foodModel.create({
            userId:req.user._id,
            itemName:foodItem.itemName,
            calories:foodItem.calories,
            protein:foodItem.protein,
            fat:foodItem.fat,
            fiber:foodItem.fiber
        })
        res.status(201).json({
            message:"recent item added",
            recentItem
        })
    }catch(error){
        return res.status(500).json({ message: "Error adding recent item" });
    }
}
module.exports = {
    createFoodItem,
    getFoodItems,
    getRecentFoodItems,
    addRecentItem
}