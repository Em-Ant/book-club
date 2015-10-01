'use strict';

angular.module('fullstackApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.panelOption = 'books';

    $scope.update = function(form) {
      $scope.dataSubmitted = true;
      /**
      * TODO: update profile
      */
    };


    // DUMMY BOOK LIST
    $scope.bookInfo = undefined;
    $scope.yourBooks = [
      {
        title: 'The Beauty and the Beast',
        author: 'John Doe',
        editor: 'Emant Editions',
        pages: 123,
        year: '2004',
        isbn: '8811999045'
      }, {
        thumb: '/assets/images/thumb_0.png',
        title: 'John the Best',
        author: 'John Doe',
        editor: 'Emant Editions',
        pages: 123,
        year: '2004',
        isbn: '8811999045'
      },
    ];

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
