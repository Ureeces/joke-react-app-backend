const mongoose = require("mongoose");

const JokeSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  joke: {
    type: String,
    trim: true,
  },

  setup: {
    type: String,
    trim: true,
  },

  delivery: {
    type: String,
    trim: true,
  },

  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Joke", JokeSchema);
