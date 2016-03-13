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

angular.module('barteguidenWebApp.services')
  .factory('Event', ['$http', '$q', function ($http, $q) {
    var baseURL = 'https://barteguiden.no/api/';
    var cache = [];
    var cacheById = {};

    return {
      getEventById: function(id) {
        var deferred = $q.defer();
        // if the event exists in memory, just return it
        if(cacheById.hasOwnProperty(id)) {
          deferred.resolve(cacheById[id]);
        }
        else {
          $http.get(baseURL + 'events/' + id.toString()).then(function(response) {
            cacheById[id] = response.data;
            deferred.resolve(response.data);
          });
        }
        return deferred.promise;

      },
      getEvents: function() {
        var deferred = $q.defer();
        if(!cache.length) {
          $http.get(baseURL + 'events').then(function(response) {
            cache = response.data;
            deferred.resolve(cache);
          });
        }
        else {
          deferred.resolve(cache);
        }
        return deferred.promise;
      }
    };
  }]);
