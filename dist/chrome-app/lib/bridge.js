"use strict";
var Bridge = (function() {
  function Bridge() {}
  return ($traceurRuntime.createClass)(Bridge, {downloadFile: function(fileName, url, dialogTitle) {
      var win = remote.getCurrentWindow(),
          dialog = remote.require('dialog'),
          userHome = ipc.sendSync('get-user-home');
      if (!/\/$/.test(userHome)) {
        userHome += '/';
      }
      dialog.showSaveDialog(win, {
        defaultPath: userHome + fileName,
        title: dialogTitle
      }, function(path) {
        if (!path) {
          return ;
        }
        var request = remote.require('request'),
            fs = remote.require('fs');
        request(url).pipe(fs.createWriteStream(path));
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