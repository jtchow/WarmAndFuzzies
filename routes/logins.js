const express = require('express')
const router = express.Router()


router.get('/login', function(req,res) {
    res.send('logging in')
})


router.get('/signup', function(req,res) {
    res.send('signing up')
})

module.exports = router