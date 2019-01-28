'use strict';

const logger = require('../libs/logger');

const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function getUser(ctx, next) {

  // todo estimate time for verification

  // check header or url parameters or post parameters for token
  const token = ctx.request.headers['x-access-token'];
  if (!token) {
    return next();
  }

  await new Promise(resolve => {
    jwt.verify(token, config.get('secret'), function(err, user) {
      if (err) {
        logger.error('Wrong token: ' + err.toString(), err);
        return resolve();
      }

      // TODO validate token is it expire.

      //return user using the id from w/in JWTToken
      UserModel
        .findOne({'_id': user.id})
        .then(userModel => {
          if (!userModel) {
            logger.error('User with id by token not found');
            return null;
          }

          ctx.state.user = {
            id: userModel._id,
            username: userModel.username
          };
        })
        .then(resolve);
    });
  })
    .catch(err => {
      logger.error('Error: [get user]', err);
    });

  return next();
}

module.exports = getUser;
