'use strict';

const serve = require('koa-static');
const config = require('config');

module.exports = serve(config.get('dist'));
