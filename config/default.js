'use strict';

const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {

  db: {
    url: 'mongodb://localhost/ndfsm_server',
    options: { useMongoClient: true }
  },

  port: 4540,

  dist: defer(function(cfg) {
    return path.join(cfg.root, 'dist');
  }),

  root: path.join(__dirname, '..')
};
