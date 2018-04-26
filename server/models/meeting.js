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
    timeslots: timeslots,
    users: []
  });

  return newMeeting.save()
    .then((meeting) => {
      this.model('Membership').createMembership(meeting._id, currentUserId, true)
        .then((membership) => {
          return meeting;
        });
    });

}

meetingSchema.statics.getMeetingInfo = function (meetingId) {

  return this.findOne({ _id: meetingId })
    .then((meeting) => {
      if (meeting) {
        this.model('Availability').getAllUserAvailForMeeting(meetingId)
          .then((allAvail) => {
            return { meeting: meeting, availability: allAvail };
          })
      } else {
        throw new Error('No meeting with that id');
      }
    });

};

meetingSchema.statics.deleteMeeting = function (meetingId) {

  return this.findOneAndRemove({ _id: meetingId })
    .then((meeting) => {
      this.model('Membership').findAndRemove({ meetingId: meetingId })
        .then((membership) => {
          this.model('Availability').findAndRemove({ meetingId: meetingId })
            .then((availability) => {
              return meeting;
            })
        })
    })

}

module.exports = mongoose.model('Meeting', meetingSchema);
