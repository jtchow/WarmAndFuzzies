// define requirements
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const logins = require('./routes/logins');
const notes = require('./routes/notes');
require('dotenv').config();
var cookieParser = require('cookie-parser');
//const session = require('express-session');

// setup express
const app = express();
app.use(express.json());
app.use(cors())
// define routes
app.use('/', logins);
app.use('/notes', notes);
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// set up express-session
app.use(cookieParser());
//app.use(session({secret: "It's a secret"}));

const port = process.env.PORT || 5000;

// REDIS STUFF (COMMENTED OUT FOR NOW)

// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisStore = require('connect-redis')(session);

// // setup redis connection 
// redisClient.on('error', (err) => {
//   console.log('Redis error: ', err);
// });

// app.use(session({
//   secret: 'ThisIsHowYouUseRedisSessionStorage',
//   name: '_redisPractice',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
//   store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
// }));

// create mongoDB connection with my admin credentials 
//const uri = process.env.ATLAS_URI;

const uri = "mongodb://127.0.0.1:27017/warm-and-fuzzies"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use(cors({origin: true, credentials: true}));





// start server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});