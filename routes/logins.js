const express = require('express')
const router = express.Router()
let User = require('../models/user.model')

router.post('/signup', function(req,res) {
    const username = req.body.name;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;         // TODO encrypt password somewhere/ don't use plaintext
    // TODO add metadata like date 

    const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password
    });

    newUser.save()
    .then(() => res.json('User successfully added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/login', function(req,res) {
    res.send('logging in')
});

router.delete('/logout', function(req,res) {
    res.send('logging out')
});


module.exports = router;