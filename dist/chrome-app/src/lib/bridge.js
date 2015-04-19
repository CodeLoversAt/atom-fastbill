"use strict";
"use strict";
var Bridge = (function() {
  function Bridge() {}
  return ($traceurRuntime.createClass)(Bridge, {downloadFile: function(fileName, url, dialogTitle) {
      chrome.fileSystem.chooseEntry({
        type: 'saveFile',
        suggestedName: fileName,
        accepts: [{extensions: ['pdf']}]
      }, function(entry) {
        entry.createWriter(function(writer) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = function(e) {
            writer.write(this.response);
          };
          xhr.send();
        });
      });
    }}, {});
}());
var $__default = Bridge;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

//# sourceMappingURL=../lib/bridge.js.map