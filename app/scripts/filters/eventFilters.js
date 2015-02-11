'use strict';
/*global _:false */

angular.module('barteguidenWebApp.filters')
  .filter('filterByPrice', function() {
    return function(events, wantedPrices) {
      if(wantedPrices.length === 0) { //No options chosen. Return entire list of events.
        return events;
      }

      return _.filter(events, function (event) { //Returned filtered event
        var eventPrice = event.price;
        if (eventPrice > 0 || eventPrice === null) {
          eventPrice = -1; //-1 means paid event, 0 is free
          // has to be done due to different input
        }
        return _.include(_.pluck(wantedPrices, 'id'), eventPrice);
      });


    };
  })

  .filter('filterByCategory', function() {
    return function(events, wantedCategories) {
      if(wantedCategories.length === 0) { //No options chosen. Return entire list of events.
        return events;
      }

      return _.filter(events, function (event) { //Returned filtered events
        return _.include(_.pluck(wantedCategories, 'id'), event.categoryID);
      });
    };
  })

  .filter('filterByAgeLimit', function() {
    return function (events, wantedAges) {
      if (wantedAges.length === 0) {  //No options chosen. Return entire list of events.
        return events;
      }
      return _.filter(events, function (event) {
        return _.include(_.pluck(wantedAges,'id'), event.ageLimit);
      });
    };
  })

  .filter('filterByDate', function() {
    return function(events, date) {
      if(date === undefined) {  //No options chosen. Return entire list of events.
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


