'use strict'

const path = require('path')
const { secret } = require('./jwt')

module.exports = {

  db: {
    url: 'mongodb://localhost/ndfsm_server',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  port: 4540,
  secret,
  root: path.join(__dirname, '..')
}
