const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  note: Array,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: String,
  date: { type: Date, default: Date.now },
  registered: Boolean,
});


const Subject = mongoose.model("Subject", SubjectSchema);
const User = mongoose.model("User", UserSchema);

module.exports = Subject, User;
