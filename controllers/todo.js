'use strict';

const Todo = require('../models/todo');
const RestBase = require('./rest-base');

class Todos extends RestBase {

  get model () {
    return Todo;
  }
}

module.exports = Todos;
