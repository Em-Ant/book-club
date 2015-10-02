'use strict';

angular.module('fullstackApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mybooks', {
        templateUrl: 'app/mybooks/mybooks.html',
        controller: 'MybooksCtrl'
      });
  });
