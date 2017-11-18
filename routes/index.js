'use strict';

const Router = require('koa-router');

function init(app) {
  const router = new Router();

  router.get('/', (ctx) => {
    ctx.res.success()
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

module.exports = init;