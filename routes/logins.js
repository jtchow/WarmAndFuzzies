const express = require('express');
const router = express.Router();


// Bring in the User Model
let User = require('../models/user.model');
//var isLoggedIn = false;


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
        console.log("logged in");
    }

    else {
        res.status(400).send('Must login first');
        console.log("failed to see homepage");
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
            // req.session.email = user.email;
            // req.session.firstName = user.firstName;
            // req.session.lastName = user.lastName;
            // isLoggedIn = true;
            // console.log(req.session.firstName);
            //res.redirect('/write');

            res.status(200).send('Successfully logged in');
        } 
    });
});


router.get('/logout', function(req,res) {
    req.session.destroy(function(err){
        if(err){
            res.status(500).send('Error: could not log out');
        } else {
            isLoggedIn = false;
            res.status(200).send('Logged out');     
        }
    });
});

// WHAT IT'S FOR: get user data for displaying on profile + updating too 
// returns that user model/object
// path name: /user/:id
// router.get('/userinfo', function(req, res){
//     if (isLoggedIn){
//          var userData = {
//              username: req.session.email, 
//              firstName : req.session.firstName,
//              lastName : req.session.lastName
//          }
//          res.send(userData);
//     }else{
//          res.send("not logged in");
//      }
// });



// router.get('/isAuth'), function(req, res){
//     if (isLoggedIn){
//         res.send(true);
//     }
//     else{
//         res.send(false);
//     }
// }

// WHAT IT'S FOR: updating user data
// path name: /user/update/:id
// is given first name and last name to update


module.exports = router;