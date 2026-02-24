const express=require("express");
const app=express();
const userController=require("../controllers/user.auth.controller");
app.use("/register",userController.userRegister)
app.use("/login",userController.userLogin)
module.exports=app;