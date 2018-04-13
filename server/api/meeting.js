const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Meeting = require('../models/tweet');
const User = requre('../models/user');

module.exports = function (app) {

  router.use(isAuthenticated(app));

  router.get('/meeting/:id', function (req, res) {

    let meetingId = req.params.id;

    Meeting.getMeetingInfo(meetingId)
      .then((meeting) => {
        res.json({ res: 'success', data: meeting});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err})
      });

  })
}