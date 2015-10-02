'use strict';

angular.module('fullstackApp')
  .controller('MybooksCtrl', function ($scope, $http) {
    $scope.panelOption = 'books';
    $scope.incomingRequests = 0;
    $scope.outgoingRequests = 0;

    $scope.saveNewBook = function() {
      $http.post('/api/books/', $scope.newBook).success(function(res){
        $scope.newBook = undefined;
        $scope.yourBooks.push(res);
      });
    };

    $scope.getMybooks = function() {
      $http.get('api/books/mybooks/').success(function(res) {
        $scope.yourBooks = res;
      });
    };

    // Load Books
    $scope.getMybooks();

    $scope.deleteBook = function(bookId) {
      $http.delete('api/books/' + bookId).success(function() {
        $scope.yourBooks = $scope.yourBooks.filter(function(book) {
          if (book._id === bookId) return false;
          return true;
        });
        console.log($scope.yourBooks);
      });
    };


    $scope.bookSearch = function(isbn) {
      var base_url = 'https://www.googleapis.com/books/v1/volumes';
      $http.jsonp(base_url, {params: {q: 'isbn:' + isbn, callback: 'JSON_CALLBACK'}})
        .success(function(res) {
          if (!res.items) return;
          console.log(res);
          var newBook = {};
          var data = res.items[0].volumeInfo;
          if(data.imageLinks) {
            newBook.thumb = data.imageLinks.smallThumbnail;
          }
          newBook.title = data.title;
          newBook.authors = data.authors;
          newBook.pages = data.pageCount;
          newBook.publisher = data.publisher;
          newBook.year = data.publishedDate.substr(0,4);
          if (data.industryIdentifiers) {
            var idArr = data.industryIdentifiers;
            idArr.forEach(function(el) {
              if (el.type === 'ISBN_10') {
                newBook.isbn_10 = el.identifier;
              } else if (el.type === 'ISBN_13') {
                newBook.isbn_13 = el.identifier;               }
            });
          }
          $scope.newBook = newBook;
          $scope.isbn = undefined;
        });
    }
  });
