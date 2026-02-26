const mongoose=require("mongoose");
const feedBackSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
})
const feedBackModel=mongoose.model("feedback",feedBackSchema);
module.exports=feedBackModel;