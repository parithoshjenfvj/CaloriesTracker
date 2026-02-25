const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    itemName: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    fiber: {
        type: Number,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
},{
    timestamps:true
})

const foodModel = mongoose.model("food", foodSchema);
module.exports = foodModel;