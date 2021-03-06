'use strict';

const logger = require('../libs/logger');

const notes = [];
let id = 0;

class TempNotes {

  async create(ctx) {
    const {text} = ctx.request.body;

    const model = {
      id: id++,
      text
    };

    notes.push(model);

    ctx.res.success(model)
  }

  async list(ctx) {
    ctx.res.success(notes);
  }
}

module.exports = TempNotes;
