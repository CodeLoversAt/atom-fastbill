(function () {
    "use strict";

    var Model = require('./model'),
        moment = require('moment'),
        Project = function (data) {
            this.setData(data);
            this.id = this.projectId;

            this.title = this.projectName;
            this.startDate = moment(this.startDate);
        };

    Project.prototype = new Model();

    module.exports = Project;
}());
//# sourceMappingURL=../model/project.js.map