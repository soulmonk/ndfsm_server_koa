'use strict';

const Router = require('koa-router');

function restRouter(Controller) {
  const controller = new Controller();

  const router = new Router();

  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router.routes();
}

module.exports = restRouter;