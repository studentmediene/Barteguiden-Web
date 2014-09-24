'use strict';



angular.module('barteguidenWebApp.filters')
  .filter('isFreeEvent', function() {
    return function(price) {
      if(price === 0) {
        return 'Gratis';
      }
      else if(price == undefined || price == null) {
          return 'Pris ikke oppgitt';
      }
      else {
        return price.toString() + ' kr';
      }
    };

})

        .filter('filterByPrice', function() {
            return function(events, wantedPrice) {
                var filtered = [];

                if(wantedPrice === 'allEvents') {
                    return events;
                }

                for(var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var eventPrice = 'paidEvents';

                    // TODO not sure if unknown(null) prices should be filtered as "free" or not
                    if(event.price === 0) {
                        eventPrice = 'freeEvents';
                    }
                    if(eventPrice === wantedPrice) {
                        filtered.push(event);
                    }

                }

                return filtered;

            };
        })

  .filter('slugify', function() {
    return function(text) {
      return text.toString().toLowerCase()
        .replace('ø', 'oe')
        .replace('å', 'aa')
        .replace('æ', 'ae')
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace()
        .replace(/-+$/, '');         // Trim - from end of text
    };
  });

