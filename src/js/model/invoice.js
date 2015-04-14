import Model from './model';
import moment from 'moment';

export default class extends Model {
    constructor(data) {
        super(data);
        this.id = this.invoiceId;
        this.number = this.invoiceNumber;
        this.client = this.organization;
        this.dueDate = moment(this.dueDate);
        this.paidDate = this.paymentInfo ? moment(this.paidDate) : null;
        this.invoiceDate = moment(this.invoiceDate);
        this.url = this.documentUrl;
    }

    isPaid() {
        return null !== this.paidDate;
    }

    isOverDue() {
        return !this.isPaid() && moment().isAfter(this.dueDate);
    }

    fileName() {
        return 'Rechnung' + this.number + '.pdf';
    }
}
