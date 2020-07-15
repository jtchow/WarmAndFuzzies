const express = require('express');
const router = express.Router();
let Note = require('../models/note.model');
let User = require('../models/user.model');


// View notes endpoint 
router.get('/view/:email', async (req,res) =>  {
    const userEmail = req.params.email;
    console.log(req.params);
    console.log(userEmail);
    try{
        const notes = await Note.find({recipient: userEmail}) 
        if (!notes){
            return res.status(204).send("This user has received no notes");
        }
        res.status(200).send(notes)
    }catch (e){
        console.log("An error happened");
        res.status(500).send(e)
    }
});

// Send note endpoint
router.post('/send', async (req,res) => {
    try{
        const {sender, recipient, message:contents} = req.body;
         // create new Note object for DB insertion
        const newNote = new Note({
            sender,
            recipient,
            contents
        });

        const note = await newNote.save();
        const update = await User.update(
            { email: sender },
            { $push: { writtenTo: recipient } })
        res.status(200).send({note: note, update: update})


    } catch (e) {
        res.status(500).send(e);
    }

});



// Get list of all users written to. Return value: cursor with list of emails
router.get('/users-written-to', function(req,res) {
    const currentUserEmail = req.query.email;
    User.findOne({email: currentUserEmail}, {writtenTo: true}, (err, usersWrittenTo)=>{
        if (err) {
            res.status(404).send("Error: Could not retrieve written to user list");
        }

        else {
            res.status(200).send(usersWrittenTo);
        }
    });
});

module.exports = router;