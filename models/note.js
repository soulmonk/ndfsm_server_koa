'use strict';

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  description: String,
  keywords: [String],

  // category
});

NoteSchema.method('toJSON', function () {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Note', NoteSchema);
