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

}).filter('isFreeForAll', function() {
  return function(ageLimit) {
    if(ageLimit === 0 || ageLimit === null)
      return 'Tillatt for alle';
    return ageLimit + ' år';
  };
})


    //TODO - make code better - repetitive
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

