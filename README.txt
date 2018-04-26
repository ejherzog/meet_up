Welcome to MeetUp!

The following describes the routes available and how to use them.

# Create An Account #
POST /account/signup
  Body: {email, name, password}
  Creates a new User as long as the email address is unique from
  those already in the database. If User is successfully created,
  a session token is set.

# Log In #
POST /account/login
  Body: {email, password}
  Uses Bcrypt to check the password hash and then sets the session token.

# Create A Meeting #
POST /api/meeting
  Body: {title, timeslot[]}
  Creates a new Meeting with the specified title
  and array of timeslots specified by the user.

# Get Meeting Details #
GET /api/meeting/:id
  Returns the Meeting details and also the Meeting's members.
  If the current User is a member, it also returns all the
  availability information for the Meeting.

# Delete A Meeting #
DELETE /api/meeting/:id
  Removes the specified Meeting if the current User is the Meeting's owner.

# Save Availability #
POST /api/availability
  Body: {meetingId, timeslot}
  Adds a record indicating that the current User is available
  at the specified timeslot for the specified Meeting

# Delete Availability #
DELETE /api/availability
  Body: {meetingId, timeslot}
  Removes a record indicating that the current User is availalbe
  at the specified timeslot for the specified Meeting

# Join A Meeting #
POST /api/meeting/membership/:meetingID
  Adds the current User to the specified Meeting

# Get Meeting Members #
GET /api/meeting/membership/:meetingID
  Returns all the Users of the specified Meeting

# Get User's Meetings #
GET /api/user/membership
  Returns all the Meetings the current User is a member of

# Get Membership Status #
GET /api/user/:userID/membership/:meetingID
  Returns boolean values for isMember and isOwner
  with respect to the specified User and Meeting

# Leave A Meeting #
DELETE /api/user/membership/:meetingID
  Removes the current User from the specified Meeting
