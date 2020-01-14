'use strict';

const Router = require('koa-router');
const restRouter = require('./rest-router');

function init(app) {
  const router = new Router();

  router.get('/api', require('../controllers/api').version);
  router.use('/api/auth', require('./auth'));
  router.use('/api/notes', restRouter(require('../controllers/notes')));
  router.use('/api/todo', restRouter(require('../controllers/todo')));

  router.use('/api/temp-notes', restRouter(require('../controllers/temp-notes')));

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

module.exports = init;
