const express = require('express');
const router = express.Router();
let Note = require('../models/note.model');

router.get('/view', function(req,res) {
    const selectedUser = req.body.user;
    Note.find({recipient: selectedUser},(err,data)=>{
        if(err) res.send(err)
          res.send(data)
          });  
});

router.post('/send', function(req,res) {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const contents = req.body.contents;

    const newNote = new Note({
        sender,
        recipient,
        contents
    });

    newNote.save()
    .then(() => res.send('Sent warm and fuzzy!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;