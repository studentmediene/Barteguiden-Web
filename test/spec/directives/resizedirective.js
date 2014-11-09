'use strict';

describe('Directive: resizeDirective', function () {

  // load the directive's module
  beforeEach(module('barteguidenWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resize-directive></resize-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the resizeDirective directive');
  }));
});
