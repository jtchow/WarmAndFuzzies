const express = require('express');
const router = express.Router();
let Note = require('../models/note.model');
let User = require('../models/user.model');


// View notes endpoint 
router.get('/view', function(req,res) {
    // TODO handle multiple documents returned here? 
    const userEmail = req.session.email;
    Note.find({recipient: userEmail},(err, notes)=>{
        if(err) {
            res.status(404).send(err);
        }
        else {
            res.status(200).send(notes);
        }
    });
});


// Send note endpoint
router.post('/send', function(req,res) {
    const sender = req.session.email;
    // TODO recipient needs to be an email
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
    .then(() => res.status(200).send('Sent warm and fuzzy!'))
    .catch(err => res.status(500).json('Error: ' + err));

    // update user writtenTo array in DB
    User.update(
        { email: sender },
        { $push: { writtenTo: recipient } }
    );
});


// Get list of all users. Return value: cursor with user first name, last name, and email
router.get('/users-all', function(req,res) {
    User.find({}, {firstName: 1, lastName: 1, email: 1},(err, users)=>{
        if (err) {
            res.status(404).send("Error: Could not retrieve user list");
        }

        else {
            console.log("sending users");
            console.log(users);
            res.status(200).send(users);
        }
    });
});


// Get list of all users written to. Return value: cursor with list of emails
router.get('/users-written-to', function(req,res) {
    currentUserEmail = req.query.email;
    User.findOne({email: currentUserEmail}, {writtenTo: true},(err, usersWrittenTo)=>{
        if (err) {
            res.status(404).send("Error: Could not retrieve written to user list");
        }

        else {
            res.status(200).json(usersWrittenTo);
        }
    });
});


module.exports = router;