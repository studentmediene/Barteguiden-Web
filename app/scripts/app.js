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
    'ngResource',
    'ngRoute',
    'ngSanitize',
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
        title: 'Barteguiden - din guide til kulturlivet i Trondheim',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/om', {
        title: 'Om Barteguiden',
        templateUrl: 'views/about.html'
      })
      .when('/arrangement/:id/:slug?', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .when('/kontakt', {
        title: 'Kontakt Barteguiden',
        templateUrl: 'views/contact.html'
      })
      .when('/konkurranse', {
        title: 'Konkurranse - Barteguiden',
        templateUrl: '/views/comp.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($route, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(){
      // change page title, based on route information
      $rootScope.title = $route.current.title;
    });
  });
