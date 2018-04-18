const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let availSchema = new Schema({

  user: { type: Schema.ObjectId, ref: 'User' },
  meeting: { type: Schema.ObjectId, ref: 'Meeting' },
  timeslot: { type: Date }

});

availSchema.statics.createAvailability = function (user, meeting, timeslot) {

  let newAvail = new this({
    user: user,
    meeting: meeting,
    timeslot: timeslot
  });

  return newAvail.save();

}

availSchema.statics.getAllUserAvailForMeeting = function (meeting) {

  return this.find({ meeting: meeting })
    .then((allUserAvail) => {
      if (allUserAvail) {
        return allUserAvail;
      } else {
        throw new Error('No availability for that meeting');
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
