const express = require("express");
const router = express.Router();
const { User, Subject, UserSubject } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function generateToken(params = {}) {
  try {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 3600,
    });
  } catch (error) {
    throw new Error(error);
  }
}

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    //const userProps = ["name", "email", "password"]; // array de propriedades a retornar no objeto de usuario
    const user = await User.findOne({ email });

    console.log("user", user);

    if (!user) {
      return res.status(400).send({ error: " User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "password invalid" });
    }
    user.password = undefined; // para não exibir a senha no retorno da req
    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
