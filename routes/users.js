const express = require('express');
const router = express.Router();
const {User, Subject} = require('../models/User');

//rotas do users
router.get('/', async (req, res) => {
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

router.delete('/:id',  (req, res) => {

});

//rotas do subjects
router.get('/', async (req, res) => {
    try {
        const subject = await Subject.find()
        res.json(subject);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

});

router.post('/sub', async  (req, res) => {
    const subject = new Subject({ 
        title: req.body.title, 
        note: req.body.note,
        user: req.body.user,
      
    })
    try {
        const newSubject = await subject.save(); 
        res.status(200).json(newSubject)

    } catch (error) {
        res.status(400).json({message: error.message});
        
    }

});

module.exports = router;