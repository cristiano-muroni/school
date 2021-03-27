const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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
    select: true,
  },
  phone: String,
  date: { type: Date, default: Date.now },
  registered: Boolean,
});
const UserSubjectSchema = new mongoose.Schema({
  name: String,
});

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  note: Number,
  prove: Number,
  absences: Number,
  user: UserSubjectSchema,
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

const User = mongoose.model("User", UserSchema);
const Subject = mongoose.model("Subject", SubjectSchema);
const UserSubject = mongoose.model("UserSubject", UserSubjectSchema);

module.exports = { User, Subject, UserSubject };
