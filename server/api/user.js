const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/user');

module.exports = function (app) {

  router.user(isAuthenticated(app));

  router.post('/user', function (req, res) {
    User.addUser(req.body.email, req.body.user, req.body.password)
      .then((user) => {
        res.json({ res: 'success', data: user });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err })
      });
  });

  router.post('/user/:id', function (req, res) {



  })

}
