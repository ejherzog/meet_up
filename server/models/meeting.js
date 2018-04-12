const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meetingSchema = new Schema({

  title: { type: String, required: true },
  timeslots: [{type: Date}],
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: { createdAt: 'created_at' },
});

meetingSchema.statics.createMeeting = function (title, timeslots) {

  let newMeeting = new this({
    title: title,
    timeslots: timeslots
  });

  return newMeeting.save();

}

meetingSchema.statics.getMeetingInfo = function (meetingId) {

  return this.findOne({ _id: meetingId})
    .then((meeting) => {
      if (meeting) {
        return meeting;
      } else {
        throw new Error('No meeting with that id');
      }
    });

};

meetingSchema.methods.addUserToMeeting = function (user) {

  let availability = meeting.timeslots.map(timeslot => {
    {timeSlot: timeslot, available: false}
  });
  user.availability = availability;
  meeting.users.push(user);
  return meeting.save();

}

module.exports = mongoose.model('Meeting', meetingSchema);
