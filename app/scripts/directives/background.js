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
