const calorieDeficitModel=require("../models/calories.deficit.model");

async function createCalorieDeficit(req, res) {
    try {
        let { currentWeight, targetWeight, height, age, gender, physicalActivityLevel } = req.body;
        let alreadyPresent=await calorieDeficitModel.find({userId:req.user._id});
        if(alreadyPresent){
            await calorieDeficitModel.deleteMany({userId:req.user._id});
        }
        let calorieDeficit = await calorieDeficitModel.create({
            userId: req.user._id,
            currentWeight,
            targetWeight,
            height,
            age,
            gender,
            physicalActivityLevel
        });

        // ✅ Calculate BMR
        let bmr;

        if (gender === "male") {
            bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
        }

        // ✅ Calculate TDEE
        let activityMultiplier = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            "very active": 1.9
        };

        let tdee = bmr * activityMultiplier[physicalActivityLevel];

        let dailyCalories = tdee - 500;

        res.status(201).json({
            message: "calorie deficit created",
            dailyCalories
        });

    } catch (error) {
        console.log("FULL ERROR:", error);
        res.status(500).json({ message: "Error creating calorie deficit" });
    }
}
module.exports={createCalorieDeficit}