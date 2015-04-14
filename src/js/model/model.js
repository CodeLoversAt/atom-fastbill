import changeCase from 'change-case';
import _ from 'lodash';

export default class Model {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this._originalKeys = _.keys(data);

        var key;

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                this[changeCase.camel(key)] = data[key];
            }
        }
    }
}
