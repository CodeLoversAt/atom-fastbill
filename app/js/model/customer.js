"use strict";
var $__model__;
var Model = ($__model__ = require("./model"), $__model__ && $__model__.__esModule && $__model__ || {default: $__model__}).default;
var $__default = (function($__super) {
  function $__1(data) {
    $traceurRuntime.superConstructor($__1).call(this, data);
    this.id = this.customerId;
    this.label = this.getName();
    this.number = this.customerNumber;
  }
  return ($traceurRuntime.createClass)($__1, {getName: function() {
      return this.organization || this.firstName + ' ' + this.lastName;
    }}, {}, $__super);
}(Model));
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../model/customer.js.map