import Model from './model';

export default class extends Model {
    constructor(data) {
        super(data);
        this.id = this.customerId;
        this.label = this.getName();
        this.number = this.customerNumber;
    }

    getName() {
        return this.organization || this.firstName + ' ' + this.lastName;
    }
}
