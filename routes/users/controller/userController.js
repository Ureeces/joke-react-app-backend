const User = require("../model/User");
const bcrypt = require("bcryptjs");
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    try {
      let createdUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);

      createdUser.password = hashedPassword;

      await createdUser.save();

      res.json({
        message: "User created",
      });
    } catch (e) {
      const { message, statusCode } = dbErrorHelper(e);

      res.status(statusCode).json({
        message: message,
      });
    }
  },

  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ email: req.body.email }).select(
        "-__v"
      );

      if (foundUser === null) {
        throw {
          message: "User not found, please sign up",
          code: 404,
        };
      }

      let comparedPassword = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (!comparedPassword) {
        throw "Check your email and password";
      }

      let jwtToken = jwt.sign(
        { email: foundUser.email, username: foundUser.username },
        process.env.JWT_USER_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        jwtToken,
      });
    } catch (e) {
      const { message, statusCode } = dbErrorHelper(e);

      res.status(statusCode).json({
        message: message,
      });
    }
  },
};
