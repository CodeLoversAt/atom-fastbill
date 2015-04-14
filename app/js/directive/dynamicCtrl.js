"use strict";
var $__default = ['$compile', '$parse', function($compile, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link: function($scope, $element) {
      var name = $parse($element.attr('dynamic-ctrl'))($scope);
      $element.removeAttr('dynamic-ctrl');
      $element.attr('ng-controller', name);
      $compile($element)($scope);
    }
  };
}];
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../directive/dynamicCtrl.js.map