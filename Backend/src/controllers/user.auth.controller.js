const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userModel=require("../models/user.model");
async function userRegister(req,res){
    const {name,email,password}=req.body;
    const isUserExists=await userModel.findOne({email})
    if(isUserExists){
        return res.status(500).json({
            message:"Account exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    let token=jwt.sign({
        userId:user._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"user created",
        user
    })
}

async function userLogin(req,res){
    let{email,password}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"please create an account first"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET);
        res.cookie("token",token);
        res.status(201).json({
            message:"user loggedIn successfully",
            user
        })
}
module.exports={
    userRegister,
    userLogin
}