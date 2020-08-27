// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require("redis");
const logins = require('./routes/logins');
const notes = require('./routes/notes');

require('dotenv').config();

// redis connection
let redisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    password: process.env.REDIS_PASSWORD
});
redisClient.on('connect', function () {
    console.log("Redis client connected");
})
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});


// setup express
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(session({
    secret: 'mysecret',
    name: '_testRedis',
    cookie: { secure: false },
    // will need to change host if we deploy
    store: new redisStore({client: redisClient }),
    //    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
    saveUnitialized: true,
    resave: false
}))

// define routes
app.use('/', logins);
app.use('/notes', notes);


// set up express-session
app.use(cookieParser());
//app.use(session({secret: "It's a secret"}));

const port = process.env.PORT || 5000;

// create mongoDB connection with my admin credentials (not connected rn)
const uri = process.env.ATLAS_URI;

//const uri = process.env.ATLAS_URI
//const uri = "mongodb://127.0.0.1:27017/warm-and-fuzzies"; // I have mine set up locally for now
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});






// start server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});