'use strict';

const Note = require('../models/note');
const RestBase = require('./rest-base');

class Notes extends RestBase {

  get model () {
    return Note;
  }
}

module.exports = Notes;