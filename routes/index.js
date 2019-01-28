'use strict';

const Router = require('koa-router');
const restRouter = require('./rest-router');
const fs = require('mz/fs');
const config = require('config');
const path = require('path');

function init(app) {
  const router = new Router();

  router.get('/api', require('../controllers/api').version);
  router.use('/api/auth', require('./auth'));
  router.use('/api/notes', restRouter(require('../controllers/notes')));
  router.use('/api/todo', restRouter(require('../controllers/todo')));

  router.use('/api/temp-notes', restRouter(require('../controllers/temp-notes')));

  router.get('*', async (ctx) => {
    const templatePath = path.join(config.get('dist.templates'), 'index.html');
    if (!await fs.exists(templatePath)) {
      ctx.body = 'Wait please, or not';
      return;
    }
    ctx.body = (await fs.readFile(templatePath, 'utf-8')).toString()
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

module.exports = init;
