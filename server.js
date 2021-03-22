require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { UserSchema, MateriaSchema } = require("./models/User");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("database Connected"));

const User = mongoose.model("User", UserSchema);
const Materia = mongoose.model("Materia", MateriaSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/users");
app.use("/users", users);

app.listen("3000", () => console.log("Server Running"));
