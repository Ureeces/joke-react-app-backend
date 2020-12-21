const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required",
    unique: "Username already exists",
  },

  email: {
    type: String,
    trim: true,
    required: "Email is required",
    unique: "Email already exists",
  },

  password: {
    type: String,
    required: "Password is required",
  },

  savedJokes: {
    type: Array,
  },
});

module.exports = mongoose.model("User", UserSchema);
