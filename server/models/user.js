const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({

  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  availability: [{
    timeSlot: Date,
    available: Boolean
  }]

});
