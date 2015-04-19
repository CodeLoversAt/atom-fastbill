"use strict";
export default class Bridge {
    downloadFile(fileName, url, dialogTitle) {
        chrome.fileSystem.chooseEntry({
            type: 'saveFile',
            suggestedName: fileName,
            accepts: [{extensions: ['pdf']}]
        }, function (entry) {
            entry.createWriter(function (writer) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.onload = function (e) {
                    writer.write(this.response);
                };

                xhr.send();
            });
        });
    }
}