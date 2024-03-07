const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    try {
      await newUser.save();
      res.json({ success: true });
    } catch (error) {
      res.status(404).json("User not found!");
    }
  });
  
   router.post("/login", async (req, res, ) => {
    const { email, password } = req.body;
    try {
      const validUser = await UserModel.findOne({ email });
      if (!validUser) {
        return res.status(404).json("User not found!");
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return res.status(401).json("Wrong credentials!");
      }
      const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      res.json(error);
    }
  });
  
  router.post("/google", async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new UserModel({
          name:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          image: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/signout", async (req, res) => {
    try {
      res.clearCookie("access_token");
      res.status(200).json("User has been logged out!");
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  module.exports = router;