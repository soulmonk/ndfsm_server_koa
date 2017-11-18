'use strict';

const path = require('path');

module.exports = {

  db: {
    url: 'mongodb://localhost/ndfsm_server',
    options: { useMongoClient: true }
  },

  port: 4540,

  root: path.join(__dirname, '..')
};