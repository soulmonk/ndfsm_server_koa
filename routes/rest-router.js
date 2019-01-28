'use strict';

const Router = require('koa-router');
const {authenticated} = require('./helpers');

function restRouter(Controller) {
  const controller = new Controller();

  const router = new Router();

  if (typeof controller.list === 'function') {
    router.get('/', controller.list.bind(controller));
  }

  if (typeof controller.get === 'function') {
    router.get('/:id', controller.get.bind(controller));
  }

  if (typeof controller.create === 'function') {
    router.post('/', authenticated(), controller.create.bind(controller));
  }

  if (typeof controller.update === 'function') {
    router.put('/:id', authenticated(), controller.update.bind(controller));
  }

  if (typeof controller.delete === 'function') {
    router.delete('/:id', authenticated(), controller.delete.bind(controller));
  }

  return router.routes();
}

module.exports = restRouter;
