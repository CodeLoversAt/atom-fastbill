"use strict";
var $__change_45_case__,
    $__lodash__;
var changeCase = ($__change_45_case__ = require("change-case"), $__change_45_case__ && $__change_45_case__.__esModule && $__change_45_case__ || {default: $__change_45_case__}).default;
var _ = ($__lodash__ = require("lodash"), $__lodash__ && $__lodash__.__esModule && $__lodash__ || {default: $__lodash__}).default;
var Model = (function() {
  function Model(data) {
    this.setData(data);
  }
  return ($traceurRuntime.createClass)(Model, {setData: function(data) {
      this._originalKeys = _.keys(data);
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          this[changeCase.camel(key)] = data[key];
        }
      }
    }}, {});
}());
var $__default = Model;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../model/model.js.map