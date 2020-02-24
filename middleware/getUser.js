'use strict';

const logger = require('../libs/logger');

const config = require('config');
const jwt = require('jsonwebtoken');

async function getUser(ctx, next) {
  ctx.state.user = false;

  // check header or url parameters or post parameters for token
  const token = ctx.request.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return next();
  }

  try {
    ctx.state.user = await jwt.verify(token.slice(7), config.get('secret'));
  } catch(err) {
    logger.error('Error: [get user]', err);
  }

  return next();
}

module.exports = getUser;
