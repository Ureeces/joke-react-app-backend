const express = require("express");
const router = express.Router();
const passport = require("passport");

const { signUp, login } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up", signUp);

router.post("/sign-in", login);

router.get(
  "/get-user-info",
  passport.authenticate("jwt-user", { session: false }),
  function (req, res) {
    res.json({
      user: req.user,
      message: "success",
    });
  }
);

module.exports = router;
