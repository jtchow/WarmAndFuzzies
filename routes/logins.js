const express = require('express');
const router = express.Router();
const multer = require('multer')
const sharp = require('sharp')
// Bring in the User Model
let User = require('../models/user.model');


// Sign Up Route
router.post('/signup', async (req,res) =>  {
    const {firstName, lastName, email, password} = req.body;

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
// right now we just remove the cookies in the frontend
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

// Get user information
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

// Get list of all users. Return value: cursor with user first name, last name, and email
router.get('/users-all', async (req,res) => {
    try{
        const users = await User.find({}, {firstName: 1, lastName: 1, email: 1})
        // check if users were found
        if (!users){
            return res.status(204).send("There are currently no users to send notes to")
        }
        res.status(200).send(users);

    }catch(e){
        res.status(500).send(e);
    }
});

// can handle user profile changes
router.post('/user/update', async (req, res) => {
    // TODO logic for if param is null, don't update 
    try{
        const {email, firstName:newFirstName, lastName:newLastName} = req.query;

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

// USER PROFILE PICTURES

// uploading middleware
const upload = multer({
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload a jpdg, jpeg, or png file"))
        }
        cb(undefined, true)
    }
})

// Adding/Updating a profile picture
// must pass in email (for now) as a query
router.post('/user/profile-pic', upload.single('profile-pic'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer()
    // get the user 
    const user = await User.findOne({email: req.query.email});
    if (!user){
        return res.status(400).send({error: "No user with that email was found"})
    }
    // save the profile picture
    user.picture = buffer 
    await user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

// getting profile picture
router.get('/user/profile-pic', async (req, res) => {
    try{
        const user = await User.findOne({email: req.query.email});
        if (!user){
            return res.status(400).send("No user was found with that email");
        }
        // fetch and return the profile picture! 
        res.set('Content-Type', 'image/jpg')
        res.send(user.picture);
    }
    catch (e) {
        res.status(404).send(e);
    }
})


module.exports = router;