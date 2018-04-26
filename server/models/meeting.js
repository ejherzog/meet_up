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

  return this.findOneAndRemove({ _id: meetingId });

}

module.exports = mongoose.model('Meeting', meetingSchema);
