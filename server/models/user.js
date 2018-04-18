const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({

  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }

});

userSchema.statics.addUser = function (email, name, password) {

  let newUser = new this({
    email: email,
    name: name,
    password: password
  });
  return bcrypt.hash(newUser.password, 1).then((hash) => {
    newUser.password = hash;
    return newUser.save();
  });

};

userSchema.statics.check = function (email, password) {
  // determines if a given password for a username is valid  or not.
  // find a user with the username equivalent to the username passed in.
  // if  there is no  user then throw a new  Error('No User') else  return the result
  // of bcrypt.compare for the password and the user's password
  // STUB
  return this.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error('No user with that email');
      } else {
        return bcrypt.compare(password, user.password);
      }
    });
  // ENDSTUB
};

userSchema.methods.updateUser = function (name, password) {

  this.name = name.length > 0 ? name : this.name;
  this.password = password.length > 0 ? password : this.password;
  return this.save();

};

userSchema.statics.getUser = function (userId) {

  return this.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error('No user with that email');
      } else {
        return bcrypt.compare(password, user.password);
      }
    });

}

userSchema.statics.deleteUser = function (userId) {

 return this.findOneAndRemove({ _id: userId });

}

module.exports = mongoose.model('User', userSchema);
