const Joke = require("../model/Joke");

module.exports = {
  createJoke: async (req, res) => {
    let newJoke = new Joke({
      category: req.body.category,
      type: req.body.type,
      joke: req.body.joke,
    });
  },
};
