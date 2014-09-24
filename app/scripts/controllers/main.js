'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('MainCtrl', function ($scope, EventService) {
    EventService.getAllEvents()
      .success(function(data) {
        $scope.events = data.events;
      })
      .error(function(data, status, headers) {
        console.log(data, status, headers);
      });

    $scope.resetFilter = function() {
        $scope.chosenCategory = '';
        $scope.ageLimit = '';
        $scope.eventPrice = 'allEvents';
    };

  });
