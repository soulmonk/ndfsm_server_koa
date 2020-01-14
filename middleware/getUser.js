'use strict';

const logger = require('../libs/logger');

const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function getUser(ctx, next) {

  // todo estimate time for verification

  ctx.state.user = false;

  // check header or url parameters or post parameters for token
  const token = ctx.request.headers['x-access-token'];
  if (!token) {
    return next();
  }

  try {
    const user = await jwt.verify(token, config.get('secret'));
    const userModel = await UserModel.findOne({ '_id': user.id });
    if (!userModel) {
      logger.error('User with id by token not found');
    } else {
      ctx.state.user = {
        id: userModel._id,
        username: userModel.username
      };
    }
  } catch(err) {
    logger.error('Error: [get user]', err);
  }

  return next();
}

module.exports = getUser;
