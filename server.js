// define requirements
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const logins = require('./routes/logins');
const notes = require('./routes/notes');
require('dotenv').config();


// setup express
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;


// setup redis connection 
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

app.use(session({
  secret: 'ThisIsHowYouUseRedisSessionStorage',
  name: '_redisPractice',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

// create mongoDB connection with my admin credentials 
const uri = process.env.ATLAS_URI;
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