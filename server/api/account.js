const express = require('express');
const User = require('../models/user');
const isAuthenticated = require('../middlewares/isAuthenticated');
const jwt = require('jsonwebtoken');

// note we pass in app here to get  access to app.get('superSecret') later on
module.exports = (app) => {
  const accountRoutes = express.Router();

  // join MeetUp
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

  // login to MeetUp
  accountRoutes.post('/login', (req, res) => {

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
