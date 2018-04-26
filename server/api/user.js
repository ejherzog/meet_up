const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Membership = require('../models/membership');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  router.delete('/user/:id', function (req, res) {

    // delete membership or meetings
    // delete availability
    // then, delete user

    User.deleteUser(req.params.id)
      .then((user) => {
        res.json({ res: 'success', data: user });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });

  });

  return router;

}
