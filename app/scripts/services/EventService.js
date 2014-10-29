'use strict';


angular.module('barteguidenWebApp.services')
  .factory('EventService', ['$http', '$q', function ($http, $q) {
    var baseURL = 'http://barteguiden.no/v2/';
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
            cache = response.data.events;
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
