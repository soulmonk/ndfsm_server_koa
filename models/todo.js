'use strict';

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
});

module.exports = mongoose.model('Todo', TodoSchema);
