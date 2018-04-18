const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');

module.exports = function (app) {

 // router.use(isAuthenticated(app));

  router.post('/user', function (req, res) {
    User.addUser(req.body.email, req.body.name, req.body.password)
      .then((user) => {
        res.json({ res: 'success', data: user });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err })
      });
  });

  router.post('/user/:userid/meeting/:meetingid', function (req, res) {

    let meetingId = req.params.meetingid;
    let userId = req.params.userid;

    return Meeting.addUserToMeeting(meetingId, userId)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  router.delete('/user/:id', function (req, res) {

    User.deleteUser(req.params.id)
      .then((user) => {
        // TODO add removal from array in Meeting objects
        res.json({ res: 'success', data: user });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });

  });

  return router;

}
