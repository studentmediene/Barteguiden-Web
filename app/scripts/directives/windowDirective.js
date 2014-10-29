'use strict';

angular.module('barteguidenWebApp.directives')

  .directive('resize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return {
        'w': w.width()
      };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowWidth = newValue.w;

      scope.style = function () {

        if(newValue.w < 1000) {
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