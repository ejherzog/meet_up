const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let membershipSchema = new Schema({

  user: { type: Schema.ObjectId, ref: 'User', required: true },
  meeting: { type: Schema.ObjectId, ref: 'Meeting', required: true },
  isOwner: { type: Boolean }

});

membershipSchema.statics.createMembership = function (meetingId, userId, isOwner = false) {

  let newMember = new this({
    user: userId,
    meeting: meetingId,
    isOwner: isOwner
  });

  return newMember.save();

}

membershipSchema.statics.getMembership = function (meetingId, userId) {

  return this.findOne({ meeting: meetingId, user: userId })
    .then((membership) => {
      if (membership) {
        if (membership.isOwner) {
          return {isMember: true, isOwner: true};
        } else {
          return {isMember: true, isOwner: false}
        }
      } else {
        return {isMember: false, isOwner: false}
      }
    });

}

membershipSchema.statics.getMeetingMembers = function (meetingId) {

  return this.find({ meeting: meetingId })
    .then((allMeetingUsers) => {
      if (allMeetingUsers) {
        return allMeetingUsers;
      } else {
        throw new Error('No meeting or users found.');
      }
    });

}

membershipSchema.statics.getMeetingOwner = function (meetingId) {

  return this.find({ meeting: meetingId })
    .then((allMeetingUsers) => {
      for (var i = 0; i < allMeetingUsers.length; i++) {
        if (allMeetingUsers[i].isOwner) {
          return allMeetingUsers[i];
        }
      }
      throw new Error('No meeting or meeting owner found');
    });

}

membershipSchema.statics.getUserMeetings = function (userId) {

  return this.find({ user: userId })
    .then((allUserMeetings) => {
      if (allUserMeetings) {
        return allUserMeetings;
      } else {
        throw new Error('No user or meetings found.');
      }
    });
}

membershipSchema.statics.userIsMember = function (meetingId, userId) {

  return this.findOne({ meeting: meetingId, user: userId })
    .then((membership) => {
      if (membership) {
        return true;
      } else {
        return false;
      }
    });

}

membershipSchema.statics.userIsOwner = function (meetingId, userId) {

  return this.findOne({ meeting: meetingId, user: userId })
    .then((membership) => {
      console.log(membership);
      if (membership && membership.isOwner) {
        return true;
      } else {
        return false;
      }
    });

}

membershipSchema.statics.deleteMembership = function (meetingId, userId) {

  return this.findOne({ meeting: meetingId, user: userId })
    .then((membership) => {
      if (membership.isOwner) {
        throw new Error('Meeting owner cannot leave the meeting. Please try deleting the meeting instead.');
      } else {
        return membership.remove();
      }
    });

}

module.exports = mongoose.model('Membership', membershipSchema);
