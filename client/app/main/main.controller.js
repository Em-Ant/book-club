'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $location, Auth, $http) {
    $scope.redirect = function (path) {
      $location.path(path);
    }

    $scope.getActiveBooks = function() {
      $http.get('api/books/active/').success(function(res) {
        $scope.activeBooks = res;
      });
    };

    $scope.requireBook = function(index) {
      var updatedBook = $scope.activeBooks[index];
      var me = Auth.getCurrentUser();
      updatedBook.status = 'waiting';

      updatedBook.requestedBy = me._id;
      updatedBook.reqInfo = {
        name: me.name,
        email: me.email,
      };

      if(me.loc)
        updatedBook.reqInfo.city = me.loc.city;

      $http.put('api/books/' + updatedBook._id, updatedBook).success(function() {
        $scope.getActiveBooks();
      })
    };

    Auth.isLoggedInAsync(function(status) {
      if (status) {
        $scope.loggedIn = true;
        $scope.getActiveBooks();
      }
    });


  });
