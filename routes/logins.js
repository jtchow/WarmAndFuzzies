const express = require('express')
const router = express.Router()


router.post('/signup', function(req,res) {
    res.send('signing up')
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;         // TODO encrypt password somewhere/ don't use plaintext
    // TODO add metadata like date 

    const newUser = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/login', function(req,res) {
    res.send('logging in')
});

router.delete('/logout', function(req,res) {
    res.send('logging out')
});


module.exports = router;