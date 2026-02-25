const mongoose=require('mongoose');
const calorieDeficitSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    currentWeight:{
        type:Number,
        required:true
    },
    targetWeight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    physicalActivityLevel:{
        type:String,
        required:true,
        enum: ["sedentary", "light", "moderate", "active", "very active"]
    }
})
const calorieDeficitModel=mongoose.model("calorieDeficit",calorieDeficitSchema);
module.exports=calorieDeficitModel;