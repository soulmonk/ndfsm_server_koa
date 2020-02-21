'use strict';

const path = require('path');

module.exports = {

  db: {
    url: 'mongodb://localhost/ndfsm_server',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  port: 4540,

  secret: require('fs').readFileSync(path.join(__dirname, '../secret-key.txt'), 'utf8'),

  root: path.join(__dirname, '..')
};
