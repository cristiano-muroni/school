const express = require('express');
const router = express.Router();
const {User, Subject} = require('../models/User');

router.get('/',  (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

});

router.get('/:id',  (req, res) => {

});

router.post('/', async  (req, res) => {
    const user = new User({ 
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    })
    try {
        const newUser = await user.save(); 
        res.status(200).json(newUser)

    } catch (error) {
        res.status(400).json({message: error.message});
        
    }

});

router.patch('/:id',  (req, res) => {

});

router.delet('/:id',  (req, res) => {

});


module.exports = router;