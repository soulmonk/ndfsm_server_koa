'use strict';

const config = require('config');

const Koa = require('koa');
const app = new Koa();

const logger = require('./libs/logger');

require('./middleware')(app);
require('./routes')(app);

app.listen(config.port, () => logger.info(`API server listening on ${config.port}`));