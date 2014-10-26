'use strict';

/*
Copyright Johnny Hauser 2014 (https://github.com/m59peacemaker/angular-pmkr-components)

The MIT License (MIT)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


angular.module('barteguidenWebApp.services')
  .factory('filterStabilize', ['memoize', function(memoize) {
    function service(fn) {
      function filter() {
        var args = [].slice.call(arguments);
          // always pass a copy of the args so that the original input can't be modified
          args = angular.copy(args);
          // return the `fn` return value or input reference (makes `fn` return optional)
          /*jshint validthis:true */
          var filtered = fn.apply(this, args) || args[0];
          return filtered;
        }
        var memoized = memoize(filter);
        return memoized;
      }
      return service;
    }
  ])
  .factory('memoize', [function() {
    function service() {
      /*jshint validthis:true */
      return memoizeFactory.apply(this, arguments);
    }
    function memoizeFactory(fn) {
      var cache = {};
      function memoized() {
        var args = [].slice.call(arguments);
        var key = JSON.stringify(args);
        var fromCache = cache[key];
        if (fromCache) {
          return fromCache;
        }
        /*jshint validthis:true */
        cache[key] = fn.apply(this, arguments);
        return cache[key];
      }
      return memoized;
    }
    return service;
  }]);
