const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('./config');

// TODO: connect to our database via mongoose.connect. Grab the url from config.database
// STUB
mongoose.connect(process.env.MONGODB_URI || config.database);
// ENDSTUB

// load promisified functions into mongoose. Refer to
// http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/ for more info
// TODO: Read that article. Our tests assume you're returning promises in your database
// queries!
mongoose.Promise = global.Promise;

// instantiate express app
const app = express();

// set the superSecret key in our app which we will use  to sign our jwts
app.set('superSecret', config.secret);
// instantiate bodyParser middleware so we can get fields from post requests via req.body.fieldName
app.use(bodyParser.urlencoded({ extended: true }));
// instatiate bodyParser to also handle requests with JSON and not just form data
app.use(bodyParser.json());

// static directory setup
app.use(express.static(path.join(__dirname, '..', 'public')));

// if we dont hit any api routes, then serve index.html from public
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const accountRoutes = require('./api/account');
app.use('/account', accountRoutes(app));

const meeting = require('./api/meeting');
app.use('/api', meeting(app));

const user = require('./api/user');
app.use('/api', user(app));

const avail = require('./api/availability');
app.use('/api', avail(app));

// set up app to listen on port 3000  or any env port specified
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000));
});

// export app for testing purposes
module.exports = app;
