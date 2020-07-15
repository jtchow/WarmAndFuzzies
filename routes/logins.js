const express = require('express');
const router = express.Router();


// Bring in the User Model
let User = require('../models/user.model');


router.post('/signup', async (req,res) =>  {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName; 
    const email = req.body.email;
    const password = req.body.password;

    try{
        // Check if the email is in use already
        const existingUser = await User.findOne({email: email})
        if (existingUser){ // if email already taken 
            console.log("existing user");
            return res.status(400).send({error: "Email already in use"});
        }

        // Create and save new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });     
        // FIX PASSWORD ENCRYPTION LATER! 
        newUser.password = newUser.generateHash(newUser.password);
        await newUser.save()
        res.status(201).send(newUser);
    }catch(e){
        res.status(400).send(e)
    }
});


// Route for Login Process
router.post('/login', async (req,res) => {
    try{
        // Attempt to fetch user associated with given email
        const user = await User.findOne({email: req.body.email})
        if (!user){ // not a valid email
            return res.status(404).send({error: "No user exists with that email"})
        }

        // check if password correct
        if (!user.validPassword(req.body.password)){
            return res.status(401).send({error: "Incorrect password"})
        }

        // send back user information (CHANGE THIS LATER!)
        console.log(user);
        const userInfo = {
            email: user.email, 
            firstName: user.firstName, 
            lastName: user.lastName
        }

        // activate session somehow?

        res.status(200).send(userInfo);


    } catch(e){
        res.status(500).send(e);
    }
});

// NOT SURE HOW THIS WOULD WORK (not in use right now)
router.get('/logout', function(req,res) {
    res.send("Not implemented yet!")
    // req.session.destroy(function(err){
    //     if(err){
    //         res.status(500).send('Error: could not log out');
    //     } else {
    //         res.status(200).send('Logged out');     
    //     }
    // });
});

router.get('/user', async (req,res) => {
    try{
        const userData = await User.findOne({email: req.query.email}, {firstName: 1, lastName: 1, email: 1})
        // check if a user found
        if (!userData){ 
            return res.status(404).send({error: "No user was found"})
        }
        // send user data 
        res.status(200).send(userData);

    } catch(e){
        res.status(500).send(e);
    }
});

// can handle user profile changes
router.post('/user/update', async (req, res) => {
    // TODO logic for if param is null, don't update 
    try{
        const email  = req.query.email;
        const newFirstName = req.query.firstName;
        const newLastName = req.query.lastName;

        if (!email || !newFirstName || !newLastName){
            return res.status(400).send({error: "invalid update params"})
        }

        const updates = await User.updateOne( { email: email },
            { $set: { firstName: newFirstName, lastName: newLastName } })
        
        res.status(200).send(updates);

    }catch (e){
        res.status(500).send(e);
    }

});


module.exports = router;