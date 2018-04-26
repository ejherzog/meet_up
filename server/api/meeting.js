const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Membership = require('../models/membership');
const Availability = require('../models/availability');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  // create a new meeting
  router.post('/meeting', function (req, res) {

    Meeting.createMeeting(req.body.title, req.body.timeslots, req.user._id)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err});
      });

  });

  // get information about existing meeting
  router.get('/meeting/:id', function (req, res) {

    let meetingId = req.params.id;

    Meeting.getMeetingInfo(meetingId)
      .then((meeting) => {
        Membership.getMeetingMembers(meetingId)
          .then((members) => {
            Membership.userIsMember(meetingId, req.user._id)
              .then((isMember) => {
                if (isMember) {
                  Availability.getAllUserAvailForMeeting(meetingId)
                    .then((avail) => {
                      res.json({ res: 'success', data: {meeting: meeting, members: members, availability: avail}});
                    })
                } else {
                  res.json({ res: 'success', data: {meeting: meeting, members: members }});
                }
              })
          })
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  // join an existing meeting
  router.post('/meeting/membership/:meetingId', function (req, res) {

    Membership.userIsMember(req.params.meetingId, req.user._id)
      .then((isMember) => {
        if (isMember) {
          res.json({ res: 'failure', message: 'User is already a member.'});
        } else {
          Membership.createMembership(req.params.meetingId, req.user._id, false)
            .then((membership) => {
              res.json({ res: 'success', data: membership});
            })
            .catch((err) => {
              res.json({ res: 'failure', data: err});
            });
        }
      });

  });

  // delete an existing meeting
  router.delete('/meeting/:meetingId', function (req, res) {

    Membership.userIsOwner(req.params.meetingId, req.user._id)
      .then((owner) => {
        if (owner) {
          Meeting.deleteMeeting(req.params.meetingId)
            .then((meeting) => {
              res.json({ res: 'success', data: meeting });
            })
            .catch((err) => {
              res.json({ res: 'failure', data: err });
            })
        } else {
          res.json({ res: 'failure', data: 'You must own the meeting to delete it.' });
        }
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      })

  });

  return router;
}
