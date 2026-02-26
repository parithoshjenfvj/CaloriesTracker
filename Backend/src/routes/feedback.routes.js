const express=require("express");
const router=express.Router();
const feedbackSubmit=require("../controllers/feedback.controller");
router.post("/feedback",feedbackSubmit);
module.exports=router;