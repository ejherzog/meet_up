const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meetingSchema = new Schema({

  title: { type: String, required: true },
  timeslots: [{type: Date}]
}, {
  timestamps: { createdAt: 'created_at' },
});

meetingSchema.statics.createMeeting = function (title, timeslots, currentUserId) {

  let newMeeting = new this({
    title: title,
    timeslots: timeslots
  });

  return newMeeting.save()
    .then(saved => this.model('Membership').createMembership(saved._id, currentUserId, true))
    .then(membership => this.findOne({ _id: membership.meeting }));

}

meetingSchema.statics.getMeetingInfo = function (meetingId) {

  return this.findOne({ _id: meetingId })
    .then((meeting) => {
      if (meeting) {
        return meeting;
      } else {
        throw new Error('No meeting with that id');
      }
    });

};

meetingSchema.statics.deleteMeeting = function (meetingId) {

  return this.findOneAndRemove({ _id: meetingId });

}

module.exports = mongoose.model('Meeting', meetingSchema);
