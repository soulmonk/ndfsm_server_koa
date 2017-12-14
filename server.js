'use strict';

const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

const config = require('config');

const Koa = require('koa');
const app = new Koa();

const logger = require('./libs/logger');

require('./bootsrap');

require('./middleware')(app);
require('./routes')(app);

app.listen(config.port, () => logger.info(`API server listening on ${config.port}`));
