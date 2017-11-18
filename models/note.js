'use strict';

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({

  title: String,
  keywords: [String],

  text: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Note', NoteSchema);
