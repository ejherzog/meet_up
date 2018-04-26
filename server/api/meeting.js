const router = require('express').Router();
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Membership = require('../models/membership');

module.exports = function (app) {

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

  return router;
}
