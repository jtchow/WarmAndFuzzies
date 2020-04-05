const express = require('express')
const router = express.Router()


router.get('/view', function(req,res) {
    res.send("here's all your notes!")
})

router.post('/send', function(req,res) {
    res.send("sending someone a note")
})

module.exports = router