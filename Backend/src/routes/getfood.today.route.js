const express=require("express");
const router=express.Router();
const authMiddleware = require("../middlewares/user.auth.middleware")
const getTodayController=require("../controllers/gettoday.controller")
router.get("/gettoday",authMiddleware.isLogged,getTodayController.getToday)
router.post("/delete/:id",authMiddleware.isLogged,getTodayController.deleteItem)
module.exports=router;