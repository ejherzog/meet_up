const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meetingSchema = new Schema({

  title: { type: String, required: true },
  timeslots: [{type: Date}]
}, {
  timestamps: { createdAt: 'created_at' },
});

meetingSchema.statics.createMeeting = function (title, timeslots) {

  let newMeeting = new this({
    title: title,
    timeslots: timeslots,
    users: []
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

meetingSchema.statics.addUserToMeeting = function (meetingId, userId) {

  return this.model('User').findOne({ _id: userId })
    .then((user) => {
      if (user) {
        this.findOne({ _id: meetingId })
          .then((meeting) => {
            if (meeting) {
              if (meeting.users.indexOf(user) == -1) {
                throw new Error('User already part of meeting');
              } else {
                meeting.users.push(user);
                return meeting.save();
              }
            } else {
              throw new Error('No meeting found');
            }
          })
      } else {
        throw new Error('No user found');
      }
    });

}

meetingSchema.statics.deleteMeeting = function (meetingId) {

  return this.findOneAndRemove({ _id: meetingId });

}

module.exports = mongoose.model('Meeting', meetingSchema);
