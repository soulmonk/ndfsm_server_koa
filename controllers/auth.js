'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const passport = require('koa-passport');

async function me(ctx) {

  // check header or url parameters or post parameters for token
  var token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers['x-access-token'];
  if (!token) {
    return ctx.res.status(401).json({
      message: 'Must pass token'
    });
  }

  // decode token
  jwt.verify(token, config.get('secret'), function(err, user) {
    if (err)
      throw err;

    //return user using the id from w/in JWTToken
    UserModel.findOne({
      '_id': user.id
    }).then(userModel => {
      if (!userModel) {
        ctx.res.notFound();
        return;
      }

      ctx.res.success({
        user: {
          id: userModel._id,
          username: userModel.username
        },
        token: token
      });
    });
  })
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
