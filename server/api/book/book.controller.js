'use strict';

var _ = require('lodash');
var Book = require('./book.model');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get list of books
exports.getMybooks = function(req, res) {
  var resBooks = {};
  // My bookshelf
  Book.find({$or: [{owner: req.user._id}, {$and: [{status: 'exchanged'}, {requestedBy: req.user._id}]}] }, function (err, books) {
    if(err) { return handleError(res, err); }
    resBooks.myBooks = books;
    // Outgoing Reqs
    Book.find({status: 'waiting', requestedBy: req.user._id}, function(err, books) {
      if(err) { return handleError(res, err); }
      resBooks.outgoing = books;
      // Incoming Reqs
      Book.find({status: 'waiting', owner: req.user._id}, function(err, books) {
        if(err) { return handleError(res, err); }
        resBooks.incoming= books;
        return res.status(200).json(resBooks);
      });
    });
  });
};

exports.getActive = function(req, res) {
  Book.find({status: 'active', owner: {$ne: req.user._id}}, function(err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  })
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  req.body.owner = req.user._id;
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
