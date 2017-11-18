'use strict';

const Router = require('koa-router');

function restRouter(Controller) {
  const controller = new Controller();

  const router = new Router();

  router.get('/', controller.list.bind(controller));
  router.get('/:id', controller.get.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router.routes();
}

module.exports = restRouter;