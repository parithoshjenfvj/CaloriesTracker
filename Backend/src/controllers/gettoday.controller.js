const express=require("express");
const foodModel=require("../models/food.model");
async function getToday(req,res){
    try{
        const today=new Date();
        today.setHours(0,0,0,0);
        const tomorrow=new Date(today);
        tomorrow.setDate(today.getDate()+1);
        const foodItems=await foodModel.find({
            userId:req.user._id,
            createdAt:{$gte:today,$lt:tomorrow}
        })
        return res.status(200).json({
            message:"Today Food Items",
            foodItems
        })
    }catch(error){
        return res.status(500).json({ message: "Error loading dashboard" });
    }
}
async function deleteItem(req,res){
    try{
        const deletedItem=await foodModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message:"item deleted",
            deletedItem
        })
    }catch(error){
        return res.status(500).json({ message: "Error deleting recent item" });
    }
}
module.exports={getToday,deleteItem};