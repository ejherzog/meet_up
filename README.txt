Welcome to MeetUp!

The following describes the routes available and how to use them.


POST /account/signup
  Body: {email, name, password}

POST /account/login
  Body: {email, password}

POST /api/meeting
  Body: {title, timeslot[]}

GET /api/meeting/:id
  Returns the Meeting details and also the Meeting's members.
  If the current User is a member, it also returns all the
  availability information for the Meeting.

DELETE /api/meeting/:id
  Removes the specified Meeting if the current User is the Meeting's owner.

POST /api/availability
  Body: {meetingId, timeslot}
  Adds a record indicating that the current User is available
  at the specified timeslot for the specified Meeting

DELETE /api/availability
  Body: {meetingId, timeslot}
  Removes a record indicating that the current User is availalbe
  at the specified timeslot for the specified Meeting

POST /api/meeting/membership/:meetingID
  Adds the current User to the specified Meeting

GET /api/meeting/membership/:meetingID
  Returns all the Users of the specified Meeting

GET /api/user/membership
  Returns all the Meetings the current User is a member of

GET /api/user/:userID/membership/:meetingID
  Returns boolean values for isMember and isOwner
  with respect to the specified User and Meeting

DELETE /api/user/membership/:meetingID
  Removes the current User from a meeting's membership
