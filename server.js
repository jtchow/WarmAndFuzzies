// define requirements
const express = require('express');
const mongoose = require('mongoose');
const logins = require('./routes/logins');
const notes = require('./routes/notes');
require('dotenv').config();


// setup express
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;


// create mongoDB connection with my admin credentials 
const uri = 'mongodb+srv://jtchow:k0DE0ylBUdX8zsLo@warmandfuzzies-jurjp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});



// define routes
app.use('/', logins);
app.use('/notes', notes);


// start server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});