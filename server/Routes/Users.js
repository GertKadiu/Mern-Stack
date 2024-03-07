const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const bcryptjs = require("bcryptjs")


router.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  try {
    UserModel.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        age: req.body.age,
      },
      { new: true }
    )
      .then((updateUser) => res.json(updateUser))
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    console.error("Error reading and encoding image:", error);
    res.status(500).json({ error: "Error reading and encoding image" });
  }
});

router.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/SingleUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

module.exports = router;
