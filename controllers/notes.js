'use strict';

const Note = require('../models/note');

class Notes extends RestBase {

  get model () {
    return Note;
  }
}

module.exports = Notes;