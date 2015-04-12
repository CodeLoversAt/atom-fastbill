(function () {
    "use strict";

    var Model = require('./model'),
        moment = require('moment'),
        Invoice = function (data) {
            this.setData(data);

            this.id = this.invoiceId;
            this.number = this.invoiceNumber;
            this.client = this.organization;
            this.dueDate = moment(this.dueDate);
            this.paidDate = this.paymentInfo ? moment(this.paidDate) : null;
            this.invoiceDate = moment(this.invoiceDate);
            this.url = this.documentUrl;
        };

    Invoice.prototype = new Model();

    Invoice.prototype.isPaid = function () {
        return null !== this.paidDate;
    };

    Invoice.prototype.isOverDue = function () {
        return !this.isPaid() && moment().isAfter(this.dueDate);
    };

    Invoice.prototype.fileName = function () {
        return 'Rechnung' + this.number + '.pdf';
    };

    module.exports = Invoice;
}());
//# sourceMappingURL=../model/invoice.js.map