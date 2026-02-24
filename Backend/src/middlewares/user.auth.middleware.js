const express=require("express");
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
async function isLogged(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"first login to the account"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.userId);
        req.user=user;
        next();
    }catch(error){
        console.log("something went wrong",error);
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}
module.exports={
    isLogged
}