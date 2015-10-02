'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  thumb: String,
  title: String,
  authors: [String],
  publisher: String,
  year: String,
  pages: String,
  isbn_10: String,
  isbn_13: String,
  owner: Schema.Types.ObjectId,
  status: {
    type: String,
    default: 'active'
  },
  transaction: Schema.Types.ObjectId,
  addedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema);
