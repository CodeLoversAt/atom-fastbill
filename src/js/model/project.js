import Model from './model';
import moment from 'moment';

export default class extends Model {
    constructor(data) {
        super(data);
        this.id = this.projectId;

        this.title = this.projectName;
        this.startDate = moment(this.startDate);
    }
}
