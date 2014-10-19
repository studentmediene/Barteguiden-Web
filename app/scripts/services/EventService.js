'use strict';


angular.module('barteguidenWebApp.services')
  .service('EventService', function ($http) {
    var baseURL = 'http://barteguiden.no/v1/';
    //$http.get(baseURL + 'events');
    return {
      getAllEvents: function() {
        //just get the json file locally now
        return $http.get(baseURL + 'events');
      },
      getEventById: function(id) {
        return $http.get(baseURL + 'events/' + id.toString());
      }
    };
  });
