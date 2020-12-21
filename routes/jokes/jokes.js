const express = require("express");
const router = express.Router();

const { createJoke } = require("./controller/jokeController");

router.get("/", function (req, res, next) {
  res.send("respond with a resource.");
});

router.post("/create-joke", createJoke);

router.get("/get-joke");

module.exports = router;
