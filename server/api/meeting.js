const router = require('express').Router();
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Membership = require('../models/membership');

module.exports = function (app) {

  // create a new meeting
  router.post('/meeting', function (req, res) {

    Meeting.createMeeting(req.body.title, req.body.timeslots, req.user._id)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
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
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  });

  // join an existing meeting
  router.post('/meeting/membership/:meetingId', function (req, res) {

    Membership.createMembership(req.params.meetingId, req.user._id, false)
      .then((membership) => {
        res.json({ res: 'success', data: membership});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err});
      });

  });

  // get users for an existing meeting
  router.get('/meeting/membership/:meetingId', function (req, res) {

    Membership.getMeetingMembers(req.params.meetingId)
      .then((members) => {
        res.json({ res: 'success', data: members });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
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
      });

  });

  return router;
}
