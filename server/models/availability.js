const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let availSchema = new Schema({

  user: { type: Schema.ObjectId, ref: 'User' },
  meeting: { type: Schema.ObjectId, ref: 'Meeting' },
  timeslot: { type: Date }

});

availSchema.statics.createAvailability = function (userId, meetingId, timeslot) {

  if (userId && meetingId && timeslot) {

    let newAvail = new this({
      user: userId,
      meeting: meetingId,
      timeslot: timeslot
    });
    return newAvail.save();
  } else {
    throw new Error('Missing parameters');
  }

}

availSchema.statics.getAllUserAvailForMeeting = function (meetingId) {

  return this.find({ meeting: meetingId })
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