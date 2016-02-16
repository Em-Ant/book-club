'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  thumb: String,
  title: {
    type:String,
    required: true
  },
  authors: [String],
  publisher: String,
  categories: [String],
  year: String,
  pages: String,
  isbn_10: String,
  isbn_13: String,
  owner: Schema.Types.ObjectId,
  status: {
    type: String,
    default: 'active'
  },
  requestedBy: Schema.Types.ObjectId,
  reqInfo: {
    name: String,
    email: String,
    city: String
  } ,
  addedOn: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
});

module.exports = mongoose.model('Book', BookSchema);
