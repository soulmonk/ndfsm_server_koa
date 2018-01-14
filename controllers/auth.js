'use strict';

const config = require('config');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

async function login(ctx) {
  ctx.res.success({token: ''});
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
  respond
};
