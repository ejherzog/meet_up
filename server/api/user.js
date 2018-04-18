const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/user');

module.exports = function (app) {

  router.use(isAuthenticated(app));

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

    User.updateUser(req.body.name, req.body.availability)
      .then((user) => {
        res.json({ res: 'success', data: user });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err })
      });

  });

  router.delete('/user/:id', function (req, res) {

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
