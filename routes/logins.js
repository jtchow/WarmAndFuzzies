const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;                      // strength of hash? something like that
const router = express.Router();
let User = require('../models/user.model');


router.post('/signup', function(req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // encrypt password and insert user object into DB
    bcrypt.hash(req.body.password, saltRounds, function (err, password) {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        newUser.save()
        .then(() => res.json('User successfully added!'))
        .catch(err => res.status(400).json('Error: ' + err))
    });    
});

router.post('/login', function(req,res) {
    res.send('logging in')
});

router.delete('/logout', function(req,res) {
    res.send('logging out')
});


module.exports = router;