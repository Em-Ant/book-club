'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $location, Auth) {
    $scope.redirect = function (path) {
      $location.path(path);
    }

    $scope.loggedIn = Auth.isLoggedIn;
  });
