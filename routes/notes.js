const express = require('express');
const router = express.Router();
let Note = require('../models/note.model');
let User = require('../models/user.model');


// View notes endpoint 
router.get('/view', function(req,res) {
    // TODO handle multiple documents returned here? 
    const userEmail = req.session.email;
    Note.find({recipient: userEmail},(err,notes)=>{
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

// RETURN ALL USERS ROUTE
// WHAT IT DOES: get list of all users
// route path: /users
// returns array of all user ids in the database
// IF POSSIBLE, can we return an array of tuples (user_id, firstname, lastname)
// that way we can easily display all info it on the write Notes page
// LOGIC: query db for all users and return


// RETURN WRITTEN TO USERS ROUTE
// WHAT IT DOES: get all users that a specific user has written notes to
// route path: /written/:id
// use req.params.id to get the id off that path
// returns an array of user ids who we've sent notes to
// LOGIC: query db for email: req.session.email then return writtenTo array of emails


// RETURN NOT WRITTEN TO USERS ROUTE
// logic: find users where email not like logged in user's writtenTo array
module.exports = router;