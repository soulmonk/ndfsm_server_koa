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

  secret: 'tOHaWUL3EZQzk91jDih1erW5',

  root: path.join(__dirname, '..')
};
