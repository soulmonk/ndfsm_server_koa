'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username required'
  },
  passwordHash: {
    type: String,
    required: 'Password required',
  },

  created: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: {
    virtuals: true
  }
});

function crypt(password) {
  return crypto.createHmac('sha256', config.get('secret'))
    .update(password)
    .digest('hex');
}

UserSchema
  .virtual('password')
  .set(function (password) {
    if (!password) {
      this.invalidate('password', 'No password');
    }

    this.passwordHash = crypt(password);
  });

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false; // empty password means no login by password
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

  return crypt(password) === this.passwordHash;
};

module.exports = mongoose.model('User', UserSchema);
