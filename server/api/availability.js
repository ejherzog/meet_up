const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');

module.exports = function (app) {

  //router.use(isAuthenticated(app));

  router.post('/availability', function (req, res) {

    Availability.createAvailability(req.body.meetingId, req.body.userId, req.body.timeslot)
      .then((avail) => {
        res.json({ res: 'success', data: avail});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  })

  router.get('/availability/:id', function (req, res) {

    let availId = req.params.id;

    Availability.getAllUserAvailForMeeting(availId)
      .then((allAvail) => {
        res.json({ res: 'success', data: allAvail});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  router.delete('/availability/:id?', function (req, res) {

    if (req.params.id) {
      let availId = req.params.id;
      Availability.deleteAvailability(availId)
        .then((avail) => {
          res.json({ res: 'success', data: avail});
        })
        .catch((err) => {
          res.json({ res: 'failure', data: err})
        });
    } else {
      let meetingId = req.body.meetingId;
      let userId = req.body.userId;
      let timeslot = req.body.timeslot;
      Meeting.getMeetingInfo(meetingId)
        .then((meeting) => {
          User.getUser(userId)
          .then((user) => {
            Availability.deleteAvailability(meeting, user, timeslot)
              .then((avail) => {
                res.json({ res: 'success', data: avail});
              })
              .catch((err) => {
                res.json({ res: 'failure', data: err})
              })
          });
        });
    }

  });

  return router;
}
