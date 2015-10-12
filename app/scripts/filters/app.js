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

angular.module('barteguidenWebApp.filters')
  .filter('isFreeEvent', function() {
    return function(price) {
      if(price === 0) {
        return 'Gratis';
      }
      else if(!price) {
          return 'Ikke oppgitt';
      }
      else {
        return price.toString() + ' kr';
      }
    };

  })
  .filter('isFreeForAll', function() {
    return function(ageLimit) {
      if(!ageLimit) {
        return 'Tillatt for alle';
      }
      return ageLimit + ' år';
    };
  })
  .filter('slugify', function() {
    return function(text) {
      return text.toString().toLowerCase()
        .replace('ø', 'oe')
        .replace('å', 'aa')
        .replace('æ', 'ae')
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace()
        .replace(/-+$/, '');         // Trim - from end of text
    };
  })
  .filter('defaultCategory', function() {
    return function(obj) {
      if(!obj) {
        return 'OTHER';
      }
      return obj;
    };
  })
  .filter('cutText', function() {
    return function(obj, n) {
      //In case we don't have text in the description
      if(!obj) {
        return '';
      }
      //this function linkifies a url with the text Link
      //in case someone provides a link in the description
      function linkify(text) {
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + 'Link' + '</a>';
        });
      }
      //get and shorten the text
      var text = obj;
      text += ' ';
      var trimmed = text.substr(0,n);
      //cut remaining chars not part of a word
      trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
      //detect links
      trimmed = linkify(trimmed);
      //add [...] if we must cut a description
      return text.length > n ? trimmed + ' [...]' : trimmed;

    };
  })
  .filter('samfundetImage', function() {
    return function(imageURL) {
      return imageURL.replace('/large/', '/medium/');
    };
  });

