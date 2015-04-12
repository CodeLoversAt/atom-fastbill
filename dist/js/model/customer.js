(function () {
    "use strict";

    var Model = require('./model'),
        Customer = function (data) {
            this.setData(data);
            this.id = this.customerId;
            this.label = this.getName();
        };

    Customer.prototype = new Model();

    Customer.prototype.getName = function () {
        return this.organization || this.firstName + ' ' + this.lastName;
    };

    module.exports = Customer;
}());
//# sourceMappingURL=../model/customer.js.map