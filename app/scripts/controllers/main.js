'use strict';

/**
 * @ngdoc function
 * @name barteguidenWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barteguidenWebApp
 */
angular.module('barteguidenWebApp.controllers')
  .controller('MainCtrl', ['$scope', 'EventService',function ($scope, EventService) {

    $scope.pageSize = 20;
    $scope.currentPage = 1;

    EventService.getEvents()
      .then(function(data) {
        $scope.events = data;
      });

    $scope.showFilterOptions = function() {
      $scope.categoryOptions = [
        {name: 'Debatter', id: 'DEBATE'},
        {name: 'Utstillinger', id: 'EXHIBITIONS'},
        {name: 'Musikk', id: 'MUSIC'},
        {name: 'Uteliv', id: 'NIGHTLIFE'},
        {name: 'Forestillinger', id: 'PERFORMANCES'},
        {name: 'Presentasjoner', id: 'PRESENTATIONS'},
        {name: 'Sport', id: 'SPORT'},
        {name: 'Andre', id: 'OTHER'}
      ];

      $scope.ageLimitOptions = [
        {name: 'Ingen aldersgrense', id: 0},
        {name: '18+', id: 18},
        {name: '20+', id: 20}
      ];

      $scope.priceOptions = [
        {name: 'Gratis', price: 0},
        {name: 'Betalt', price: -1}
      ];

      $scope.chosenCategories = [];
      $scope.chosenAges = [];
      $scope.chosenPrices = [];
    };

    $scope.clickOption = function(option, chosenOptionList) {
      var index = chosenOptionList.indexOf(option);
      if(index === -1) {
        chosenOptionList.push(option);
      }
      else {
        chosenOptionList.splice(index, 1);
      }
    };

    $scope.isActive = function(option, chosenOptionList ) {
      var index = chosenOptionList.indexOf(option);
      if(index !== -1) {
        return true;
      }
      return false;
    };

    $scope.scroll = function() {
      window.scrollTo(0, 150);
    };
  }]);
