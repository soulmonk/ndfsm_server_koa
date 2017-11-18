'use strict';

const Router = require('koa-router');
const restRouter = require('./rest-router');

function init(app) {
  const router = new Router();

  router.get('/', require('../controllers/api').version);

  router.use('/notes', restRouter(require('../controllers/notes')));

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

module.exports = init;