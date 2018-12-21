'use strict';

const logger = require('../libs/logger');

async function errors(ctx, next) {
  try {
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Origin', '*');
   await next();
  } catch (err) {
    logger.error('Something went wrong', err);
    ctx.res.fail(null, 'Something went wrong');
  }
}

module.exports = errors;
