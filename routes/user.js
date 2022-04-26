const { Router } = require("express");
const router = Router();
const { timeStamp } = require("../middlewares/users.middleware");
const User = require("../models/user.model");
const { handleErrors, createToken } = require("./handlers/user.handler");

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
router.post("/users/signup", timeStamp, async function (req, res) {
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

// login user
router.post("/users/login", async function (req, res, next) {
  const { username, password } = req.body;

  try {
    let result = await User.login(username, password, next);

    if (result.auth) {
      let token = createToken(result.data._id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(201).json({
        success: true,
        message: "login successful",
        body: {
          username: result.data.username
        }
      });

      return;
    }

    res
      .status(400)
      .json({ success: false, message: "incorrect username or password" });
  } catch (error) {
    let message = handleErrors(error);
    res.status(400).json({ success: false, body: message });
  }
});

module.exports = router;
