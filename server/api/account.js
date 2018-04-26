const express = require('express');
const User = require('../models/user');
const isAuthenticated = require('../middlewares/isAuthenticated');
const jwt = require('jsonwebtoken');

// note we pass in app here to get  access to app.get('superSecret') later on
module.exports = (app) => {
  const accountRoutes = express.Router();

  accountRoutes.post('/signup', (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    User.addUser(email, name, password)
      .then((user) => {
        var payload = {
          id: user._id,
        };
        var token = jwt.sign(payload, app.get('superSecret'));
        res.json({ success: true, token: token });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: 'There was an error registering you',
        });
      });
  });

  accountRoutes.post('/login', (req, res) => {
    // TODO: This route will accept two fields from the POST request, a `username`  and a `password`.
    // Based on these do the following
    // 1. Find one user that has  a username corresponding to the username POSTed to this route
    // 1b. If there is no user that matches that  username, send back as json  the following:
    //  { success: false, message: 'Auth failed, no user' }
    // 2. If there is a  user, call the `check` static method from the User model. Based on what
    // it returns do the following
    // 2a. If the check is not valid (returns false) then send back via json
    //  { success: false, message: 'Auth failed, wrong pass' }
    // 2b. If check is valid, generate a JWT and set the payload { id: user._id }. Sign the
    //  JWT with the superSecret key from the app. Lastly send a json object back  to the client as follows:
    //    { success: true, message: 'Authentication successful', token: newToken }

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.json({ success: false, message: 'Auth failed, user not found' });
        } else {
          return User.check(req.body.email, req.body.password)
            .then((valid) => {
              if (!valid) {
                res.json({
                  success: false,
                  message: 'Auth failed, wrong pass',
                });
              } else {
                var payload = {
                  id: user._id,
                };
                var token = jwt.sign(payload, app.get('superSecret'));
                res.json({
                  success: true,
                  message: 'Authentication successful',
                  token: token,
                });
              }
            });
        }
      })
      .catch((err) => {
        res.json({ success: false, message: 'Auth failed, no user' });
      });
  });

  return accountRoutes;
};
