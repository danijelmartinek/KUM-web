var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  membershipFeePaid: {
    type: Boolean,
    default: false
  },
  role: {
    roleLevel: {
      type: Number,
      required: true,
      default: '1'
    },
    roleCaption: {
      type: String,
      default: ''
    }
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;