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
 * @ngdoc directive
 * @name barteguidenWebApp.directive:ad
 * @description
 * # ad
 */

 angular.module('barteguidenWebApp.directives')
  .directive('ad', function(Ad) {
    return {
      templateUrl: 'views/ad.html',
      restrict: 'E',
      scope: {
        index: '=index'
      },
      link: function(scope, el, attrs) {
        scope.ad = Ad.getAd(scope.index);
        scope.trackAd = function() {
          _gaq.push(['_trackEvent', 'ads', 'click', scope.ad.ref]);
        };
      }
    };

  })
  .factory('Ad', function() {
    var ads = [
      {url: 'http://sirkusshopping.no', src: 'images/barteguiden_annonse.jpg',
        ref: 'CirkusShopping'},
      {url: 'http://billettservice.no/event/royksopp-highasakite-billetter/450279',
        src: 'images/barteguiden_annonse_evry.jpg', ref: 'Evry'}
    ];

    function shuffle(o) {
      for(var j, x, i = o.length; i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    ads = shuffle(ads);

    return {
      getAd: function(index) {
        return ads[index];
      }
    };
  });
