"use strict";
var $__model__,
    $__moment__;
var Model = ($__model__ = require("./model"), $__model__ && $__model__.__esModule && $__model__ || {default: $__model__}).default;
var moment = ($__moment__ = require("moment"), $__moment__ && $__moment__.__esModule && $__moment__ || {default: $__moment__}).default;
var $__default = (function($__super) {
  function $__2(data) {
    $traceurRuntime.superConstructor($__2).call(this, data);
    this.id = this.invoiceId;
    this.number = this.invoiceNumber;
    this.client = this.organization;
    this.dueDate = moment(this.dueDate);
    this.paidDate = this.paymentInfo ? moment(this.paidDate) : null;
    this.invoiceDate = moment(this.invoiceDate);
    this.url = this.documentUrl;
  }
  return ($traceurRuntime.createClass)($__2, {
    isPaid: function() {
      return null !== this.paidDate;
    },
    isOverDue: function() {
      return !this.isPaid() && moment().isAfter(this.dueDate);
    },
    fileName: function() {
      return 'Rechnung' + this.number + '.pdf';
    }
  }, {}, $__super);
}(Model));
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../../js/model/invoice.js.map