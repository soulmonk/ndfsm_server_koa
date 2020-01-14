'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const passport = require('koa-passport');
const logger = require('../libs/logger');

async function me(ctx, next) {
  // NOTE ctx.state.user exists if x-access-token is valid

  const invalid = () => {
    ctx.status = 401;
    ctx.res.fail(false, 'Invalid token.');
  }

  // check header or url parameters or post parameters for token
  const token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers['x-access-token']
  if (!token) {
    invalid()
    return;
  }
  try {
    const user = await jwt.verify(token, config.get('secret'));
    const userModel = await UserModel.findOne({
      '_id': user.id
    });
    ctx.res.ok({
      user: {
        id: userModel._id,
        username: userModel.username
      },
      token: token
    });
  } catch(err) {
    logger.error('Auth me information by token: ', err)
    invalid()
  }
}

async function logout(ctx) {
  // todo how to with token?
  ctx.res.success();
}

function generateToken(ctx, next) {
  ctx.state.token = jwt.sign({
    id: ctx.state.user._id
  }, config.get('secret'), {
    expiresIn: '1d'
  });
  next();
}

async function respond(ctx, next) {
  const user = ctx.state.user;
  ctx.res.success({
    user: {
      id: user._id,
      username: user.username
    }, token: ctx.state.token
  });
}

module.exports = {
  login: passport.authenticate(
    'local', {
      session: false
    }),
  logout,
  generateToken,
  respond,
  me
};
