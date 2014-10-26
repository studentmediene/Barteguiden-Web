'use strict';

/**
 * @ngdoc overview
 * @name barteguidenWebApp
 * @description
 * # barteguidenWebApp
 *
 * Main module of the application.
 */


angular.module('barteguidenWebApp.controllers', []);
angular.module('barteguidenWebApp.filters', []);
angular.module('barteguidenWebApp.services', []);
angular.module('barteguidenWebApp.directives', []);

angular
  .module('barteguidenWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'google-maps',
    'ui.bootstrap',
    'barteguidenWebApp.controllers',
    'barteguidenWebApp.filters',
    'barteguidenWebApp.services',
    'barteguidenWebApp.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/om', {
        templateUrl: 'views/about.html'
      })
      .when('/arrangement/:id/:slug?', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .when('/kontakt', {
        templateUrl: 'views/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
