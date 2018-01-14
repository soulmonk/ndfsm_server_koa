'use strict';

const passsport = require('koa-passport');
const Strategy = require('passport-local');
const UserModel = require('../models/user');
const logger = require('../libs/logger');

passsport.use(new Strategy((username, password, done) => {
  if (!username || !password) {
    return done('Wrong credentials!', false);
  }

  UserModel
    .findOne({username})
    .then((user) => {
      if (!user || !user.checkPassword(password)) {
        return done('Wrong credentials!', false);
      }
      done(null, user);
    })
    .catch(err => {
      logger.error(err);
      done(null, false);
    });
}));

module.exports = passsport.initialize();
