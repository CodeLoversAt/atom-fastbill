"use strict";
var $__model__,
    $__moment__;
var Model = ($__model__ = require("./model"), $__model__ && $__model__.__esModule && $__model__ || {default: $__model__}).default;
var moment = ($__moment__ = require("moment"), $__moment__ && $__moment__.__esModule && $__moment__ || {default: $__moment__}).default;
var $__default = (function($__super) {
  function $__2(data) {
    $traceurRuntime.superConstructor($__2).call(this, data);
    this.id = this.projectId;
    this.title = this.projectName;
    this.startDate = moment(this.startDate);
  }
  return ($traceurRuntime.createClass)($__2, {}, {}, $__super);
}(Model));
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../model/project.js.map