const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const Workout = require("./models/Workout");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.render("splash");
});

app.get("/workouts", async (req, res) => {
  const workouts = await Workout.find();
  res.render("home", { workouts });
});

app.get("/add", (req, res) => {
  res.render("addWorkout");
});

app.post("/add", async (req, res) => {
  const { name, duration } = req.body;
  await Workout.create({ name, duration });
  res.redirect("/workouts");
});

app.get("/edit/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("editWorkout", { workout });
});

app.post("/edit/:id", async (req, res) => {
  const { name, duration } = req.body;
  await Workout.findByIdAndUpdate(req.params.id, { name, duration });
  res.redirect("/workouts");
});

app.post("/delete/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect("/workouts");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
