"use strict";
var $__angular__;
var angular = ($__angular__ = require("angular"), $__angular__ && $__angular__.__esModule && $__angular__ || {default: $__angular__}).default;
var $__default = function() {
  return function(arr, start, end) {
    if (!angular.isArray(arr)) {
      return [];
    }
    return arr.slice(start, end);
  };
};
;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../filter/slice.js.map