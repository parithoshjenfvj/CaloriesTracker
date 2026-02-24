require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes")
const foodRoutes = require("./routes/food.routes")
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/user", userRoutes)
app.use("/user", foodRoutes)
module.exports = app;