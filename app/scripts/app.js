/*
 * Copyright 2015 Studentmediene i Trondheim AS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    'ngRoute',
    'ngSanitize',
    'angular-loading-bar',
    'uiGmapgoogle-maps',
    'ui.bootstrap',
    'angulike',
    'barteguidenWebApp.controllers',
    'barteguidenWebApp.filters',
    'barteguidenWebApp.services',
    'barteguidenWebApp.directives'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
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
      $rootScope.facebookAppId = '[FacebookAppId]';
    });
  });
