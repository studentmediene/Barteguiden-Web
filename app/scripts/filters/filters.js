'use strict';



angular.module('barteguidenWebApp.filters')
  .filter('isFreeEvent', function() {
    return function(price) {
      if(price === 0) {
        return 'Gratis';
      }
      else if(price == undefined) {
        return 'Pris ikke oppgitt';
      }
      else {
        return price.toString() + ' kr';
      }
    };

})

        .filter('priceFilter', function() {
            return function(events, wantedPrice) {
                var filtered = [];

                if(wantedPrice === 'allEvents') {
                    return events;
                }

                for(var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var eventPrice = 'paidEvents';

                    if(event.price === 0 || event.price === null) {
                        eventPrice = 'freeEvents';
                    }
                    if(eventPrice === wantedPrice) {
                        filtered.push(event);
                    }

                }

                return filtered;

            };
        });

