'use strict';

/**
 * @ngdoc directive
 * @name barteguidenWebApp.directive:background
 * @description
 * # background
 */
angular.module('barteguidenWebApp.directives')
  .directive('background', function () {
    var rightNow = (new Date()).getSeconds();

    var backgroundcss = function(element, filename) {
      element.css('background','url(' + filename + ')');
      element.css('background-size','cover');
      element.css('-webkit-background-size','cover');
      element.css('-moz-background-size','cover');
      element.css('-o-background-size','cover');
    };

    if(rightNow < 20) {
      return {
      link: function (scope, element) {
        backgroundcss(element, '../images/franidelven.jpg');
        }
      };
    }
   else if(rightNow < 40) {
      return {
        link: function (scope, element) {
          backgroundcss(element, '../images/samfundet1960.jpg');
        }
      };
    }
    else {
      return {
        link: function (scope, element) {
          backgroundcss(element, '../images/torget.jpg');
        }
      };
    }

  });
