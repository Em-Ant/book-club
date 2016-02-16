'use strict';

angular.module('fullstackApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};

    $scope.panelOption = 'data';


    var clearForm = function(form) {
      form.$submitted = false;
      form.$dirty = false;
      form.$pristine = true;
      $scope.dataSubmitted = false;
    };

    $scope.update = function(form) {
      $scope.dataSubmitted = true;
      /**
      * TODO: update profile
      */
      if(form.$valid) {
        var loc = {};
        loc.city = $scope.user.city;
        loc.state = $scope.user.state;
        loc.country = $scope.user.country;
        $http.put('/api/users/' + Auth.getCurrentUser()._id + '/loc/', loc).success(function(){
          $scope.user.city = $scope.user.state = $scope.user.country = undefined;
          clearForm(form);
          $scope.message = "User Location successfully updated."
        })
      }
    };

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
