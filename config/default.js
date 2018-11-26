'use strict';

const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {

  db: {
    url: 'mongodb://localhost/ndfsm_server',
    options: {}
  },

  port: 4540,

  secret: 'tOHaWUL3EZQzk91jDih1erW5',

  dist: {
    assets: defer(function(cfg) {
      return path.join(cfg.root, 'dist', 'assets');
    }),
    templates: defer(function(cfg) {
      return path.join(cfg.root, 'dist', 'templates');
    }),
  },

  root: path.join(__dirname, '..')
};
