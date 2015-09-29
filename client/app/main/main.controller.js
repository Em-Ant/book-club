'use strict';

angular.module('fullstackApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.redirect = function (path) {
      $location.path(path);
    }
  });
