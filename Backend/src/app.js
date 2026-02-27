require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes")
const foodRoutes = require("./routes/food.routes")
const calorieDeficitRoutes = require("./routes/calorie.deficit.route")
const feedbackRoute=require("./routes/feedback.routes");
const getFoodRouts=require("./routes/getfood.today.route");
const cors = require("cors");

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://calories-tracker-pp7v.vercel.app",
    "https://calories-tracker-pp7v-2wbavn5l9-gudiparithosh-3198s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors()); // <-- IMPORTANT for preflight
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth/user", userRoutes)
app.use("/user", foodRoutes)
app.use("/user", calorieDeficitRoutes)
app.use("/user",feedbackRoute)
app.use("/user",getFoodRouts)
module.exports = app;