const express = require('express');
const router = express.Router();
let Note = require('../models/note.model');


// View notes endpoint 
router.get('/view', function(req,res) {
    const selectedUser = req.body.user;

    // search notes collection for the selected user and return data
    Note.find({recipient: selectedUser},(err,data)=>{
        if(err) res.send(err)
          res.send(data)
          });  
});


// Send note endpoint
router.post('/send', function(req,res) {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const contents = req.body.contents;

    // create new Note object for DB insertion
    const newNote = new Note({
        sender,
        recipient,
        contents
    });

    // save note to DB and send response or error message
    newNote.save()
    .then(() => res.send('Sent warm and fuzzy!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;