const express = require('express');
const router = express.Router();


// Bring in the User Model
let User = require('../models/user.model');


// TODO: maybe move this somewhere else? 
function checkIfEmailExists(signupEmail){
    return User.findOne({email: signupEmail}).then(function(result){
        if (result === null){
            return false;
        }
        else {
            return true;
        }
    });
}


router.post('/', function(req,res) {
    if (req.session.email) {
        res.status(200).send('Logged in, send to write page');
    }

    else {
        res.status(400).send('Must login first');
    }
});

router.post('/signup', function(req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName; 
    const email = req.body.email;
    const password = req.body.password;

    checkIfEmailExists(email).then(function(emailExists) {
        if (emailExists) {
            res.status(400).send('User account already created with this email');

        }
        else {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            });

            newUser.password = newUser.generateHash(newUser.password);
            newUser.save()
            .then(() => res.status(200).send('User successfully added!'))
            .catch(err => res.status(500).json('Error: ' + err))
        }   
    });
});


// Route for Login Process
router.post('/login', function(req,res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (err, user) => {
        if (err) {
            res.status(500).send('Error: server error');
        }
        
        else if (user === null) {
            res.status(404).send('Error: no user exists with that email');
        }

        else if (!user.validPassword(password)) {
            res.status(404).send('Error: Invalid Password');
        }

        else {
            req.session.email = user.email;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            res.status(200).send('Successfully logged in');
        } 
    });
});


router.get('/logout', function(req,res) {
    req.session.destroy(function(err){
        if(err){
            res.status(500).send('Error: could not log out');
        } else {
            res.status(200).send('Logged out');     
        }
    });
});


router.get('/user', function(req,res) {
    User.findOne({email: email}, {firstName: 1, lastName: 1, email: 1}, (err, userData) => {
        if (err) {
            res.status(500).send('Error: server error');
        }

        else {
            res.status(200).send(userData);
        }
    });
});


router.post('/user/update', function(req,res) {
    // TODO handle current user email
    const email  = req.session.email;
    const newEmail = req.body.newEmail;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName ;

    User.update(
        { email: email },
        { $set: { email: newEmail, firstName: newFirstName, lastName: newLastName } }
    );
});


// WHAT IT'S FOR: updating user data
// path name: /user/update/:id
// is given first name and last name to update


module.exports = router;