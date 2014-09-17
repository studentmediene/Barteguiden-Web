'use strict';



angular.module('barteguidenWebApp.filters')
  .filter('isFreeEvent', function() {
    return function(price) {
      if(price === 0) {
        return 'Gratis';
      }
      else if(price == undefined) {
        return 'Har ikke pris';
      }
      else {
        return price.toString() + ' kr';
      }
    };

  });

