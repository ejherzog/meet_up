const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/meeting');
const User = require('../models/user');
const Membership = require('../models/membership');
const Availability = require('../models/availability');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  // get meetings user is a member of
  router.get('/user/membership/', function (req, res) {

    Membership.getUserMeetings(req.user._id)
      .then((meetings) => {
        res.json({ res: 'success', data: meetings });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });

  });

  // check membership status of user in a meeting
  router.get('/user/:userId/membership/:meetingId', function (req, res) {

    Membership.getMembership(req.params.meetingId, req.params.userId)
      .then((membership) => {
        res.json({ res: 'success', data: membership });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });

  });

  // remove user from meeting
  router.delete('/user/membership/:meetingId', function (req, res) {

    Membership.userIsOwner(req.params.meetingId, req.user._id)
      .then((owner) => {
        if (owner) {
          res.json({ res: 'failure', data: 'Meeting cannot leave the meeting. Try deleting instead.'});
        } else {
          Membership.deleteMembership(req.params.meetingId, req.user._id)
            .then((membership) => {
              res.json({ res: 'success', data: membership });
            })
        }
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });

  });

  return router;

}
