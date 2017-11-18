'use strict';

const logger = require('../libs/logger');

async function errors(ctx, next) {
  try {
   await next();
  } catch (err) {
    logger.error('Something went wrong', err.message || err);
    ctx.res.fail(null, 'Something went wrong');
  }
}

module.exports = errors;