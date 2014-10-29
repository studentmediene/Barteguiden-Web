'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('EventCtrl', ['$scope', 'EventService', '$routeParams', function ($scope, EventService, $routeParams) {
    var id = $routeParams.id;

    //seems like we need some initial data before we get event data from the service.
    $scope.map = {
      center: {
        latitude: 63.43,
        longitude: 10.39
      },
      zoom: 13,
      draggable: 'true'
    };
    $scope.marker = {
      id:1,
      coords: {
        latitude: 63.422634,
        longitude:10.394697
      }
    };
    EventService.getEventById(id)
      .then(function(data) {
        var e = data;
        $scope.event = e;
        $scope.marker = {
          id:parseInt(e.eventID),
          coords: {
            latitude: e.latitude,
            longitude:e.longitude
          }
        };
        $scope.map = {
          center: {
            latitude: e.latitude,
            longitude: e.longitude
          },
          zoom: 14,
          draggable: 'true'
        };
      });
  }]);
