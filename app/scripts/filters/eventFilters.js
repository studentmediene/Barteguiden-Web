'use strict';
/*global _:false */




angular.module('barteguidenWebApp.filters')
  .filter('filterByPrice', function() {
    return function(events, wantedPrices) {
      var filtered = [];

      if(wantedPrices.length === 0) {
        return events;
      }

      for(var i = 0; i < events.length; i++) {
        var eventPrice = events[i].price;

        if(eventPrice > 0 || eventPrice === null) {
          eventPrice = -1; //-1 means paid event, 0 is free
          // has to be done due to different input
        }

        for(var j = 0; j < wantedPrices.length; j++) {
          if(wantedPrices[j].price === eventPrice) {
            filtered.push(events[i]);
          }
        }

      }

      return filtered;
    };
  })
  .filter('filterByCategory', function() {
    return function(events, wantedCategories) {
      var filtered = [];

      if(wantedCategories.length === 0) {
        return events;
      }

      for(var i = 0; i < events.length; i++) {
        for(var j = 0; j < wantedCategories.length; j++) {
          if(wantedCategories[j].id === events[i].categoryID) {
            filtered.push(events[i]);
          }
        }
      }
      return filtered;
    };
  })
  .filter('filterByAgeLimit', function() {
    return function(events, wantedAges) {
      var filtered = [];

      if(wantedAges.length === 0) {
        return events;
      }

      for(var i = 0; i < events.length; i++) {
        for(var j = 0; j < wantedAges.length; j++) {
          if(wantedAges[j].id === events[i].ageLimit) {
            filtered.push(events[i]);
          }
        }
      }

      return filtered;
    };
  })
  .filter('filterByDate', function() {
    return function(events, date) {
      if(date === undefined) {
        return events;
      }
      return _.filter(events, function(e) {
        var eDate = new Date(e.startAt);
        eDate.setHours(0,0,0,0);
        return new Date(date).valueOf() === eDate.valueOf();
      });
    };
  })
  .filter('groupByDate', ['filterStabilize', function(stabilize) {
    return stabilize(function(events) {
      return _.groupBy(events, function(e) {
        var date = new Date(e.startAt);
        date.setHours(0,0,0,0);
        return date.toJSON();
      });
    });

  }])
  .filter('paginate', ['filterStabilize',function(stabilize) {
    return stabilize(function(events, start, end) {
      if (events) {
        return events.slice(start, end);
      }
      return;
    });
  }]);

