const express = require("express");
const router = express.Router();
const { User, Subject, UserSubject } = require("../models/User");

//lista todas as materias
router.get("/", async (req, res) => {
  try {
    const subject = await Subject.find();
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//lista as materias por titulo
router.get("/matt", async (req, res) => {
  try {
    const subject = await Subject.find({ title: req.query.title });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//lista as materias por nome do usuario e por id do usuario
router.get("/mattuser", async (req, res) => {
  try {
    const name = req.query.name;
    const userId = req.query.id;

    if (userId) {
      const subject = await Subject.find({ "user._id": userId });
      return res.json(subject);
    }
    if (name) {
      const subject = await Subject.find({ "user.name": name });
      return res.json(subject);
    }
    return res.status(400).send({message: 'users not found'})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const users = await User.findById(req.body.user).exec();
    if (!users) {
      return res.status(400).send({ message: "user not found" });
    }
    const { name } = users;
    const userSubject = new UserSubject({ name, _id: req.body.user });

    const subject = new Subject({
      title: req.body.title,
      note: req.body.note,
      prove: req.body.prove,
      absences:req.body.absences,
      user: userSubject,
    });
    
    const newSubject = await subject.save();
    const { title, note, prove, absences, user } = newSubject;

    res.status(200).json({ title, note, prove, absences, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
