const express = require('express')
const router = express.Router()


router.post('/signup', function(req,res) {
    res.send('signing up')
});

router.post('/login', function(req,res) {
    res.send('logging in')
});

router.delete('/logout', function(req,res) {
    res.send('logging out')
});


module.exports = router;