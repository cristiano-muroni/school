const express = require("express");
const router = express.Router();

const routerSubjects = require("./subjects");
const routerUsers = require("./users");
const routerAuth = require("./auth");
const authMidler = require("../midlewares/auth");


router.use("/sub", authMidler, routerSubjects);
router.use("/users", routerUsers);
router.use("/auth", routerAuth);

module.exports = router;
