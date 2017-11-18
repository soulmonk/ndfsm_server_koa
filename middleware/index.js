'use strict';

const middlewares = require('./config.json');

function init(app) {
  let _middlewares = middlewares.filter(i => i.enabled === undefined || i.enabled);
  _middlewares.sort((a, b) => a.weight - b.weight);

  for (let middleware of _middlewares) {
    app.use(require(`./${middleware.name}`))
  }
}

module.exports = init;