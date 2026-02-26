const feedBackModel=require("../models/feebback.model");
async function feedbackSubmit(req,res){
    try{
        let{email,feedback,rating}=req.body;
        const feedBack=await feedBackModel.create({
            email,
            feedback,
            rating
        })
        return res.status(200).json({
            message:"Feedback submitted successfully",
            feedBack
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal server error",
            error
        })
    }
}
module.exports=feedbackSubmit;