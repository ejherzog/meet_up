const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/tweet');
const User = requre('../models/user');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  router.post('/meeting', function (req, res) {

    Meeting.createMeeting(req.body.title, req.body.timeslots)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  })

  router.get('/meeting/:id', function (req, res) {

    let meetingId = req.params.id;

    Meeting.getMeetingInfo(meetingId)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  router.post('/meeting/:id/user/:userid', function (req, res) {

    let meetingId = req.params.id;
    let userId = req.params.userid;

    return Meeting.addUserToMeeting(meetingId, userId)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });
}
