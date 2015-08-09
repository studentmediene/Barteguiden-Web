/*
 * Copyright 2015 Studentmediene i Trondheim AS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('EventCtrl', ['$scope', 'Event', '$routeParams', '$document', '$location', function ($scope, Event, $routeParams, $document, $location) {
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
   Event.getEventById(id)
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
        $scope.URL = $location.absUrl();
        $document[0].title = 'Barteguiden - ' + e.title;
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
