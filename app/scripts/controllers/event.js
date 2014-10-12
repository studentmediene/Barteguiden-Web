'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('EventCtrl', function ($scope, EventService, $route) {
    var id = $route.current.params.id;

    //seems like we need some initial data before we get event data from the service. TODO fix
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
      .success(function(data) {
        //just a hack to emulate the api
        var events = data.events;
        var i;
        for(i = 0; i < events.length; i++) {
          var e = events[i];
          if(e.eventID === id) {
            $scope.event = e;
            $scope.marker = {
              id:parseInt(e.eventID),
              title: e.address,
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

          }
        }

      })
      .error(function(data, status, headers) {
        console.log(data, status, headers);
      });
  });
