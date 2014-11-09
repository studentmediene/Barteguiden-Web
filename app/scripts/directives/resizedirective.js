'use strict';

angular.module('barteguidenWebApp.directives')

  .directive('resizeDirective', function ($window) {
    return function (scope, element) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'w': w.width()
        };
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowWidth = newValue.w;

        scope.style = function (sizeLimit) {

          if(newValue.w < sizeLimit) {
            return false;
          }
          else
          {
            return true;
          }

        };

      }, true);

      w.bind('resize', function () {
        scope.$apply();
      });
    };
  });