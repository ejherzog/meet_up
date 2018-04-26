const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Availability = require('../models/availability');
const Membership = require('../models/membership');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  // add new available timeslot for current user in specified meeting
  router.post('/availability', function (req, res) {

    Availability.createAvailability(req.body.meetingId, req.user._id, req.body.timeslot)
      .then((avail) => {
        res.json({ res: 'success', data: avail});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  })

  // get all availability records for existing meeting
  router.get('/availability/:meetingid', function (req, res) {

    let meetingId = req.params.meetingid;

    Availability.getAllUserAvailForMeeting(meetingId)
      .then((allAvail) => {
        res.json({ res: 'success', data: allAvail});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  // delete existing availability for current user in specified meeting
  router.delete('/availability', function (req, res) {

    let meetingId = req.body.meetingId;
    let userId = req.user._id;
    let timeslot = req.body.timeslot;
    Availability.deleteAvailability(meetingId, userId, timeslot)
      .then((avail) => {
        res.json({ res: 'success', data: avail});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  return router;
}
