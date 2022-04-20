// modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user blueprint
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

// encrypt password before saving new user info
userSchema.pre("save", async function (next) {
  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// export user model
const User = mongoose.model("user", userSchema);
module.exports = User;
