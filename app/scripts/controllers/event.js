'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('EventCtrl', function ($scope, EventService, $route) {
    var id = $route.current.params.id;
    EventService.getEventById(id)
      .success(function(data) {
        //just a hack to emulate the api
        var events = data.events;
        var i;
        for(i = 0; i < events.length; i++) {
          var e = events[i];
          if(e.eventID === id) {
            $scope.event = e;
          }
        }

      })
      .error(function(data, status, headers) {
        console.log(data, status, headers);
      });


  });
