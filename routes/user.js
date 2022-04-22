const fs = require("fs");
const { Router } = require("express");
const router = Router();
const { timeStamp } = require("../middlewares/users.middleware");
const User = require("../models/user.model");
const { handleErrors } = require("./handlers/user.handler");

// get all users
router.get("/users", async function (req, res) {
  try {
    let allUsers = await User.find({});
    res.status(200).json({ success: true, body: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, body: error });
  }
});

// get user by id
router.get("/users/:id", async function (req, res) {
  try {
    const userId = req.params.id;

    let user = await User.findById(userId);

    res.status(200).json({ success: true, body: user });
  } catch (error) {
    res.status(400).json({ success: false, body: error });
  }
});

// add new user
router.post("/users", timeStamp, async function (req, res) {
  const { username, password } = req.body;

  try {
    let user = await User.create({ username, password });

    res.status(200).json({
      success: true,
      message: "signup successful",
      body: {
        username: user.username,
        id: user._id
      }
    });
  } catch (error) {
    let message = handleErrors(error);

    res.status(400).json({ success: false, body: message });
  }
});

module.exports = router;
