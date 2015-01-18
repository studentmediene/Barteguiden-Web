'use strict';

/*global $:false */

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
    $scope.minDate = new Date();
    $('#sidebar').affix({
      offset: {
        top: 0      }
    });

    EventService.getEvents()
      .then(function(data) {
        $scope.events = data;
      });

    $scope.showFilterOptions = function() {
      $scope.categoryOptions = [
        {name: 'Debatter', id: 'DEBATE', short: 'Debatt'},
        {name: 'Utstillinger', id: 'EXHIBITIONS', short: 'Utst.'},
        {name: 'Musikk', id: 'MUSIC', short: 'Musikk'},
        {name: 'Uteliv', id: 'NIGHTLIFE', short: 'Uteliv'},
        {name: 'Forestillinger', id: 'PERFORMANCES', short: 'Forest.'},
        {name: 'Presentasjoner', id: 'PRESENTATIONS', short: 'Pres.'},
        {name: 'Sport', id: 'SPORT', short: 'Sport'},
        {name: 'Andre', id: 'OTHER', short: 'Andre'}
      ];

      $scope.ageLimitOptions = [
        {name: 'Ingen aldersgrense', id: 0, short: 'Alle'},
        {name: '18+', id: 18, short: '18+'},
        {name: '20+', id: 20, short: '20+'}
      ];

      $scope.priceOptions = [
        {name: 'Gratis', price: 0, short: '0,-'},
        {name: 'Betalt', price: -1, short: 'kr'}
      ];

      $scope.chosenCategories = [];
      $scope.chosenAges = [];
      $scope.chosenPrices = [];
    };

    $scope.clickOption = function(option, chosenOptionList, e) {
      e.currentTarget.blur();
      $scope.firstDate = 0;
      $scope.moreThanOneDay = false;


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
      window.scrollTo(0, 50);
    };

    $scope.resetFilter = function(e) {
      e.currentTarget.blur();
      $scope.chosenCategories = [];
      $scope.chosenAges = [];
      $scope.chosenPrices = [];
      $scope.dt = undefined;
      $scope.firstDate = 0;
      $scope.moreThanOneDay = false;


    };

    //ads

    $scope.firstDate = 0;
    $scope.moreThanOneDay = false;


    $scope.resetCal = function() {
      $scope.firstDate = 0;
      $scope.moreThanOneDay = false;
    };

    $scope.checkIfTooManyAds = function(date) {
      console.log(date);
      if($scope.firstDate === 0 || $scope.firstDate > date) {
        $scope.firstDate = date;
      }
      if($scope.firstDate !== date) {
        $scope.moreThanOneDay = true;
      }
      return (date === $scope.firstDate) && $scope.moreThanOneDay;
    };

  }]);
