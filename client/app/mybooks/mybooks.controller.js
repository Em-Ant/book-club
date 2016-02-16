'use strict';

angular.module('fullstackApp')
  .controller('MybooksCtrl', function ($scope, $http, $timeout, Auth) {

    /**
    * TODO:
    *   - HANDLE REQUESTS
    */

    $scope.clearForm = function(form) {
      form.$submitted = false;
      form.$dirty = false;
      form.$pristine = true;
    };

    $scope.saveNewBook = function() {
      $http.post('/api/books/', $scope.newBook).success(function(res){

        // clear Custom Book Form
        for ( var p in $scope.newBook) {
          $scope.newBook[p] = undefined;
        }
        $scope.newBook = undefined;

        // display the added book
        $scope.yourBooks.push(res);
        $scope.added = true;
        $timeout(function () {
          $scope.added = undefined;
        }, 3000);
      });
    };

    $scope.customSubmit = function(form) {
      if(form.$valid) {
        var temp = $scope.tempBook;
        if(temp.authors) {
          var authors = temp.authors.split(',');
          authors = authors.map(function(el) {
            return el.trim();
          });
          temp.authors = authors;
        }
        if(temp.categories) {
          var categs = temp.categories.split(',');
          categs = categs.map(function(el) {
            return el.trim();
          });
          temp.categories = categs;
        }
        $scope.newBook = temp;
        $scope.saveNewBook();
        temp = undefined;
        $scope.clearForm(form);
      }
    };

    $scope.getMybooks = function() {
      $http.get('api/books/mybooks/').success(function(res) {
        $scope.yourBooks = res.myBooks;
        $scope.outgoingRequests = res.outgoing.length;
        $scope.outgoingBooks = res.outgoing;
        $scope.incomingRequests = res.incoming.length;
        $scope.incomingBooks = res.incoming;
        $scope.panelOption = $scope.incomingRequests ? 'i_req' : ($scope.outgoingRequests ? 'o_req' : 'books');
      });
    };

    $scope.deleteBook = function(bookId) {
      $http.delete('api/books/' + bookId).success(function() {
        $scope.yourBooks = $scope.yourBooks.filter(function(book) {
          if (book._id === bookId) return false;
          return true;
        });
      });
    };


    $scope.bookSearch = function(form) {
      if(form.$valid) {
        var isbn = $scope.isbn;
        var base_url = 'https://www.googleapis.com/books/v1/volumes';
        var isbn_val = isbn.replace(/-/g,'');
        $scope.preloadBook = true;
        $http.jsonp(base_url, {params: {q: 'isbn:' + isbn_val, callback: 'JSON_CALLBACK'}})
          .success(function(res) {
            if (!res.items) {
              $scope.newBook = {
                noResults: true
              };
              $scope.isbn = undefined;
              $scope.preloadBook = undefined;
              return;
            };
            var newBook = {};
            var data = res.items[0].volumeInfo;
            if(data.imageLinks) {
              newBook.thumb = data.imageLinks.smallThumbnail;
            }
            newBook.title = data.title;
            newBook.authors = data.authors;
            newBook.pages = data.pageCount;

            // Strip commas from google books categories
            newBook.categories = data.categories
              .map(function(cat) {
                return cat.replace(',',' ');
            });
            newBook.publisher = data.publisher;
            newBook.year = data.publishedDate.substr(0,4);
            if (data.industryIdentifiers) {
              var idArr = data.industryIdentifiers;
              idArr.forEach(function(el) {
                if (el.type === 'ISBN_10') {
                  newBook.isbn_10 = el.identifier;
                } else if (el.type === 'ISBN_13') {
                  newBook.isbn_13 = el.identifier;
                }
              });
            }
            $scope.clearForm(form);
            $scope.newBook = newBook;
            $scope.isbn = undefined;
            $scope.preloadBook = undefined;
          });
      }
    };

  $scope.retireRequest = function(index) {
    var book = $scope.outgoingBooks[index];
    book.status = 'active';
    book.requestedBy = null;
    book.reqInfo = {};
    $http.put('api/books/' + book._id, book).success(function () {
      $scope.getMybooks();
    })
  };

  $scope.rejectRequest = function(index) {
    var book = $scope.incomingBooks[index];
    book.status = 'active';
    book.requestedBy = null;
    book.reqInfo = {};
    $http.put('api/books/' + book._id, book).success(function () {
      $scope.getMybooks();
    })
  };

  $scope.approveRequest = function(index) {
    var book = $scope.incomingBooks[index];
    book.status = 'exchanged';
    $http.put('api/books/' + book._id, book).success(function () {
      $scope.getMybooks();
    })
  };


  $scope.showInfo = function(book) {
    return (book.owner === Auth.getCurrentUser()._id);
  }
  /** INITIALIZATION *************/

  $scope.panelOption = $scope.incomingRequests ? 'i_req' : ($scope.outgoingRequests ? 'o_req' : 'books');
  $scope.bookAdd = 'isbn';
  $scope.incomingRequests = 0;
  $scope.outgoingRequests = 0;

  // Load Books
  $scope.getMybooks();

});
