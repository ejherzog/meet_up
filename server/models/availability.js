const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let availSchema = new Schema({

  user: { type: Schema.ObjectId, ref: 'User' },
  meeting: { type: Schema.ObjectId, ref: 'Meeting' },
  timeslot: { type: Date }

});

availSchema.statics.createAvailability = function (userId, meetingId, timeslot) {

  return this.model('User').findOne({ _id: userId })
    .then((user) => {
      if (user) {
        return this.model('Meeting').findOne({ _id: meetingId })
          .then((meeting) => {
            let newAvail = new this({
              user: user,
              meeting: meeting,
              timeslot: timeslot
            });
            return newAvail.save();
          })
      } else {
        throw new Error('No user with given id');
      }
    });

}

availSchema.statics.getAllUserAvailForMeeting = function (meetingId) {

  return this.model('Meeting').findOne({ _id: meetingId })
    .then((meeting) => {
      if (meeting) {
        return this.find({meeting: meeting})
          .then((allUserAvail) => {
            if (allUserAvail) {
              return allUserAvail;
            } else {
              throw new Error('No availability for that meeting');
            }
          })
      } else {
        throw new Error('No meeting found with given id');
      }
    });

}

availSchema.statics.deleteAvailability = function (meetingId, userId, timeslot) {

  return this.findOneAndRemove({user_id: userId, meeting_id: meetingId, timeslot: timeslot});

}

availSchema.statics.deleteAvailability = function (availId) {

  return this.findOneAndRemove({ _id: availId });

}

module.exports = mongoose.model('Availability', availSchema);
