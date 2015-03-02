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

    /*
     * Pagination
     */
    $scope.pageSize = 20;
    $scope.currentPage = 1;
    $scope.minDate = new Date();
    $('#sidebar').affix({
      offset: {
        top: 0      }
    });

    //Hack for Safari bug. Doesn't work :(
    $('button').on('touchstart', function(){
      $(this).removeClass('mobileHoverFix');
    });
    $('button').on('touchend', function(){
      $(this).addClass('mobileHoverFix');
    });

    /*
     * TODO put something like this to clickOption and remove isActive
     */
    $scope.clickToggle = function($event){
      var elem = angular.element($event.srcElement);
      if(elem.hasClass('active')){
        elem.removeClass( 'active' );
      }else{
        elem.addClass('active');
      }
    };

    /*
     * Waits until EventService fetches all events, then saves them to $scope.
     */
    EventService.getEvents()
      .then(function(data) {
        $scope.events = data;
      });

    /*
     * Initializes button categories.
     */
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
        {name: 'Gratis', id: 0, short: '0,-'},
        {name: 'Betalt', id: -1, short: 'kr'}
      ];

      $scope.chosenCategories = [];
      $scope.chosenAges = [];
      $scope.chosenPrices = [];
      $scope.recommended = false;
    };

    /*
     * Adds or removes category from chosen list on button click.
     */
    $scope.clickOption = function(option, chosenOptionList, e) {
      e.currentTarget.blur();
      $scope.clickToggle(e);
      var index = chosenOptionList.indexOf(option);
      if(index === -1) {
        chosenOptionList.push(option);
      }
      else {
        chosenOptionList.splice(index, 1);
      }
    };

    $scope.clickRecommended = function(e) {
      e.currentTarget.blur();
      $scope.recommended = ($scope.recommended ? false : true);
    };

    /*
     * Returns true if category is chosen
     * Used in main to check if button should be active or not
     */
    $scope.isActive = function(option, chosenOptionList) {
      var index = chosenOptionList.indexOf(option);
      if(index !== -1) {
        return true;
      }
      return false;
    };

    // Scrolls back up after using pagination
    $scope.scroll = function() {
      window.scrollTo(0, 50);
    };

    // Resets the filter when user clicks 'Vis alle'
    $scope.resetFilter = function(e) {
      e.currentTarget.blur();
      $scope.chosenCategories = [];
      $scope.chosenAges = [];
      $scope.chosenPrices = [];
      $scope.dt = undefined;
      $scope.recommended = false;
    };
  }]);
