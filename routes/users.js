const express = require("express");
const router = express.Router();
const authMidler = require('../midlewares/auth');
const { User, Subject, UserSubject } = require("../models/User");

//rotas do users
router.get("/", authMidler, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authMidler, getUser, (req, res) => {
  res.json(res.user);
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  try {
    const newUser = await user.save();
    newUser.password = undefined;
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", authMidler, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.user.phone = req.body.phone;
  }
  try {
    const updateUser = await res.user.save();
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//rota que remove um usuario pelo id
router.delete("/:id", authMidler, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User was deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// midleware para verificar se o id existe
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cant find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
