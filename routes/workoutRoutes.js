const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render("home", { workouts });
  } catch (err) {
    res.status(500).send("Error fetching workouts");
  }
});

//Add Workout 
router.get("/add", (req, res) => {
  res.render("addWorkout");
});

router.post("/add", async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error adding workout");
  }
});

//Edit Workout
router.get("/edit/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render("editWorkout", { workout });
  } catch (err) {
    res.status(500).send("Error fetching workout");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating workout");
  }
});

//Delete Workout
router.post("/delete/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting workout");
  }
});
module.exports = router;
