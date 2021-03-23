const express = require("express");
const router = express.Router();

const routerSubjects = require('./subjects');
const routerUsers = require('./users');

router.use('/sub',routerSubjects);
router.use('/users', routerUsers);










module.exports = router;