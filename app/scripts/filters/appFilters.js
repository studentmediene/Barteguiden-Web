'use strict';



angular.module('barteguidenWebApp.filters')
  .filter('isFreeEvent', function() {
    return function(price) {
      if(price === 0) {
        return 'Gratis';
      }
      else if(price === undefined || price === null) {
          return 'Ikke oppgitt';
      }
      else {
        return price.toString() + ' kr';
      }
    };

  })
  .filter('isFreeForAll', function() {
    return function(ageLimit) {
      if(ageLimit === 0 || ageLimit === null) {
        return 'Tillatt for alle';
      }
      return ageLimit + ' år';
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
  })
  .filter('cutText', function() {
    return function(obj, n) {
      if(obj === undefined || obj === null) {
        return '';
      }
      var text = obj.text;
      var shortText = text.substr(0, n);

      if (/^\S/.test(text.substr(n))) {
        shortText = shortText.replace(/\s+\S*$/, '');
        return shortText === text ? shortText : shortText + ' [...]';
      }
      return shortText === text ? shortText : shortText + ' [...]';
    };
  });

